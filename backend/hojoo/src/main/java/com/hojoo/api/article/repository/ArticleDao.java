package com.hojoo.api.article.repository;

import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.common.Messenger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface ArticleDao {
    ArticleDto getArticle(Long id);

    Long submitAnswer(ArticleDto articleDto);

    Slice<ArticleDto> getPage(String keyword, Pageable pageable);

    List<ArticleDto> getListAll();

    List<ArticleDto> findTitleByKeyword(String keyword);
}
