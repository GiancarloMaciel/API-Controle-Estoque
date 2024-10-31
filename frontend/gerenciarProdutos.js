
function carregarMercados() {
    fetch('http://localhost:3000/mercados') // URL para buscar os mercados
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar mercados: ' + response.statusText);
            }
            return response.json();
        })
        .then(mercados => {
            const selectMercado = document.getElementById("mercado");
            mercados.forEach(mercado => {
                const option = document.createElement("option");
                option.value = mercado.id; // Assumindo que o id do mercado é um campo no objeto retornado
                option.textContent = mercado.nome; // Assumindo que o nome do mercado é um campo no objeto retornado
                selectMercado.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
            document.getElementById("mensagem").innerText = error.message;
        });
}

// Event listener para o envio do formulário
document.getElementById("form-produto").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const mercado = parseInt(document.getElementById("mercado").value); // ID do mercado selecionado

    const produto = {
        nome,
        descricao,
        preco,
        quantidade
    };

    // Fazendo a requisição para adicionar o produto
    fetch(`http://localhost:3000/mercados/${mercado}/produtos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar produto: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Mensagem de sucesso
        document.getElementById("mensagem").innerText = "Produto adicionado com sucesso!";
        document.getElementById("form-produto").reset(); // Reseta o formulário
    })
    .catch(error => {
        // Mensagem de erro
        document.getElementById("mensagem").innerText = error.message;
    });
});

// Carregar os mercados ao carregar a página
window.onload = carregarMercados;
