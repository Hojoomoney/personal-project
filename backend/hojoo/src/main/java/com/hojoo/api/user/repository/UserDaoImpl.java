package com.hojoo.api.user.repository;

import com.hojoo.api.user.model.QUser;
import com.hojoo.api.user.model.UserDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao{
    private final JPAQueryFactory factory;
    private final QUser user = QUser.user;
    @Override
    public void modifyTokenById(Long id, String token) {
        factory.update(user)
                .set(user.token, token)
                .where(user.id.eq(id))
                .execute();
    }

    @Override
    public Long modifyUserById(UserDto userDto) {
        return factory.update(user)
                .set(user.password, userDto.getPassword())
                .set(user.name, userDto.getName())
                .set(user.phone, userDto.getPhone())
                .where(user.id.eq(userDto.getId()))
                .execute();
    }

    @Override
    public Boolean isExist(String username) {
        return factory.selectOne()
                .from(user)
                .where(user.username.eq(username))
                .fetchFirst() != null;
    }
}
