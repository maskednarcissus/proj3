package br.com.sorocaba.vitrine.service;

import br.com.sorocaba.vitrine.dto.ProdutoDTO;
import br.com.sorocaba.vitrine.exception.ResourceNotFoundException;
import br.com.sorocaba.vitrine.model.Produto;
import br.com.sorocaba.vitrine.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for Produto (Product) operations
 * Handles business logic for product management
 */
@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Transactional(readOnly = true)
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Produto> listarAtivos() {
        return produtoRepository.findByAtivoTrue();
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> listarAtivosDTO() {
        return produtoRepository.findByAtivoTrue()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto", id));
    }

    @Transactional(readOnly = true)
    public ProdutoDTO buscarDtoPorId(Long id) {
        return toDto(buscarPorId(id));
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    @Transactional
    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Transactional
    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long contarTodos() {
        return produtoRepository.count();
    }

    private ProdutoDTO toDto(Produto produto) {
        return new ProdutoDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getImagemUrl(),
                produto.getEstoque(),
                produto.getAtivo()
        );
    }
}

