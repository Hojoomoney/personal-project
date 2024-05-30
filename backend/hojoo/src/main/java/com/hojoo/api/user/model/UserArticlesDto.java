package com.hojoo.api.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component //Object 같은거
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserArticlesDto {
    private Long id;
    private String title;
}
