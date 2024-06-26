package com.hojoo.api.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Messenger {
    private String message;
    private int status;
    private String accessToken;
    private String refreshToken;
}
