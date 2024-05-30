package com.hojoo.api.user.repository;

import com.hojoo.api.article.model.Article;
import com.hojoo.api.article.model.QArticle;
import com.hojoo.api.common.exception.AuthException;
import com.hojoo.api.user.model.QUser;
import com.hojoo.api.user.model.UserArticlesDto;
import com.hojoo.api.user.model.UserDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;


@Repository
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao{
    private final JPAQueryFactory factory;
    private final QUser user = QUser.user;
    private final QArticle article = QArticle.article;
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

    @Override
    public UserDto getUserById(Long id) {
        UserDto userDto = factory.select(
                        Projections.fields(UserDto.class,
                                user.id,
                                user.username,
                                user.password,
                                user.name,
                                user.phone)
                )
                .from(user)
                .where(user.id.eq(id))
                .fetchOne();

        if (userDto == null) {
            throw new AuthException(400,"로그인 후 이용해주세요.");
        }

        // Fetch articles written by the user
        List<Article> articles = factory.selectFrom(article)
                .where(article.user.id.eq(id))
                .fetch();

        userDto.setArticles(articles.stream()
                .map(article -> UserArticlesDto.builder()
                                            .id(article.getId())
                                            .title(article.getTitle())
                                            .build())
                .toList());

        return userDto;
    }
}
