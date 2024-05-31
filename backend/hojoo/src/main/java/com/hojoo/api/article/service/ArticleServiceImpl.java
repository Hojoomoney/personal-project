package com.hojoo.api.article.service;

import com.hojoo.api.article.model.Article;
import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.article.repository.ArticleRepository;
import com.hojoo.api.common.Messenger;
import com.hojoo.api.user.model.User;
import com.hojoo.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Override
    public Messenger write(ArticleDto articleDto) {

        return articleRepository.save(Article.builder()
                .title(articleDto.getTitle())
                .question(articleDto.getQuestion())
                .user(userRepository.findById(articleDto.getWriterId()).orElseThrow(null))
                .build()).getId() != null ? Messenger.builder().message("SUCCESS").build() : Messenger.builder().message("FAILURE").build();
    }

    @Override
    public List<ArticleDto> getListAll() {
        return articleRepository.getListAll();
    }

    @Override
    public Messenger deleteById(Long id) {
        articleRepository.deleteById(id);
        return articleRepository.existsById(id) ? Messenger.builder().message("FAILURE").build() : Messenger.builder().message("SUCCESS").build();
    }

    @Override
    public Messenger modify(ArticleDto articleDto) {
        return articleRepository.submitAnswer(articleDto) == 1 ? Messenger.builder().message("SUCCESS").build() : Messenger.builder().message("FAILURE").build();
    }

    @Override
    public ArticleDto findById(Long id) {
        return articleRepository.getArticle(id);
    }


    @Override
    public List<ArticleDto> findTitleByKeyword(String keyword) {
        return articleRepository.findTitleByKeyword(keyword);
    }


}