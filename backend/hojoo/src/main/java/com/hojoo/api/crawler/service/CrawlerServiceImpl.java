package com.hojoo.api.crawler.service;

import com.hojoo.api.crawler.model.Crawler;
import com.hojoo.api.crawler.repository.CrawlerRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CrawlerServiceImpl implements CrawlerService{
    private final CrawlerRepository crawlerRepository;
    @Override
    public List<Crawler> findNews() throws IOException {
        return crawlerRepository.findNews();
    }
}
