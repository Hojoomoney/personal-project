package com.hojoo.api.article.model;

import com.hojoo.api.common.BaseEntity;
import com.hojoo.api.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Article extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(length = 3000)
    private String question;
    @Column(length = 3000)
    private String answer;

    @ManyToOne
    private User user;
}
