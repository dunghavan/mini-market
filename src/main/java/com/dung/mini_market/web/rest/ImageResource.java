package com.dung.mini_market.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dung.mini_market.domain.Image;
import com.dung.mini_market.service.ImageService;
import com.dung.mini_market.web.rest.errors.BadRequestAlertException;
import com.dung.mini_market.web.rest.util.HeaderUtil;
import com.dung.mini_market.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Image.
 */
@RestController
@RequestMapping("/api")
public class ImageResource {

    private final Logger log = LoggerFactory.getLogger(ImageResource.class);

    private static final String ENTITY_NAME = "image";

    private final ImageService imageService;

    public ImageResource(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * POST  /images : Create a new image.
     *
     * @param image the image to create
     * @return the ResponseEntity with status 201 (Created) and with body the new image, or with status 400 (Bad Request) if the image has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/images")
    @Timed
    public ResponseEntity<Image> createImage(@RequestBody Image image) throws URISyntaxException {
        log.debug("REST request to save Image : {}", image);
        if (image.getId() != null) {
            throw new BadRequestAlertException("A new image cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Image result = imageService.save(image);
        return ResponseEntity.created(new URI("/api/images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/images-upload")
    @Timed
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile[] file, @RequestParam("itemId") String[] itemId) {
        String storeFilename = "";
        if (itemId.length == 0)
            return null;
        String itemIdToSave = itemId[0];
        try {
            log.debug("REST request to save Image with itemId: {}", itemId[0]);

            byte[] bytes;
            for (MultipartFile f: file) {
                bytes = f.getBytes();
                String sha1String = DigestUtils.sha1Hex(bytes);
                storeFilename = sha1String + "." + FilenameUtils.getExtension(f.getOriginalFilename());

                Path path = Paths.get("/home/dunghv/image" + "/" + storeFilename);
                Files.write(path, bytes);

                imageService.save(new Image(storeFilename, "", "", Long.parseLong(itemIdToSave)));
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new BadRequestAlertException("Cannot upload image", ENTITY_NAME, "idexists");
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, itemIdToSave)).build();
    }

    /**
     * PUT  /images : Updates an existing image.
     *
     * @param image the image to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated image,
     * or with status 400 (Bad Request) if the image is not valid,
     * or with status 500 (Internal Server Error) if the image couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/images")
    @Timed
    public ResponseEntity<Image> updateImage(@RequestBody Image image) throws URISyntaxException {
        log.debug("REST request to update Image : {}", image);
        if (image.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Image result = imageService.save(image);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, image.getId().toString()))
            .body(result);
    }

    /**
     * GET  /images : get all the images.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of images in body
     */
    @GetMapping("/images")
    @Timed
    public ResponseEntity<List<Image>> getAllImages(Pageable pageable) {
        log.debug("REST request to get a page of Images");
        Page<Image> page = imageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/images");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/images/get-by-item-id/{itemId}")
    @Timed
    public ResponseEntity<List<Image>> getImagesByItemId(Pageable pageable, @PathVariable Long itemId) {
        log.debug("REST request to get Images by Item id = {}", itemId);
        Page<Image> page = imageService.findAllByItemId(pageable, itemId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/images");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    /**
     * GET  /images/:id : get the "id" image.
     *
     * @param id the id of the image to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the image, or with status 404 (Not Found)
     */
    @GetMapping("/images/{id}")
    @Timed
    public ResponseEntity<Image> getImage(@PathVariable Long id) {
        log.debug("REST request to get Image : {}", id);
        Optional<Image> image = imageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(image);
    }

    /**
     * DELETE  /images/:id : delete the "id" image.
     *
     * @param id the id of the image to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/images/{id}")
    @Timed
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        log.debug("REST request to delete Image : {}", id);
        imageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
