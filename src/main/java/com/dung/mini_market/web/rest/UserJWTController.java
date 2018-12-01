package com.dung.mini_market.web.rest;

import com.dung.mini_market.domain.FacebookUser;
import com.dung.mini_market.security.jwt.JWTFilter;
import com.dung.mini_market.security.jwt.TokenProvider;
import com.dung.mini_market.web.rest.vm.LoginVM;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonProperty;

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

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    public UserJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/authenticate")
    @Timed
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {
        getUserInfo(loginVM.getFbToken());
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (loginVM.isRememberMe() == null) ? false : loginVM.isRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }

    public void getUserInfo(final String accessToken) {
//        String link = Constants.FACEBOOK_GET_USER_INFO + "fields=id,first_name,last_name,name,email,link,birthday";
//
//        // Response 2 from Facebook
//        String response = Request.Get(link).addHeader("Authorization", "Bearer " + accessToken).execute().returnContent().asString();
//        FacebookUser facebookUser = new Gson().fromJson(response, FacebookUser.class);

        final String uri = "https://graph.facebook.com/v2.9/me?access_token=EAAgJ6vDZCid0BAPu6Eluo17eYTBlj8wjpYH7HXFS5RreZAwoRh4vjPfgL3ADxISrSXOhozIyZCYvdhBn60L1uAOuAS3XeQBi4cGODKdmlaTdXUn1fJSCEKzi7tGwoyloLfVMAkLkrX6KQ5fmdtHMOI0fMuOsgfdn66Ls5tHqKX2Rz9AHUoonp7eIqSYG1l5fIiPCWHMdQZDZD&fields=name,email,picture,first_name,last_name&method=get&pretty=0&sdk=joey&suppress_http_code=1";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);

        System.out.println(result);
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
