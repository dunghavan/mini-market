package com.dung.mini_market.web.rest;

import com.dung.mini_market.domain.FacebookUser;
import com.dung.mini_market.domain.GenericConvert;
import com.dung.mini_market.security.jwt.JWTFilter;
import com.dung.mini_market.security.jwt.TokenProvider;
import com.dung.mini_market.service.RedisService;
import com.dung.mini_market.web.rest.vm.LoginVM;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.io.IOException;
import com.google.gson.Gson;

import static com.dung.mini_market.config.Constants.FACEBOOK_USER_KEY;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    private final RedisService redisService;

    private final Logger logger = LoggerFactory.getLogger(UserJWTController.class);

    public UserJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager,
                             RedisService redisService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.redisService = redisService;
    }

    @PostMapping("/authenticate")
    @Timed
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {
        FacebookUser fbUser = getFacebookUser(loginVM.getFbToken());
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(fbUser.getEmail(), fbUser.getId());
        if(fbUser.getId().equals(loginVM.getFbId())){
            String res = this.redisService.setExpire(FACEBOOK_USER_KEY + ":" + fbUser.getEmail(), 90, GenericConvert.objectToJson(fbUser));
            logger.info("Save to redis {}: {}", fbUser.getEmail(), res);
        }
        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (loginVM.isRememberMe() == null) ? false : loginVM.isRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }

    public FacebookUser getFacebookUser(final String accessToken) {
//        String link = Constants.FACEBOOK_GET_USER_INFO + "fields=id,first_name,last_name,name,email,link,birthday";
//
//        // Response 2 from Facebook
//        String response = Request.Get(link).addHeader("Authorization", "Bearer " + accessToken).execute().returnContent().asString();
//        FacebookUser facebookUser = new Gson().fromJson(response, FacebookUser.class);

        final String uri = "https://graph.facebook.com/v2.9/me?access_token=" + accessToken + "&fields=name,email,picture,first_name,last_name,link&method=get&pretty=0&sdk=joey&suppress_http_code=1";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        FacebookUser facebookUser = new Gson().fromJson(result, FacebookUser.class);
        return facebookUser;
    }

    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }
}
