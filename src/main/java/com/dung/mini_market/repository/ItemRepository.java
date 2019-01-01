package com.dung.mini_market.repository;

import afu.org.checkerframework.checker.igj.qual.I;
import com.dung.mini_market.domain.Item;
import com.dung.mini_market.domain.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.jaxb.PageAdapter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findAllByNameContains(String search, Pageable pageable);
    Page<Item> findAllByTypeAndNameContains(Type type, String search, Pageable pageable);
    Page<Item> findAllByStateAndNameContains(Boolean state, String search, Pageable pageable);
    Page<Item> findAllByStateAndTypeAndNameContains(Boolean state, Type type, String search, Pageable pageable);

    Page<Item> findAllByIsAvailableAndNameContains(Boolean state, String search, Pageable pageable);
    Page<Item> findAllByIsAvailableAndTypeAndNameContains(Boolean status, Type type, String search, Pageable pageable);
    Page<Item> findAllByIsAvailableAndStateAndNameContains(Boolean status, Boolean state, String search, Pageable pageable);
    Page<Item> findAllByStateAndTypeAndIsAvailableAndNameContains(Boolean state, Type type, Boolean isAvailable, String search, Pageable pageable);


    @Query("SELECT i FROM Item i WHERE i.name LIKE %?1% AND i.price >= ?2 AND i.price <= ?3 AND i.isAvailable = ?4 AND i.state = ?5")
    Page<Item> searchByPrice(String search, int minPrice, int maxPrice, Boolean status, Boolean state, Pageable pageable);

    Page<Item> findAllByNameContainsAndPriceBetween(String search, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndTypeAndPriceBetween(String search, Type type, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndStateAndPriceBetween(String search, Boolean state, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndStateAndTypeAndPriceBetween(String search, Boolean state, Type type, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndIsAvailableAndPriceBetween(String search, Boolean status, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndIsAvailableAndTypeAndPriceBetween(String search, Boolean status, Type type, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndIsAvailableAndStateAndPriceBetween(String search, Boolean status, Boolean state, int minPrice, int maxPrice, Pageable pageable);
    Page<Item> findAllByNameContainsAndIsAvailableAndStateAndTypeAndPriceBetween(String search, Boolean status, Boolean state, Type type, int minPrice, int maxPrice, Pageable pageable);


    Page<Item> findAllByUserId(Long userId, Pageable pageable);

}
