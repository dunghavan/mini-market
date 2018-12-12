package com.dung.mini_market.security;

import com.dung.mini_market.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;


public class CustomUserDetails extends org.springframework.security.core.userdetails.User {
    private static final long serialVersionUID = 1L;
    private Long id = null;
    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities, Long id) {
        super(username, password, true, true, true, true, authorities);
        this.id = id;
    }

    public CustomUserDetails(String username, User user) {
        super(username, user.getPassword(), user.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getName()))
            .collect(Collectors.toList()));

        this.id = user.getId();
    }

    public Long getId() {
        return this.id;
    }
}

