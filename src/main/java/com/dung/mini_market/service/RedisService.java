package com.dung.mini_market.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;

import java.util.Set;

@Service
public class RedisService {

    private final Logger log = LoggerFactory.getLogger(RedisService.class);

    private JedisPool pool;

    public RedisService() {
        this.pool = new JedisPool();
    }

    private JedisPool getPool(){
        if(this.pool == null) {
            this.pool = new JedisPool();
        }
        return this.pool;
    }

    public Boolean isExistKey(String key){
        Boolean isExist = false;
        //get a jedis connection jedis connection pool
        Jedis jedis = null;
        try {
            jedis = getPool().getResource();
            isExist = jedis.exists(key);
        } catch (JedisException e) {
            log.warn("Exist key exception {}", e.getMessage());
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                jedis.close();
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                jedis.close();
        }

        return isExist;
    }

    public String getValue(String key){
        String result = null;
        Jedis jedis = null;
        try {
            jedis = getPool().getResource();
            result = jedis.get(key);
        } catch (JedisException e) {
            log.warn("Get value exception {}", e.getMessage());
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                jedis.close();
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                jedis.close();
        }

        return result;
    }

    public Set<String> getKeys(String pattern){
        Set<String> keys = null;
        Jedis jedis = null;
        try {
            jedis = getPool().getResource();
            keys = jedis.keys(pattern);
        } catch (JedisException e) {
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                log.warn("Get key exception {}", e.getMessage());
                jedis.close();
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                jedis.close();
        }

        return keys;
    }

    public String setExpire(String key, int timeToLive, String value) {
        String status = null;
        Jedis jedis = null;

        try {
            jedis = getPool().getResource();
            status = jedis.setex(key, timeToLive, value);
        } catch (JedisException e) {
            log.warn("Set expire exception {}", e.getMessage());
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                jedis.close();
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                jedis.close();
        }

        return status;
    }

    public String setValue(String key, String value){
        String status = null;
        Jedis jedis = null;
        try {
            jedis = getPool().getResource();
            status = jedis.set(key, value);
        } catch (JedisException e) {
            log.warn("Set value exception {}", e.getMessage());
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                jedis.close();
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                jedis.close();
        }

        return status;
    }

    public void delKeys(String pattern){
        Set<String> keys = null;
        Jedis jedis = null;
        try {
            jedis = getPool().getResource();
            keys = jedis.keys(pattern);

            for(String key: keys){
                jedis.del(key);
            }
        } catch (JedisException e) {
            log.warn("Del key exception {}", e.getMessage());
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                jedis.close();
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                jedis.close();
        }
    }
}

