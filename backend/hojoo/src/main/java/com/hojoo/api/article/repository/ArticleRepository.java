package com.hojoo.api.article.repository;

import com.hojoo.api.article.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleDao{
}
