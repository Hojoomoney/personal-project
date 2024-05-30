package com.hojoo.api.article.repository;

import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.common.Messenger;

public interface ArticleDao {
    ArticleDto getArticle(Long id);

    Long submitAnswer(ArticleDto articleDto);
}
