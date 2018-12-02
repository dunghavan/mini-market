package com.dung.mini_market.security;

import com.dung.mini_market.domain.FacebookUser;
import com.dung.mini_market.domain.GenericConvert;
import com.dung.mini_market.domain.User;
import com.dung.mini_market.repository.UserRepository;
import com.dung.mini_market.service.RedisService;
import com.dung.mini_market.service.UserService;
import com.dung.mini_market.service.dto.UserDTO;
import com.dung.mini_market.web.rest.vm.ManagedUserVM;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final RedisService redisService;

    public DomainUserDetailsService(UserRepository userRepository, RedisService redisService, @Lazy UserService userService) {
        this.userRepository = userRepository;
        this.redisService = redisService;
        this.userService = userService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);

//        if (new EmailValidator().isValid(login, null)) {
//            return userRepository.findOneWithAuthoritiesByEmail(login)
//                .map(user -> createSpringSecurityUser(login, user))
//                .orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
//        }

        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        Optional<User> optUser = userRepository.findOneByLogin(lowercaseLogin);
        if(!optUser.isPresent()) {
            User newUser = saveUserFromRedis(lowercaseLogin);
            if(newUser == null) {
                throw  new UsernameNotFoundException("User " + lowercaseLogin + " was not found in redis");
            }
            return createSpringSecurityUser(lowercaseLogin, newUser);
        }

        return createSpringSecurityUser(lowercaseLogin, optUser.get());
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user) {
        if (!user.getActivated()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }

        return new CustomUserDetails(lowercaseLogin, user);
    }

    private User saveUserFromRedis(String username) {
        String result = redisService.getValue("fbUser:" + username);
        FacebookUser fbUser = GenericConvert.jsonToObject(result, FacebookUser.class);
        if(fbUser != null) {
            UserDTO userDTO = new UserDTO(fbUser);
            return this.userService.registerUser(userDTO, fbUser.getId());
        }
        return null;
    }
}
