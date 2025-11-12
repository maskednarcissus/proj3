-- Initial data for VitrineSorocabana
-- This file is executed on application startup (H2 file-based database)
-- Database location: ./data/vitrinedb
-- Note: Data persists between application restarts. To reset, delete the data/ folder.

-- Insert sample users
-- Password for all users: 'admin123' (BCrypt encoded with strength 10)
-- BCrypt hash generated: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
MERGE INTO usuarios (id, nome, email, senha, role, ativo, data_criacao, data_atualizacao) 
KEY(id) VALUES
(1, 'Administrador', 'admin@vitrine.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Usuário Teste', 'user@vitrine.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Administrador2', 'email@teste.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample products
MERGE INTO produtos (id, nome, descricao, preco, imagem_url, estoque, ativo, data_criacao, data_atualizacao) 
KEY(id) VALUES
(1, 'Produto A', 'Descrição detalhada do Produto A', 99.90, NULL, 10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Produto B', 'Descrição detalhada do Produto B', 149.90, NULL, 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Produto C', 'Descrição detalhada do Produto C', 79.90, NULL, 15, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample blog posts
MERGE INTO posts (id, titulo, conteudo, autor_id, publicado, data_publicacao, data_criacao, data_atualizacao) 
KEY(id) VALUES
(1, 'Post de Exemplo', '<p>Este é um post de exemplo com conteúdo demonstrativo.</p><p>Você pode adicionar mais parágrafos e conteúdo HTML aqui.</p>', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Outro Post', '<p>Outro post ilustrativo para o blog.</p><p>Conteúdo rico e interessante sobre diversos temas.</p>', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

