package com.hojoo.api.common.config;

import com.hojoo.api.common.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final AuthInterceptor authInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
//                .addPathPatterns("/api/article/**")
                .excludePathPatterns("/api/article/**", "/api/user/**", "/api/auth/**", "/api/news/**","/api/**");
    }
}
