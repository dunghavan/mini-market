package com.dung.mini_market.web.rest.errors;

public class UserNotFoundException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public UserNotFoundException() {
        super(ErrorConstants.USER_NOT_FOUND_TYPE, "User not found!", "item", "usernotfound");
    }
}
