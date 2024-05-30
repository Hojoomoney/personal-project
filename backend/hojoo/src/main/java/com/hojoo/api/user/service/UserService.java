package com.hojoo.api.user.service;

import com.hojoo.api.common.Messenger;
import com.hojoo.api.user.model.User;
import com.hojoo.api.user.model.UserDto;

import java.util.List;

public interface UserService {
    Messenger login(UserDto userDto);
    Boolean logout(String refreshToken);
    default UserDto entityToDto(User ent){ //entity 를 dto로 바꾸는 것
        return UserDto.builder()
                .id(ent.getId())
                .username(ent.getUsername())
                .password(ent.getPassword())
                .name(ent.getName())
                .phone(ent.getPhone())
                .regDate(ent.getRegDate())
                .modDate(ent.getModDate())
                .role(ent.getRole())
                .build();
    }

    Messenger register(UserDto dto);

    Messenger deleteById(Long id);

    Messenger update(UserDto dto);

    List<UserDto> findAll();

    UserDto findById(Long id);

    Boolean isExist(String username);

    UserDto getUserById(Long id);
}
