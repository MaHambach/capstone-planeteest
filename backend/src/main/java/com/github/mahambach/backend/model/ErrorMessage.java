package com.github.mahambach.backend.model;

import java.time.LocalDateTime;

public record ErrorMessage(
        String errorMsg,
        LocalDateTime errorTime
) {
}
