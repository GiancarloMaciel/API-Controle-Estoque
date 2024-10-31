document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('movimentacaoForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário

        const idMercado = document.getElementById('id_mercado').value;
        const idProduto = document.getElementById('id_produto').value;
        const tipo = document.getElementById('tipo').value;
        const quantidade = document.getElementById('quantidade').value;
        const dataMovimentacao = document.getElementById('data_movimentacao').value;

        fetch(`http://localhost:3000/mercados/${idMercado}/produtos/${idProduto}/movimentacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: tipo,
                quantidade: quantidade,
                data_movimentacao: dataMovimentacao
            })
        })
        .then(function(response) {
            if (!response.ok) {
                return response.json().then(function(errorData) {
                    throw new Error(errorData.erro || 'Erro ao registrar movimentação');
                });
            }
            return response.json();
        })
        .then(function(data) {
            // Adiciona a movimentação à tabela
            const tabelaBody = document.getElementById('tabelaMovimentacoes').getElementsByTagName('tbody')[0];
            const novaLinha = tabelaBody.insertRow();
            novaLinha.insertCell(0).textContent = idMercado;
            novaLinha.insertCell(1).textContent = idProduto;
            novaLinha.insertCell(2).textContent = tipo;
            novaLinha.insertCell(3).textContent = quantidade;
            novaLinha.insertCell(4).textContent = dataMovimentacao;

            document.getElementById('mensagem').textContent = data.message || 'Movimentação registrada com sucesso!';
            document.getElementById('mensagem').style.color = 'green'; // Mensagem em verde
            document.getElementById('movimentacaoForm').reset(); // Limpa o formulário
        })
        .catch(function(error) {
            console.error('Erro:', error);
            document.getElementById('mensagem').textContent = error.message || 'Erro ao registrar movimentação.';
            document.getElementById('mensagem').style.color = 'red'; // Mensagem em vermelho
        });
    });
});
