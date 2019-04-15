package com.github.olgakharisova;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = "com.github.olgakharisova")
@EnableJpaRepositories("com.github.olgakharisova.repository")
@Configuration
@EnableWebMvc
@EnableCaching
@CacheConfig(cacheNames = "blobs")
public class EntryPoint implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(EntryPoint.class, args);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

}
