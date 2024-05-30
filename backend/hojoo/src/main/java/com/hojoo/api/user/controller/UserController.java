package com.hojoo.api.user.controller;

import com.hojoo.api.common.Messenger;
import com.hojoo.api.user.model.UserDto;
import com.hojoo.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
@Slf4j
public class UserController {

    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<Messenger> register(@RequestBody UserDto dto) {
        log.info("입력받은 정보 : {}", dto );
        return ResponseEntity.ok(service.register(dto));
    }
    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity<Messenger> deleteById(@RequestParam("id") Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.deleteById(id));
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<Messenger> modify(@RequestBody UserDto userDto) {
        log.info("입력받은 정보 : {}", userDto );
        return ResponseEntity.ok(service.update(userDto));
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/detail")
    public ResponseEntity<UserDto> findById(@RequestParam("id") Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.getUserById(id));
    }
    @PostMapping("/isExist")
    public ResponseEntity<Boolean> isExist(@RequestBody String username) {
        log.info("입력받은 정보 : {}", username );
        return ResponseEntity.ok(service.isExist(username));
    }

}
