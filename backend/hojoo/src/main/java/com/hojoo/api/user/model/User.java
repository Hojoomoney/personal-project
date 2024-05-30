package com.hojoo.api.user.model;

import com.hojoo.api.article.model.Article;
import com.hojoo.api.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String token;

    @Builder.Default
    private String role = "USER";

    @OneToMany(cascade = CascadeType.ALL)
    private List<Article> articles;

}
