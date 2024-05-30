package com.hojoo.api.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class ControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ResponseDto> handleAuthException(AuthException e){
        log.info("핸들로그인실패 메소드" + e.getMessage());
        ResponseDto responseDto = new ResponseDto(
                e.getStatus(),
                e.getMessage()
        );
        return new ResponseEntity<>(responseDto, HttpStatus.valueOf(e.getStatus()));
    }
}
