const API_BASE_URL = 'http://127.0.0.1:5000'; 

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o listener para o formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', cadastrarVinho);
    }

    // Carrega a lista de vinhos ao iniciar a página
    buscarVinhos();
});

// ==========================================================
// FUNÇÃO DE CADASTRO (POST)
// ==========================================================
async function cadastrarVinho(event) {
    event.preventDefault(); 

    const nome_vinho = document.getElementById('nome_vinho').value;
    // O input type="date" já retorna a data no formato YYYY-MM-DD
    const data_fabricacao = document.getElementById('data_fabricacao').value;
    const cidade_producao = document.getElementById('cidade_producao').value;
    const statusMessage = document.getElementById('statusMessage');

    try {
        const response = await fetch(`${API_BASE_URL}/cadastrar_vinho`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome_vinho,
                data_fabricacao,
                cidade_producao
            }),
        });

        const data = await response.json();

        if (response.ok) { 
            // Feedback visual de sucesso
            statusMessage.className = 'mt-3 text-success fade-in';
            statusMessage.textContent = data.message || 'Vinho cadastrado com sucesso!';
            
            document.getElementById('cadastroForm').reset(); 
            buscarVinhos(); // Atualiza a lista após o cadastro
        } else {
            // Feedback visual de erro
            statusMessage.className = 'mt-3 text-danger';
            statusMessage.textContent = `Erro: ${data.message || 'Falha ao cadastrar.'}`;
        }
    } catch (error) {
        // Erro de rede (servidor offline, CORS, etc.)
        statusMessage.className = 'mt-3 text-danger';
        statusMessage.textContent = 'Erro de conexão com o servidor. Verifique se o Flask está rodando.';
        console.error('Erro de conexão:', error);
    }
}

// ==========================================================
// FUNÇÃO DE BUSCA/EXIBIÇÃO (GET) 
// ==========================================================
async function buscarVinhos() {
    const tableContainer = document.getElementById('vinhosTable');
    const listaVinhosBody = document.getElementById('listaVinhos'); // O <tbody>
    const noWineMessage = document.getElementById('noWineMessage');
    listaVinhosBody.innerHTML = ''; // Limpa o corpo da tabela

    try {
        const response = await fetch(`${API_BASE_URL}/buscar_vinhos`);
        const vinhos = await response.json();

        // O Flask retorna 200 OK com uma lista vazia ([]) se não houver vinhos.
        if (response.ok && Array.isArray(vinhos) && vinhos.length > 0) {
            tableContainer.style.display = 'table'; 
            noWineMessage.classList.add('d-none');
            
            vinhos.forEach(vinho => {
                const linhaTabela = criarLinhaVinho(vinho);
                listaVinhosBody.appendChild(linhaTabela);
            });
        } else {
            // Lista vazia
            tableContainer.style.display = 'none'; 
            noWineMessage.classList.remove('d-none');
            noWineMessage.textContent = 'Nenhum Vinho Encontrado.';
        }
    } catch (error) {
        console.error('Erro ao buscar vinhos:', error);
        tableContainer.style.display = 'none';
        noWineMessage.textContent = 'Não foi possível carregar os dados (Verifique o servidor Flask).';
        noWineMessage.classList.remove('d-none');
    }
}

// Função auxiliar para criar a LINHA DA TABELA (<tr>)
function criarLinhaVinho(vinho) {
    const row = document.createElement('tr');
    row.classList.add('fade-in');

    // Coluna ID
    const idCell = document.createElement('th');
    idCell.setAttribute('scope', 'row');
    idCell.textContent = vinho.id;
    row.appendChild(idCell);

    // Coluna Nome do Vinho
    const nomeCell = document.createElement('td');
    nomeCell.textContent = vinho.nome_vinho;
    row.appendChild(nomeCell);

    // Coluna Data Fabricação
    const dataCell = document.createElement('td');
    dataCell.textContent = vinho.data_fabricacao;
    row.appendChild(dataCell);

    // Coluna Cidade Produção
    const cidadeCell = document.createElement('td');
    cidadeCell.textContent = vinho.cidade_producao;
    row.appendChild(cidadeCell);

    // Coluna Ações (Botão Deletar)
    const acoesCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Deletar';
    deleteButton.onclick = () => deletarVinho(vinho.id, vinho.nome_vinho);
    acoesCell.appendChild(deleteButton);
    row.appendChild(acoesCell);
    
    return row;
}

// ==========================================================
// FUNÇÃO DE DELETAR (DELETE) - CORRIGIDA (sem alert/confirm)
// ==========================================================
async function deletarVinho(id, nome) {
    // Usando window.confirm para manter a confirmação do usuário, mas evitando alert()
    if (!window.confirm(`Tem certeza que deseja deletar o vinho "${nome}" (ID: ${id})?`)) {
        return;
    }
    
    // Mostra mensagem de status na UI (opcional)
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.className = 'mt-3 text-info';
    statusMessage.textContent = `Deletando vinho ${nome}...`;

    try {
        const response = await fetch(`${API_BASE_URL}/deletar_vinho/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
            // Substituído alert() por console.log e mensagem de status na UI
            console.log(`Vinho "${nome}" deletado com sucesso!`);
            statusMessage.className = 'mt-3 text-success';
            statusMessage.textContent = `Vinho "${nome}" deletado com sucesso!`;
            buscarVinhos(); // Atualiza a lista
        } else {
            // Substituído alert() por console.error e mensagem de status na UI
            console.error(`Erro ao deletar vinho: ${data.message || 'Falha na exclusão.'}`);
            statusMessage.className = 'mt-3 text-danger';
            statusMessage.textContent = `Erro ao deletar: ${data.message || 'Falha na exclusão.'}`;
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        statusMessage.className = 'mt-3 text-danger';
        statusMessage.textContent = 'Erro de conexão ao tentar deletar o vinho.';
    }
}