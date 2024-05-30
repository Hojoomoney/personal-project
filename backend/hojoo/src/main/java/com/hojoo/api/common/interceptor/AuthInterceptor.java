package com.hojoo.api.common.interceptor;

import com.hojoo.api.user.jwt.JwtProvider;
import com.hojoo.api.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.stream.Stream;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;
    private final UserRepository repository;

    @Override //request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("인터셉터 실행");
        log.info("인터셉터 요청 URL : {}", request.getServletPath());
        boolean s = Stream.of(request)
                .map(jwtProvider::extractTokenFromHeader)
                .filter(token -> !token.equals("undefined"))
                .peek(token -> log.info("1 - 인터셉터 토큰 로그 Bearer 포함 : {}", token))
                .map(token -> jwtProvider.getPayload(token).get("id", Long.class))
                .peek(id -> log.info("2 - 인터셉터 사용자 Id : {}", id))
                .anyMatch(repository::existsById);

        return s;
    }

    @Override //response
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override //exception
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
