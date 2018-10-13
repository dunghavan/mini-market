package com.dung.mini_market.web.rest;

import com.dung.mini_market.MiniMarketApp;

import com.dung.mini_market.domain.Item;
import com.dung.mini_market.repository.ItemRepository;
import com.dung.mini_market.service.ItemService;
import com.dung.mini_market.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.dung.mini_market.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ItemResource REST controller.
 *
 * @see ItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MiniMarketApp.class)
public class ItemResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private ItemService itemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restItemMockMvc;

    private Item item;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemResource itemResource = new ItemResource(itemService);
        this.restItemMockMvc = MockMvcBuilders.standaloneSetup(itemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Item createEntity(EntityManager em) {
        Item item = new Item()
            .name(DEFAULT_NAME)
            .desc(DEFAULT_DESC)
            .price(DEFAULT_PRICE)
            .status(DEFAULT_STATUS)
            .note(DEFAULT_NOTE);
        return item;
    }

    @Before
    public void initTest() {
        item = createEntity(em);
    }

    @Test
    @Transactional
    public void createItem() throws Exception {
        int databaseSizeBeforeCreate = itemRepository.findAll().size();

        // Create the Item
        restItemMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isCreated());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeCreate + 1);
        Item testItem = itemList.get(itemList.size() - 1);
        assertThat(testItem.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testItem.getDesc()).isEqualTo(DEFAULT_DESC);
        assertThat(testItem.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testItem.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testItem.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemRepository.findAll().size();

        // Create the Item with an existing ID
        item.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isBadRequest());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllItems() throws Exception {
        // Initialize the database
        itemRepository.saveAndFlush(item);

        // Get all the itemList
        restItemMockMvc.perform(get("/api/items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(item.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())));
    }
    
    @Test
    @Transactional
    public void getItem() throws Exception {
        // Initialize the database
        itemRepository.saveAndFlush(item);

        // Get the item
        restItemMockMvc.perform(get("/api/items/{id}", item.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(item.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItem() throws Exception {
        // Get the item
        restItemMockMvc.perform(get("/api/items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItem() throws Exception {
        // Initialize the database
        itemService.save(item);

        int databaseSizeBeforeUpdate = itemRepository.findAll().size();

        // Update the item
        Item updatedItem = itemRepository.findById(item.getId()).get();
        // Disconnect from session so that the updates on updatedItem are not directly saved in db
        em.detach(updatedItem);
        updatedItem
            .name(UPDATED_NAME)
            .desc(UPDATED_DESC)
            .price(UPDATED_PRICE)
            .status(UPDATED_STATUS)
            .note(UPDATED_NOTE);

        restItemMockMvc.perform(put("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItem)))
            .andExpect(status().isOk());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeUpdate);
        Item testItem = itemList.get(itemList.size() - 1);
        assertThat(testItem.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testItem.getDesc()).isEqualTo(UPDATED_DESC);
        assertThat(testItem.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testItem.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testItem.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingItem() throws Exception {
        int databaseSizeBeforeUpdate = itemRepository.findAll().size();

        // Create the Item

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemMockMvc.perform(put("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isBadRequest());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItem() throws Exception {
        // Initialize the database
        itemService.save(item);

        int databaseSizeBeforeDelete = itemRepository.findAll().size();

        // Get the item
        restItemMockMvc.perform(delete("/api/items/{id}", item.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Item.class);
        Item item1 = new Item();
        item1.setId(1L);
        Item item2 = new Item();
        item2.setId(item1.getId());
        assertThat(item1).isEqualTo(item2);
        item2.setId(2L);
        assertThat(item1).isNotEqualTo(item2);
        item1.setId(null);
        assertThat(item1).isNotEqualTo(item2);
    }
}
