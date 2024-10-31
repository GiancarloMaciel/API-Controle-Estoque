const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Use o middleware CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, '../', 'frontend'))); // Supondo que o CSS está na pasta 'public'

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuração do pool de conexões
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mercado_db',
    connectionLimit: 10 // Define um limite de conexões simultâneas
});

// Servir arquivos estáticos da raiz do projeto
/*app.use(express.static(path.join(__dirname, 'backend')));*/


// Método POST para cadastrar mercados
app.post('/mercados', (req, res) => {
    console.log('Dados recebidos para cadastro de mercado:', req.body);
    const { nome, endereco } = req.body;

    if (!nome || !endereco) {
        return res.status(400).json({ erro: 'Nome e endereço são obrigatórios.' });
    }

    const query = 'INSERT INTO mercados (nome, endereco) VALUES (?, ?)';
    pool.query(query, [nome, endereco], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao cadastrar mercado:', erro);
            return res.status(500).json({ erro: 'Erro ao cadastrar mercado.' });
        }
        console.log('Mercado cadastrado com sucesso, ID:', resultado.insertId);
        return res.status(201).json({ sucesso: true, id: resultado.insertId });
    });
});

// Método GET para listar mercados
app.get('/mercados', (req, res) => {
    const query = 'SELECT * FROM mercados';

    pool.query(query, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao listar mercados:', erro);
            return res.status(500).json({ erro: 'Erro ao listar mercados.' });
        }
        console.log('Mercados listados com sucesso:', resultado);
        res.status(200).json(resultado);
    });
});

// Método DELETE para excluir mercado
app.delete('/mercados/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM mercados WHERE id = ?';

    pool.query(query, [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao deletar mercado:', erro);
            return res.status(500).json({ erro: 'Erro ao deletar mercado.' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Mercado não encontrado.' });
        }

        console.log('Mercado deletado com sucesso, ID:', id);
        res.status(204).send(); // Retorna um status 204 No Content
    });
});

// Método GET para buscar mercado pelo id
app.get('/mercados/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT nome, endereco FROM mercados WHERE id = ?';

    pool.query(query, [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao buscar mercado pelo ID:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar mercado pelo ID.' });
        }
        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Mercado não encontrado.' });
        }
        console.log('Mercado encontrado com sucesso:', resultado[0]);
        res.status(200).json(resultado[0]);
    });
});

// Método PUT para atualizar mercado
app.put('/mercados/:id', (req, res) => {
    const { id } = req.params;
    const { nome, endereco } = req.body;
    const query = 'UPDATE mercados SET nome = ?, endereco = ? WHERE id = ?';

    pool.query(query, [nome, endereco, id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao atualizar mercado:', erro);
            return res.status(500).json({ erro: 'Erro ao atualizar mercado.' });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Mercado não encontrado.' });
        }
        console.log('Mercado atualizado com sucesso, ID:', id);
        res.status(200).json({ sucesso: true, mensagem: 'Mercado atualizado com sucesso.' });
    });
});

// Método POST para cadastrar produtos em um mercado
app.post('/mercados/:id/produtos', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade } = req.body;
    const query = 'INSERT INTO produtos (nome, descricao, preco, quantidade, mercado_id) VALUES (?, ?, ?, ?, ?)';

    pool.query(query, [nome, descricao, preco, quantidade, id], (erro, resultados) => {
        if (erro) {
            console.error('Erro ao cadastrar produto:', erro);
            return res.status(500).json({ erro: 'Erro ao cadastrar produto.' });
        }
        console.log('Produto cadastrado com sucesso, ID:', resultados.insertId);
        return res.status(201).json({ sucesso: true, id: resultados.insertId });
    });
});

// Método GET para listar produtos de um mercado
app.get('/mercados/:id/produtos', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM produtos WHERE mercado_id = ?';

    pool.query(query, [id], (erro, resultados) => {
        if (erro) {
            console.error('Erro ao listar produtos do mercado:', erro);
            return res.status(500).json({ erro: 'Erro ao listar produtos do mercado.' });
        }
        console.log('Produtos listados com sucesso para o mercado ID:', id);
        res.status(200).json(resultados);
    });
});

// Método POST para cadastrar movimentação de estoque
app.post('/mercados/:id_mercado/produtos/:id_produto/movimentacoes', (req, res) => {
    const { id_mercado, id_produto } = req.params;
    const { tipo, quantidade, data_movimentacao } = req.body;

    console.log('Dados recebidos para movimentação de estoque:', req.body);

    // Validação simples para garantir que os campos obrigatórios estão preenchidos
    if (!tipo || !quantidade || !data_movimentacao) {
        return res.status(400).json({ erro: 'Tipo, quantidade e data de movimentação são obrigatórios.' });
    }

    const query = `
        INSERT INTO movimentacoes (tipo, quantidade, data_movimentacao, produto_id, mercado_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(query, [tipo, quantidade, data_movimentacao, id_produto, id_mercado], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao registrar movimentação:', erro);
            return res.status(500).json({ erro: 'Erro ao registrar movimentação.' });
        }
        console.log('Movimentação de estoque registrada com sucesso, ID:', resultado.insertId);
        res.status(201).json({ sucesso: true, id: resultado.insertId });
    });
});

// Rota para listar movimentações de um produto específico
app.get('/mercados/:id_mercado/produtos/:id_produto/movimentacoes', (req, res) => {
    const { id_mercado, id_produto } = req.params;

    const query = `
        SELECT tipo, quantidade, data_movimentacao FROM movimentacoes 
        WHERE mercado_id = ? AND produto_id = ?
    `;

    pool.query(query, [id_mercado, id_produto], (erro, resultados) => {
        if (erro) {
            console.error('Erro ao listar movimentações:', erro);
            return res.status(500).json({ erro: 'Erro ao listar movimentações.' });
        }
        console.log('Movimentações listadas com sucesso:', resultados);
        res.status(200).json(resultados);
    });
});

// Método DELETE para excluir produtos de um mercado
app.delete('/mercados/:mercado_id/produtos/:produto_id', (req, res) => {
    const { mercado_id, produto_id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ? AND mercado_id = ?';

    pool.query(query, [produto_id, mercado_id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao deletar produto:', erro);
            return res.status(500).json({ erro: 'Erro ao deletar produto.' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        console.log('Produto deletado com sucesso, ID:', produto_id);
        res.status(204).send(); // Retorna um status 204 No Content
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
