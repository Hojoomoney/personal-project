package com.hojoo.api.article.service;

import com.hojoo.api.article.model.Article;
import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.common.Messenger;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface ArticleService {

    default ArticleDto entityToDto(Article ent) {
        return ArticleDto.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .question(ent.getQuestion())
                .writerId(ent.getUser().getId())
                .writerName(ent.getUser().getName())
                .modDate(ent.getModDate())
                .build();
    }
    Messenger write(ArticleDto articleDto);

    List<ArticleDto> getListAll();

    Messenger deleteById(Long id);

    Messenger modify(ArticleDto articleDto);

    ArticleDto findById(Long id);

    List<ArticleDto> findTitleByKeyword(String keyword);
}
