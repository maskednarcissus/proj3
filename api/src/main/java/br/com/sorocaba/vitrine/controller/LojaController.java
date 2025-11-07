package br.com.sorocaba.vitrine.controller;

import br.com.sorocaba.vitrine.model.Produto;
import br.com.sorocaba.vitrine.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Controller for the Shop (Loja) module
 * Handles product catalog and purchase operations
 */
@Controller
@RequestMapping("/loja")
@RequiredArgsConstructor
public class LojaController {

    private final ProdutoService produtoService;

    @GetMapping
    public String index(Model model) {
        List<Produto> produtos = produtoService.listarTodos();
        model.addAttribute("title", "Loja — VitrineSorocabana");
        model.addAttribute("produtos", produtos);
        return "loja/index";
    }
    
    @GetMapping("/produto/{id}")
    public String detalhesProduto(@PathVariable Long id, Model model) {
        Produto produto = produtoService.buscarPorId(id);
        model.addAttribute("title", produto.getNome() + " — Loja");
        model.addAttribute("produto", produto);
        return "loja/produto-detalhes";
    }
}

