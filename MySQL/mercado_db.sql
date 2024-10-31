-- Criando o banco de dados e tabelas principais
CREATE DATABASE IF NOT EXISTS mercado_db;
USE mercado_db;

-- Tabela para armazenar informações dos mercados
CREATE TABLE IF NOT EXISTS mercados (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    endereco VARCHAR(100) NOT NULL
);

-- Tabela para armazenar informações dos produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100),
    preco FLOAT NOT NULL,
    quantidade INT NOT NULL,
    mercado_id INT NOT NULL,
    CONSTRAINT fk_mercado_id
        FOREIGN KEY (mercado_id) REFERENCES mercados(id) ON DELETE CASCADE
);

-- Tabela para registrar movimentações de estoque
CREATE TABLE IF NOT EXISTS movimentacoes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATETIME NOT NULL,
    produto_id INT NOT NULL,
    mercado_id INT NOT NULL,
    CONSTRAINT fk_produto_id
        FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    CONSTRAINT fk_mercado_id_mov
        FOREIGN KEY (mercado_id) REFERENCES mercados(id) ON DELETE CASCADE
);

-- Consultas para verificar as tabelas
SELECT * FROM mercados;
SELECT * FROM produtos;
SELECT * FROM movimentacoes;
SHOW TABLES;

