package com.hojoo.api.user.controller;


import com.hojoo.api.common.Messenger;
import com.hojoo.api.user.model.UserDto;
import com.hojoo.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
@Slf4j
public class AuthController {
    private final UserService service;


    @PostMapping(path = "/login")
    @Transactional
    public ResponseEntity<Messenger> login(@RequestBody UserDto param) {
        log.info("입력받은 정보 : {}", param );
        return ResponseEntity.ok(service.login(param));
    }

    @GetMapping("/logout")
    @Transactional
    public ResponseEntity<Boolean> logout(@RequestHeader("Authorization") String refreshToken){
        log.info("입력받은 정보 : {}", refreshToken );
        return ResponseEntity.ok(service.logout(refreshToken));
    }
}
