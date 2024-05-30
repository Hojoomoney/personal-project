package com.hojoo.api.user.service;

import com.hojoo.api.common.Messenger;
import com.hojoo.api.common.exception.AuthException;
import com.hojoo.api.user.jwt.JwtProvider;
import com.hojoo.api.user.model.User;
import com.hojoo.api.user.model.UserDto;
import com.hojoo.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public Messenger login(UserDto dto) {
        User user = userRepository.findByUsername(dto.getUsername());
        if (user == null) {
            throw new AuthException(400, "존재하지 않는 사용자입니다.");
        }
        log.info("User : " + user);
        boolean flag = dto.getPassword().equals(user.getPassword());
        if(!flag){
            throw new AuthException(400, "비밀번호가 일치하지 않습니다.");
        }
        String accessToken = jwtProvider.createAccessToken(entityToDto(user));
        String refreshToken = jwtProvider.createRefreshToken(entityToDto(user));
        userRepository.modifyTokenById(user.getId(), refreshToken);
        jwtProvider.printPayload(refreshToken);
        jwtProvider.printPayload(accessToken);
        return Messenger.builder()
                .message(user.getName())
                .accessToken(flag ? accessToken : "none")
                .refreshToken(flag ? refreshToken : "none")
                .build();
    }
    @Override
    public Boolean logout(String refreshToken) {
        Long id = jwtProvider.getPayload(refreshToken.substring(7)).get("id", Long.class);
        log.info("id : {}", id);
        userRepository.modifyTokenById(id, "");
        return userRepository.findById(id).get().getToken().isEmpty();
    }

    @Override
    public Messenger register(UserDto dto) {
        return userRepository.save(User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .build()).getId() != null ? Messenger.builder().message("SUCCESS").build() : Messenger.builder().message("FAILURE").build();
    }

    @Override
    public Messenger deleteById(Long id) {
        userRepository.deleteById(id);
        return Messenger.builder()
                .message(userRepository.existsById(id) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public Messenger update(UserDto dto) {
        return userRepository.modifyUserById(dto) == 1 ? Messenger.builder().message("SUCCESS").build() : Messenger.builder().message("FAILURE").build();
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(this::entityToDto).toList();
    }

    @Override
    public UserDto findById(Long id) {
        return userRepository.findById(id).map(this::entityToDto).orElse(null);
    }

    @Override
    public Boolean isExist(String username) {
        return userRepository.isExist(username);
    }


}
