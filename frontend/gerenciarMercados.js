// Função para buscar e listar mercados
function carregarMercados() {
    fetch('http://localhost:3000/mercados') // URL para buscar os mercados
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar mercados: ' + response.statusText);
            }
            return response.json();
        })
        .then(mercados => {
            const tbody = document.getElementById("tabela-mercados").querySelector("tbody");
            tbody.innerHTML = ''; // Limpa a tabela antes de preencher

            mercados.forEach(mercado => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${mercado.id}</td>
                    <td>${mercado.nome}</td>
                    <td>${mercado.endereco}</td>
                    <td>
                        <button onclick="editarMercado(${mercado.id})">Editar</button>
                        <button onclick="deletarMercado(${mercado.id})">Deletar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            document.getElementById("mensagem").innerText = error.message;
        });
}

// Event listener para o envio do formulário
document.getElementById("form-mercado").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;

    const mercado = {
        nome,
        endereco
    };

    // Fazendo a requisição para adicionar o mercado
    fetch(`http://localhost:3000/mercados`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mercado)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar mercado: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("mensagem").innerText = "Mercado adicionado com sucesso!";
        document.getElementById("form-mercado").reset(); // Reseta o formulário
        carregarMercados(); // Atualiza a lista de mercados
    })
    .catch(error => {
        document.getElementById("mensagem").innerText = error.message;
    });
});

// Função para editar um mercado
function editarMercado(id) {
    const nome = prompt("Novo nome do mercado:");
    const endereco = prompt("Novo endereço do mercado:");

    if (nome && endereco) {
        const mercado = { nome, endereco };

        fetch(`http://localhost:3000/mercados/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mercado)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao editar mercado: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("mensagem").innerText = "Mercado editado com sucesso!";
            carregarMercados(); // Atualiza a lista de mercados
        })
        .catch(error => {
            document.getElementById("mensagem").innerText = error.message;
        });
    }
}

// Função para deletar um mercado
function deletarMercado(id) {
    if (confirm("Tem certeza que deseja excluir este mercado?")) {
        fetch(`http://localhost:3000/mercados/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir mercado: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("mensagem").innerText = "Mercado excluído com sucesso!";
            carregarMercados(); // Atualiza a lista de mercados
        })
        .catch(error => {
            document.getElementById("mensagem").innerText = error.message;
        });
    }
}

// Carregar os mercados ao carregar a página
window.onload = carregarMercados;
