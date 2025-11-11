package br.com.sorocaba.vitrine.controller.api;

import br.com.sorocaba.vitrine.service.PostService;
import br.com.sorocaba.vitrine.service.ProdutoService;
import br.com.sorocaba.vitrine.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller exposing administrative metrics for the SPA dashboard.
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminApiController {

    private final UsuarioService usuarioService;
    private final ProdutoService produtoService;
    private final PostService postService;

    @GetMapping("/summary")
    public AdminSummaryDTO obterResumo() {
        return new AdminSummaryDTO(
                usuarioService.contarTodos(),
                produtoService.contarTodos(),
                postService.contarTodos()
        );
    }

    public record AdminSummaryDTO(long totalUsuarios, long totalProdutos, long totalPosts) {}
}


