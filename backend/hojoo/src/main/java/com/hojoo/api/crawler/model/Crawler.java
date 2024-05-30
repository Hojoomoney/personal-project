package com.hojoo.api.crawler.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Crawler {
    private String imgLink;
    private String title;
    private String content;
    private String imgSrc;
}
