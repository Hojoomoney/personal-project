package com.hojoo.api.article.repository;

import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.article.model.QArticle;
import com.hojoo.api.common.Messenger;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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


}
