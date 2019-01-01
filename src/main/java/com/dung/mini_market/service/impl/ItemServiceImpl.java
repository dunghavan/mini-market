package com.dung.mini_market.service.impl;

import com.dung.mini_market.domain.Type;
import com.dung.mini_market.service.ItemService;
import com.dung.mini_market.domain.Item;
import com.dung.mini_market.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Item.
 */
@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    private final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    /**
     * Save a item.
     *
     * @param item the entity to save
     * @return the persisted entity
     */
    @Override
    public Item save(Item item) {
        log.debug("Request to save Item : {}", item);
        return itemRepository.save(item);
    }

    /**
     * Get all the items.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Item> findAll(Pageable pageable) {
        log.debug("Request to get all Items");
        return itemRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Item> findAllByUser(Long userId, Pageable pageable) {
        log.debug("Request to get all Items");
        return itemRepository.findAllByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Item> searchByCustomer(String search, Long price, Long status, Long state, Long typeId, Pageable pageable) {
        log.debug("Request to search by customer");
        int _minPrice = 0;
        int _maxPrice = 100000;
        Type _type = new Type();
        Boolean _state = state == 1;
        Boolean _status = status == 1;

        if (price == -1) {
            if (status == -1) {
                if (state == -1) {
                    if (typeId == -1) {
                        return itemRepository.findAllByNameContains(search, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByTypeAndNameContains(_type, search, pageable);
                    }
                } else {
                    if (typeId == -1) {
                        return itemRepository.findAllByStateAndNameContains(_state, search, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByStateAndTypeAndNameContains(_state, _type, search, pageable);
                    }
                }
            } else {
                if (state == -1) {
                    if (typeId == -1) {
                        return itemRepository.findAllByIsAvailableAndNameContains(_status, search, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByIsAvailableAndTypeAndNameContains(_status, _type, search, pageable);
                    }
                } else {
                    if (typeId == -1) {
                        return itemRepository.findAllByIsAvailableAndStateAndNameContains(_status, _state, search, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByStateAndTypeAndIsAvailableAndNameContains(_state, _type, _status, search, pageable);
                    }
                }
            }
        } else {
            switchCasePrice(price, _minPrice, _maxPrice);
            if (status == -1) {
                if (state == -1) {
                    if (typeId == -1) {
                        return itemRepository.findAllByNameContainsAndPriceBetween(search, _minPrice, _maxPrice, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByNameContainsAndTypeAndPriceBetween(search, _type, _minPrice, _maxPrice, pageable);
                    }
                } else {
                    if (typeId == -1) {
                        return itemRepository.findAllByNameContainsAndStateAndPriceBetween(search, _state, _minPrice, _maxPrice, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByNameContainsAndStateAndTypeAndPriceBetween(search, _state, _type, _minPrice, _maxPrice, pageable);
                    }
                }
            } else {
                if (state == -1) {
                    if (typeId == -1) {
                        return itemRepository.findAllByNameContainsAndIsAvailableAndPriceBetween(search, _status, _minPrice, _maxPrice, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByNameContainsAndIsAvailableAndTypeAndPriceBetween(search, _status, _type, _minPrice, _maxPrice, pageable);
                    }
                } else {
                    if (typeId == -1) {
                        return itemRepository.findAllByNameContainsAndIsAvailableAndStateAndPriceBetween(search, _status, _state, _minPrice, _maxPrice, pageable);
                    } else {
                        _type.setId(typeId);
                        return itemRepository.findAllByNameContainsAndIsAvailableAndStateAndTypeAndPriceBetween(search, _status, _state, _type, _minPrice, _maxPrice , pageable);
                    }
                }
            }
        }
    }

    private void switchCasePrice(Long price, int minPrice, int maxPrice) {
        switch (price.intValue()) {
            case 1:
                minPrice = 1;
                maxPrice = 10;
                break;
            case 2:
                minPrice = 10;
                maxPrice = 50;
                break;
            case 3:
                minPrice = 50;
                maxPrice = 100;
                break;
            case 4:
                minPrice = 100;
                maxPrice = 200;
                break;
            case 5:
                minPrice = 200;
                maxPrice = 300;
                break;
            case 6:
                minPrice = 300;
                maxPrice = 500;
                break;
            case 7:
                minPrice = 500;
                maxPrice = 700;
                break;
            case 8:
                minPrice = 700;
                maxPrice = 1000;
                break;
            case 9:
                minPrice = 1000;
                maxPrice = 2000;
                break;
            case 10:
                minPrice = 2000;
                maxPrice = 5000;
                break;
            case 11:
                minPrice = 5000;
                maxPrice = 10000;
                break;
            case 12:
                minPrice = 10000;
                maxPrice = 15000;
                break;
            case 13:
                minPrice = 15000;
                maxPrice = 20000;
                break;
            case 14:
                minPrice = 20000;
                maxPrice = 30000;
                break;
            case 15:
                minPrice = 30000;
                maxPrice = 100000;
                break;
            default:
                minPrice = 0;
                maxPrice = 100000;
                break;
        }
    }

    /**
     * Get one item by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Item> findOne(Long id) {
        log.debug("Request to get Item : {}", id);
        Optional<Item> item = itemRepository.findById(id);
        return item;
    }

    /**
     * Delete the item by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Item : {}", id);
        itemRepository.deleteById(id);
    }
}
