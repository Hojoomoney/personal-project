package com.hojoo.api.crawler.repository;

import com.hojoo.api.crawler.model.Crawler;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.*;

@Repository
@Slf4j
public class CrawlerRepository {
    private List<Crawler> articles;
    public List<Crawler> findNews() throws IOException {
        try {
            Document doc = Jsoup.connect("https://news.naver.com/breakingnews/section/102/249").get();
            this.articles = new ArrayList<>();

            Elements articleElements = doc.select("ul.sa_list > li.sa_item");

            for (Element articleElement : articleElements) {
                String imgLink = articleElement.select("a.sa_thumb_link").attr("href");
                String title = articleElement.select("a.sa_text_title").text();
                String content = articleElement.select("div.sa_text_lede").text();
                String imgSrc = articleElement.select("img").attr("data-src");

                articles.add(new Crawler(imgLink, title, content, imgSrc));
            }

            // Print out the articles for demonstration
//            for (Crawler crawler : articles) {
//                System.out.println(crawler);
//            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return articles;
    }
}
