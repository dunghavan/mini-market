package com.dung.mini_market.repository;

import com.dung.mini_market.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @Query("SELECT i FROM Item i WHERE i.name LIKE 'ao'")
    Optional<Page<Item>> searchByCustomer(Pageable pageable);
}
