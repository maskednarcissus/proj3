package br.com.sorocaba.vitrine.controller.api;

import br.com.sorocaba.vitrine.dto.PostDTO;
import br.com.sorocaba.vitrine.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller exposing blog post information for the SPA frontend.
 */
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostApiController {

    private final PostService postService;

    @GetMapping
    public List<PostDTO> listarPublicados() {
        return postService.listarPublicadosDTO();
    }

    @GetMapping("/{id}")
    public PostDTO buscarPorId(@PathVariable Long id) {
        return postService.buscarDtoPorId(id);
    }
}


