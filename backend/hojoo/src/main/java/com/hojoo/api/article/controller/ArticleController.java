package com.hojoo.api.article.controller;


import com.hojoo.api.article.model.ArticleDto;
import com.hojoo.api.article.service.ArticleService;
import com.hojoo.api.common.Messenger;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/article")
@Slf4j
public class ArticleController {

    private final ArticleService service;

    @PostMapping("/write")
    public ResponseEntity<Messenger> write(@RequestBody ArticleDto dto){
        return ResponseEntity.ok(service.write(dto));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ArticleDto>> getListAll() {
        return ResponseEntity.ok(service.getListAll());
    }

    @GetMapping("/detail")
    public ResponseEntity<ArticleDto> findById(@RequestParam("id") Long id){
        log.info("입력받은 정보 : {}", id);
        return ResponseEntity.ok(service.findById(id));
    }

    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity<Messenger> deleteById(@RequestParam("id") Long id){
        log.info("입력받은 정보 : {}", id);
        return ResponseEntity.ok(service.deleteById(id));
    }

    @PutMapping("/modify")
    @Transactional
    public ResponseEntity<Messenger> modify(@RequestBody ArticleDto articleDto) {
        log.info("입력받은 정보 : {}", articleDto );
        return ResponseEntity.ok(service.modify(articleDto));
    }

    @GetMapping("/page")
    public ResponseEntity<List<ArticleDto>> getPage(@RequestParam("keyword") String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        return ResponseEntity.ok(service.getPage(keyword, pageable).getContent());
    }
    @GetMapping("/search")
    public ResponseEntity<List<ArticleDto>> findTitleByKeyword(@RequestParam("keyword") String keyword){
        return ResponseEntity.ok(service.findTitleByKeyword(keyword));
    }
}
