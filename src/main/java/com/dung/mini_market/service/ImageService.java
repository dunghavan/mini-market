package com.dung.mini_market.service;

import com.dung.mini_market.domain.Image;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Image.
 */
public interface ImageService {

    /**
     * Save a image.
     *
     * @param image the entity to save
     * @return the persisted entity
     */
    Image save(Image image);

    /**
     * Get all the images.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Image> findAll(Pageable pageable);

    Page<Image> findAllByItemId(Pageable pageable, Long itemId);
    /**
     * Get the "id" image.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Image> findOne(Long id);

    /**
     * Delete the "id" image.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
