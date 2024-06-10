package com.hojoo.api.user.repository;

import com.hojoo.api.user.model.UserDto;

import javax.swing.text.StyledEditorKit;

public interface UserDao {
    void modifyTokenById(Long id, String token);

    Long modifyUserById(UserDto userDto);

    Boolean isExist(String username);

    UserDto getUserById(Long id);
}
