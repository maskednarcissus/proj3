package br.com.sorocaba.vitrine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Post
 * Used for API responses and forms
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String titulo;
    private String conteudo;
    private Long autorId;
    private String autorNome;
    private Boolean publicado;
    private LocalDateTime dataPublicacao;
}

