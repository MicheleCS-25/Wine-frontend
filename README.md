🍇 WineFlow Frontend (Interface de Usuário)
Este diretório contém o frontend da aplicação WineFlow, responsável pela interface de usuário (UI) para o gerenciamento de vinhos. É uma Single Page Application (SPA) que se comunica com a WineFlow API (o backend Flask) para realizar operações CRUD (Criar, Ler, Atualizar, Deletar).

✨ Tecnologias Frontend
O projeto utiliza uma abordagem lightweight (leve), focando na velocidade e simplicidade, sem a necessidade de frameworks JavaScript complexos.

HTML5: Estrutura base da aplicação.
CSS3 (Puro): Para estilos e animações simples.
JavaScript (ES6+): Lógica de interação com o DOM e manipulação de requisições API.
Bootstrap 5.3: Framework CSS para layout, responsividade e componentes visuais (tabela, formulários, botões).
📂 Estrutura do Frontend
O frontend é composto por dois arquivos principais que o servidor Flask serve:

frontend-api/
├── templates/
│   └── index.html      # A página principal que define a estrutura e o layout.
└── static/
    ├── scripts.js      # Contém toda a lógica JavaScript para interagir com a API.
    ├── style.css       # Estilos personalizados (incluindo classes de animação como ⁠ .fade-in ⁠).
    └── vinho.jpg # Imagem de banner/ilustração.
🛠️ Funcionalidades e Interação com a API
O frontend é iniciado pela função document.addEventListener('DOMContentLoaded') no Scripts.js, que imediatamente chama buscarVinhos() e prepara o formulário de cadastro.

Funcionalidade	Método	Endpoint (API Flask)	Detalhes no Scripts.js
Listar Vinhos (Leitura)	GET	/buscar_vinhos	Chamado ao carregar a página e após cada sucesso de CRUD. Renderiza os dados na vinhosTable.
Cadastrar Vinho (Criação)	POST	/cadastrar_vinho	Envia os dados do formulário como JSON. Em caso de sucesso (201), limpa o formulário e atualiza a tabela.
Deletar Vinho (Deleção)	DELETE	/deletar_vinho/<id>	Executa a exclusão após confirmação via window.confirm(). Em caso de sucesso (200), atualiza a tabela.
Comunicação Assíncrona
Toda a comunicação com o backend é feita de forma assíncrona usando a API fetch do JavaScript. O frontend trata ativamente os códigos de status HTTP:

Status 200 ou 201 (Sucesso): Exibe uma mensagem verde de sucesso e atualiza a lista de vinhos.
Status 400 ou 404 (Erro): Exibe uma mensagem vermelha de erro, geralmente contendo detalhes de validação ou de item não encontrado, retornados pelo backend Flask.
🚀 Como Visualizar
Para que o frontend funcione corretamente (especialmente para que os arquivos em static/ sejam carregados), você deve acessar a aplicação servida pelo backend Flask.

Certifique-se de que o Backend (app.py) esteja rodando.
Abra seu navegador e acesse a URL principal:
http://127.0.0.1:5000/
