package br.com.sorocaba.vitrine.controller.api;

import br.com.sorocaba.vitrine.dto.ProdutoDTO;
import br.com.sorocaba.vitrine.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller exposing product catalog information for the SPA frontend.
 */
@RestController
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
public class ProdutoApiController {

    private final ProdutoService produtoService;

    @GetMapping
    public List<ProdutoDTO> listarAtivos() {
        return produtoService.listarAtivosDTO();
    }

    @GetMapping("/{id}")
    public ProdutoDTO buscarPorId(@PathVariable Long id) {
        return produtoService.buscarDtoPorId(id);
    }
}


