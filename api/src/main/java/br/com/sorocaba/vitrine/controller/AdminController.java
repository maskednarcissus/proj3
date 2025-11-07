package br.com.sorocaba.vitrine.controller;

import br.com.sorocaba.vitrine.model.Produto;
import br.com.sorocaba.vitrine.model.Post;
import br.com.sorocaba.vitrine.model.Usuario;
import br.com.sorocaba.vitrine.service.ProdutoService;
import br.com.sorocaba.vitrine.service.PostService;
import br.com.sorocaba.vitrine.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * Controller for the Admin panel
 * Handles administrative operations for users, products, and posts
 */
@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UsuarioService usuarioService;
    private final ProdutoService produtoService;
    private final PostService postService;

    @GetMapping
    public String dashboard(Model model) {
        model.addAttribute("title", "Admin — VitrineSorocabana");
        model.addAttribute("totalUsuarios", usuarioService.contarTodos());
        model.addAttribute("totalProdutos", produtoService.contarTodos());
        model.addAttribute("totalPosts", postService.contarTodos());
        return "admin/dashboard";
    }

    // ========== USUÁRIOS ==========
    
    @GetMapping("/usuarios")
    public String listarUsuarios(Model model) {
        model.addAttribute("usuarios", usuarioService.listarTodos());
        return "admin/usuarios/lista";
    }
    
    @GetMapping("/usuarios/novo")
    public String novoUsuarioForm(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "admin/usuarios/form";
    }
    
    @PostMapping("/usuarios")
    public String salvarUsuario(@Valid @ModelAttribute Usuario usuario, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "admin/usuarios/form";
        }
        usuarioService.salvar(usuario);
        return "redirect:/admin/usuarios";
    }
    
    @GetMapping("/usuarios/editar/{id}")
    public String editarUsuarioForm(@PathVariable Long id, Model model) {
        model.addAttribute("usuario", usuarioService.buscarPorId(id));
        return "admin/usuarios/form";
    }
    
    @PostMapping("/usuarios/deletar/{id}")
    public String deletarUsuario(@PathVariable Long id) {
        usuarioService.deletar(id);
        return "redirect:/admin/usuarios";
    }

    // ========== PRODUTOS ==========
    
    @GetMapping("/produtos")
    public String listarProdutos(Model model) {
        model.addAttribute("produtos", produtoService.listarTodos());
        return "admin/produtos/lista";
    }
    
    @GetMapping("/produtos/novo")
    public String novoProdutoForm(Model model) {
        model.addAttribute("produto", new Produto());
        return "admin/produtos/form";
    }
    
    @PostMapping("/produtos")
    public String salvarProduto(@Valid @ModelAttribute Produto produto, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "admin/produtos/form";
        }
        produtoService.salvar(produto);
        return "redirect:/admin/produtos";
    }
    
    @GetMapping("/produtos/editar/{id}")
    public String editarProdutoForm(@PathVariable Long id, Model model) {
        model.addAttribute("produto", produtoService.buscarPorId(id));
        return "admin/produtos/form";
    }
    
    @PostMapping("/produtos/deletar/{id}")
    public String deletarProduto(@PathVariable Long id) {
        produtoService.deletar(id);
        return "redirect:/admin/produtos";
    }

    // ========== POSTS ==========
    
    @GetMapping("/posts")
    public String listarPosts(Model model) {
        model.addAttribute("posts", postService.listarTodos());
        return "admin/posts/lista";
    }
    
    @GetMapping("/posts/novo")
    public String novoPostForm(Model model) {
        model.addAttribute("post", new Post());
        return "admin/posts/form";
    }
    
    @PostMapping("/posts")
    public String salvarPost(@Valid @ModelAttribute Post post, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "admin/posts/form";
        }
        postService.salvar(post);
        return "redirect:/admin/posts";
    }
    
    @GetMapping("/posts/editar/{id}")
    public String editarPostForm(@PathVariable Long id, Model model) {
        model.addAttribute("post", postService.buscarPorId(id));
        return "admin/posts/form";
    }
    
    @PostMapping("/posts/deletar/{id}")
    public String deletarPost(@PathVariable Long id) {
        postService.deletar(id);
        return "redirect:/admin/posts";
    }
}

