package br.com.sorocaba.vitrine.controller;

import br.com.sorocaba.vitrine.model.Post;
import br.com.sorocaba.vitrine.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Controller for the Blog module
 * Handles blog posts listing and viewing
 */
@Controller
@RequestMapping("/blog")
@RequiredArgsConstructor
public class BlogController {

    private final PostService postService;

    @GetMapping
    public String index(Model model) {
        List<Post> posts = postService.listarTodos();
        model.addAttribute("title", "Blog — VitrineSorocabana");
        model.addAttribute("posts", posts);
        return "blog/index";
    }
    
    @GetMapping("/post/{id}")
    public String detalhesPost(@PathVariable Long id, Model model) {
        Post post = postService.buscarPorId(id);
        model.addAttribute("title", post.getTitulo() + " — Blog");
        model.addAttribute("post", post);
        return "blog/post-detalhes";
    }
}

