package br.com.sorocaba.vitrine.service;

import br.com.sorocaba.vitrine.exception.ResourceNotFoundException;
import br.com.sorocaba.vitrine.model.Post;
import br.com.sorocaba.vitrine.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service class for Post operations
 * Handles business logic for blog post management
 */
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<Post> listarTodos() {
        return postRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Post> listarPublicados() {
        return postRepository.findByPublicadoTrueOrderByDataPublicacaoDesc();
    }

    @Transactional(readOnly = true)
    public Post buscarPorId(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", id));
    }

    @Transactional(readOnly = true)
    public List<Post> buscarPorTitulo(String titulo) {
        return postRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @Transactional
    public Post salvar(Post post) {
        // Set publication date when publishing
        if (post.getPublicado() && post.getDataPublicacao() == null) {
            post.setDataPublicacao(LocalDateTime.now());
        }
        return postRepository.save(post);
    }

    @Transactional
    public void deletar(Long id) {
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long contarTodos() {
        return postRepository.count();
    }
}

