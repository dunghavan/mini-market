package com.dung.mini_market.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class GenericConvert<T>{
    private static final Logger log = LoggerFactory.getLogger(GenericConvert.class);

    public static <T>T jsonToObject(String jsonString, Class<T> clazz){
        if (jsonString == null)
            return null;

        T object = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            object = objectMapper.readValue(jsonString, clazz);
        }
        catch (IOException e){
            log.debug("Exception when parsing json to object: ", e.getMessage());
        }
        return object;
    }

    public static String objectToJson(Object object){
        if (object == null)
            return null;

        String jsonString = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonString = objectMapper.writeValueAsString(object);
        }
        catch (IOException e){
            log.debug("Exception when parsing object to json: ", e.getMessage());
        }
        return jsonString;
    }
}
