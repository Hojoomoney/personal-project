package com.hojoo.api.article.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component //Object 같은거
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDto {
    private Long id;
    private String title;
    private String question;
    private String answer;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
    private Long writerId;
    private String writerName;
}
