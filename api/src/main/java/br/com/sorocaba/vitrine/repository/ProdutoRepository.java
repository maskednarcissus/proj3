package br.com.sorocaba.vitrine.repository;

import br.com.sorocaba.vitrine.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Produto entity
 * Provides database operations for products
 */
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    List<Produto> findByAtivoTrue();
    
    List<Produto> findByNomeContainingIgnoreCase(String nome);
}

