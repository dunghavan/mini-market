package com.dung.mini_market.repository;

import com.dung.mini_market.domain.Type;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Type entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

}
