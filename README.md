# Controle de Estoque

## Descrição do Projeto
Este é um sistema completo de controle de estoque para mercados/lojas, desenvolvido como um projeto de grupo. O sistema inclui funcionalidades para cadastrar mercados, produtos e realizar movimentações de estoque (entradas e saídas). Ele possui uma arquitetura com frontend, backend e banco de dados, proporcionando uma interface amigável para o usuário e uma API estruturada para manipulação dos dados.

## Estrutura do Projeto
- **Frontend**: Interface do usuário para interação com o sistema.
- **Backend**: API RESTful para gerenciamento de mercados, produtos e estoque.
- **Banco de Dados**: Armazenamento de dados persistente para mercados, produtos e movimentações de estoque.

## Tecnologias Utilizadas
- **Frontend**: (Defina aqui a tecnologia escolhida, ex: React, Vue.js, Angular)
- **Backend**: (Defina aqui a tecnologia escolhida, ex: Node.js com Express, Django, Flask)
- **Banco de Dados**: (Defina aqui o banco de dados escolhido, ex: MySQL, PostgreSQL, MongoDB)

## Estrutura de Rotas da API
### Rotas de Mercado/Loja

- **POST /mercados**
  - **Descrição**: Cria um novo mercado/loja.
  - **Corpo da Requisição (JSON)**:
    ```json
    {
      "nome": "Supermercado Exemplo",
      "endereco": "Rua das Flores, 123"
    }
    ```
  - **Resposta**: Retorna os detalhes do mercado/loja criado.

- **GET /mercados**
  - **Descrição**: Lista todos os mercados/lojas.
  - **Resposta**: Retorna uma lista de mercados/lojas.

- **GET /mercados/{id}**
  - **Descrição**: Busca um mercado/loja pelo ID.
  - **Resposta**: Retorna os detalhes do mercado/loja correspondente.

- **PUT /mercados/{id}**
  - **Descrição**: Atualiza as informações de um mercado/loja.
  - **Corpo da Requisição (JSON)**:
    ```json
    {
      "nome": "Supermercado Exemplo Atualizado",
      "endereco": "Rua das Flores, 456"
    }
    ```
  - **Resposta**: Retorna o mercado atualizado.

- **DELETE /mercados/{id}**
  - **Descrição**: Exclui um mercado/loja pelo ID.
  - **Resposta**: Confirmação da exclusão.

### Rotas de Produto (por Mercado)

- **POST /mercados/{id_mercado}/produtos**
  - **Descrição**: Cria um novo produto no estoque de um mercado específico.
  - **Corpo da Requisição (JSON)**:
    ```json
    {
      "nome": "Arroz 5kg",
      "descricao": "Arroz branco tipo 1",
      "preco": 20.50,
      "quantidade": 100
    }
    ```
  - **Resposta**: Retorna os detalhes do produto criado no mercado.

- **GET /mercados/{id_mercado}/produtos**
  - **Descrição**: Lista todos os produtos de um mercado específico.
  - **Resposta**: Retorna uma lista de produtos cadastrados no mercado com suas quantidades.

- **GET /mercados/{id_mercado}/produtos/{id_produto}**
  - **Descrição**: Busca os detalhes de um produto específico em um mercado.
  - **Resposta**: Retorna os detalhes do produto correspondente dentro do mercado.

- **PUT /mercados/{id_mercado}/produtos/{id_produto}**
  - **Descrição**: Atualiza as informações de um produto específico em um mercado.
  - **Corpo da Requisição (JSON)**:
    ```json
    {
      "nome": "Arroz 5kg Atualizado",
      "descricao": "Arroz parboilizado",
      "preco": 22.00,
      "quantidade": 150
    }
    ```
  - **Resposta**: Retorna os detalhes do produto atualizado no mercado.

- **DELETE /mercados/{id_mercado}/produtos/{id_produto}**
  - **Descrição**: Exclui um produto específico do estoque de um mercado.
  - **Resposta**: Confirmação da exclusão do produto do estoque do mercado.

### Rotas de Movimentação de Estoque (por Mercado e Produto)

- **POST /mercados/{id_mercado}/produtos/{id_produto}/movimentacoes**
  - **Descrição**: Registra uma movimentação de estoque (entrada ou saída) para um produto em um mercado.
  - **Corpo da Requisição (JSON)**:
    ```json
    {
      "tipo": "entrada",
      "quantidade": 50,
      "data_movimentacao": "2024-10-21"
    }
    ```
  - **Resposta**: Retorna a movimentação registrada.

- **GET /mercados/{id_mercado}/produtos/{id_produto}/movimentacoes**
  - **Descrição**: Lista todas as movimentações de estoque (entradas e saídas) de um produto específico em um mercado.
  - **Resposta**: Retorna uma lista de movimentações de estoque para o produto.

### Rotas de Estoque por Mercado

- **GET /mercados/{id_mercado}/produtos**
  - **Descrição**: Lista todos os produtos e suas quantidades no estoque de um mercado específico.
  - **Resposta**: Retorna a lista de produtos com suas quantidades no estoque do mercado.

## Instruções para Executar o Projeto
1. Clone o repositório: `git clone <URL do repositório>`
2. Navegue até o diretório do projeto: `cd nome_do_projeto`
3. Instale as dependências do backend: `npm install` ou outro comando apropriado
4. Configure o banco de dados no arquivo de configuração.
5. Execute o servidor backend: `npm start` ou o comando configurado.
6. Navegue até o diretório do frontend e instale as dependências: `npm install`
7. Execute o frontend: `npm start` ou o comando configurado.

## Estrutura de Arquivos
- `frontend/`: Código fonte do frontend
- `backend/`: Código fonte do backend
- `database/`: Arquivos de configuração e migração do banco de dados

## Entrega do Projeto
Para a entrega, envie um `.zip` com o código fonte do projeto e um arquivo `txt` contendo as URLs dos repositórios GitHub públicos (caso utilize mais de um repositório). 

---

Desenvolvido por [Giancarlo] e [Fabricio, Poliany, Rafael S.].
