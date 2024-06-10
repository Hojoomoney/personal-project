package com.hojoo.api.user.repository;

import com.hojoo.api.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> , UserDao{
    User findByUsername(String username);
}
