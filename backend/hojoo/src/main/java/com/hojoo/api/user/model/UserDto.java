package com.hojoo.api.user.model;

import com.hojoo.api.article.model.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component //Object 같은거
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String phone;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
    private String token;
    private String role;

    private List<UserArticlesDto> articles;
}
