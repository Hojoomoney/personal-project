package com.hojoo.api.article.repository;

import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.article.model.QArticle;
import com.hojoo.api.common.Messenger;
import com.hojoo.api.user.model.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ArticleDaoImpl implements ArticleDao{
    private final JPAQueryFactory factory;
    private final QArticle article = QArticle.article;
    @Override
    public ArticleDto getArticle(Long id) {
        return factory.select(
                Projections.fields(ArticleDto.class,
                        article.id,
                        article.title,
                        article.question,
                        article.answer,
                        article.modDate)
                        )
                .from(article)
                .where(article.id.eq(id))
                .fetchOne();
    }

    @Override
    public Long submitAnswer(ArticleDto articleDto) {

        return factory.update(article)
                .set(article.answer, articleDto.getAnswer())
                .where(article.id.eq(articleDto.getId()))
                .execute();

    }

    @Override
    public List<ArticleDto> getListAll() {
        return factory.select(
                Projections.fields(ArticleDto.class,
                        article.id,
                        article.title,
                        article.user.name.as("writerName"))
        )
                .from(article)
                .orderBy(article.id.desc())
                .fetch();
    }

    @Override
    public List<ArticleDto> findTitleByKeyword(@Nullable String keyword) {
        return factory.select(
                Projections.fields(ArticleDto.class,
                        article.id,
                        article.title,
                        article.user.name.as("writerName"))
        )
                .from(article)
                .where(article.title.containsIgnoreCase(keyword))
                .orderBy(article.id.desc())
                .fetch();
    }

}
