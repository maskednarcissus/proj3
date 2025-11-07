package br.com.sorocaba.vitrine.repository;

import br.com.sorocaba.vitrine.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Post entity
 * Provides database operations for blog posts
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    List<Post> findByPublicadoTrueOrderByDataPublicacaoDesc();
    
    List<Post> findByTituloContainingIgnoreCase(String titulo);
}

