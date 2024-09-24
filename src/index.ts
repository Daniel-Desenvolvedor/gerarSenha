/*
    Arquivo: index.ts
    Descrição: Este arquivo TypeScript serve para gerar senhas para serviços que o usuário definirá.
    Também permite que as senhas geradas sejam exportadas no formato CSV.
*/

// Declaração da variável que receberá o select com a id 'servico' da página 'index.html'.
const srvcEscolhido: HTMLSelectElement = document.getElementById('servico') as HTMLSelectElement;

// Adicionando um ouvinte de evento para o evento 'change' do select. Ele chama a função 'opcaoOutro' a cada vez que o usuário muda o item do select.
srvcEscolhido.addEventListener('change', opcaoOutro);

// Declaração da variável que receberá a div com a id 'divOpDiferente' da página 'index.html'.
const divOpDiferente:HTMLDivElement = document.getElementById('opDiferente') as HTMLDivElement;

// Declaração da variável que receberá a caixa de texto com a id 'outraOp' da página 'index.html'.
let opUsuario: HTMLInputElement = document.getElementById('outraOp') as HTMLInputElement;

// Declaração da variável array que receberá ou não o conteúdo da caixa de texto com a id 'outraOp'.
let opUsuarioEscreveu: string[] = [];

// Declaração da variável que receberá o botão com id 'gerarSnh' da página 'index.html'.
const btGerarSenha = document.getElementById("gerarSnh") as HTMLButtonElement;

// Declaração da variável que receberá a div com id 'senhaGrd' da página 'index.html'.
const senhaGerada = document.getElementById("senhaGrd") as HTMLDivElement;

// Declaração da variável que possui letras maiúsculas para a senha.
const letrasMaiu: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Declaração da variável que possui letras minúsculas para a senha.
const letrasMinu: string = "abcdefghijklmnopqrstuvwxyz";

// Declaração da variável que possui caracteres especiais para a senha.
const caracteresEspc: string = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

// Declaração da variável array que armazenará as senhas geradas (quando o usuário confirmar).
let senhasGeradas: string[] = [];

// Declaração da variável que receberá a div com id a 'listarSenhs' da página 'index.html'.
const listarSenhas = document.getElementById("listarSenhs") as HTMLDivElement;

// Declaração da variável que receberá o botão com a id 'gerarSnh' da página 'index.html'.
const btExibirSenhas = document.getElementById("exibirSnhs") as HTMLButtonElement;

// Declaração da variável que receberá a div com a id 'sevicos_Senhas' da página 'index.html'.
const servicos_e_senhas = document.getElementById("sevicos_Senhas") as HTMLDivElement;

// Declaração da variável que receberá o botão com a id 'exportarCSV' da página 'index.html'.
const btExpCSV = document.getElementById("exportarCSV") as HTMLButtonElement;

// Declaração da variável que receberá a div com a id 'resposta_senha_copiada' da página 'index.html'.
const respSenhaCopiada:HTMLDivElement = document.getElementById('resposta_senha_copiada') as HTMLDivElement;

// ----- As linhas abaixo são dos eventos. -----

// Quando o botão de criação de senha for clicado, a função 'gerarSenha' entrará em ação.
btGerarSenha.addEventListener('click', gerarSenha);

// Quando o botão de exibição de senhas for clicado, a função 'exibirSenhasGeradas' entrará em ação.
btExibirSenhas.addEventListener('click', exibirSenhasGeradas);

// Quando o botão de exportação das informações dos serviços e senhas para CSV for clicado, a função 'exportarParaCSV' entrará em ação.
btExpCSV.addEventListener('click', exportarParaCSV);

// ----- As linhas abaixo são das funções. -----

// Função para mostrar ou ocultar a div que permite o usuário escrever o serviço desejado.
function opcaoOutro() {
    // Variável que obterá o índice do select escolhido pelo usuário.
    const indcSrvcEscolhido: number = srvcEscolhido.selectedIndex;

    // Variável que obterá a opção escolhida pelo usuário através do índice.
    const opEscolhida: HTMLOptionElement = srvcEscolhido.options[indcSrvcEscolhido];

    // Caso o usuário escolha a opção 'Outro', então a caixa de texto para que ela defina o que quer será gerada.
    if (opEscolhida.text === 'Outro') {
        // Exibindo a div que possui a caixa de texto.
        divOpDiferente.style.display = 'block';
    }
    else {
        // Escondendo a div que possui a caixa de texto.
        divOpDiferente.style.display = 'none';
    }
}

// Função para gerar a senha e exibi-la na página.
function gerarSenha(): void {
    // Chamando a função que removerá a tabela que exibe os serviços e senhas geradas previamente, caso exista.
    removerSevicos_Senhas();

    // Declaração da variável que receberá o valor da entrada com id 'qtdCaracts' da página 'index.html'.
    const qtdCaractsSenha = document.getElementById("qtdCaracts") as HTMLInputElement;

    // Definindo como número o valor da quantidade de caracters da senha e armazenando na variável.
    const caractsSenha: number = parseInt(qtdCaractsSenha.value);

    // Declaração da variável que receberá as senhas.
    let senha_usuario: string = "";

    // Enquanto a quantidade de caracteres da senha for menor do que a quantidade definida pelo usuário.
    while(senha_usuario.length < caractsSenha) {
        // Variável que serve para determinar de forma automática/aleatória como a senha será gerada. Ela recebe um nº aleatória de zero até três.
        let optGrSenh: number = Math.floor(Math.random()*4);

        // Se a variável para opção de geração de senha for zero.
        if(optGrSenh == 0) {
            // A variável recebe um número aleatório (de 0 até 9).
            senha_usuario = senha_usuario.concat(Math.floor(Math.random()*10).toString());
        }
        // Se a variável para opção de geração de senha for um.
        else if(optGrSenh == 1) {
            // A variável recebe uma letra maiúscula aleatória da variável 'letrasMaiu'.
            senha_usuario = senha_usuario.concat(letrasMaiu.charAt(Math.floor(Math.random() * letrasMaiu.length)));
        }
        // Se a variável para opção de geração de senha for dois.
        else if(optGrSenh == 2) {
            // A variável recebe uma letra minúscula aleatória da variável 'letrasMinu'.
            senha_usuario = senha_usuario.concat(letrasMinu.charAt(Math.floor(Math.random() * letrasMinu.length)));
        }
        // Se a variável para opção de geração de senha for diferente dos outros três números citados.
        else {
            // A variável recebe um caractere especial aleatória da variável 'caracteresEspc'.
            senha_usuario = senha_usuario.concat(caracteresEspc.charAt(Math.floor(Math.random() * caracteresEspc.length)));
        }
    }

    // Inserindo a senha gerada no array de senhas geradas.
    senhasGeradas.push(senha_usuario);

    // Caso o usuário escolha a opção 'Outro'.
    if(opUsuario.value !== "") {
        // Inserindo o serviço escrito pelo usuário no array de opções.
        opUsuarioEscreveu.push(opUsuario.value);

        // Apagando o serviço que o usuário escreveu na caixa de texto.
        opUsuario.value = "";
    }
    else {
        // Inserindo o serviço escolhido pelo usuário.
        opUsuarioEscreveu.push(srvcEscolhido.options[srvcEscolhido.selectedIndex].text);
    }

    // Determinando o conteúdo da div.
    senhaGerada.textContent = senha_usuario;

    // Exibindo o botão para listar as senhas geradas.
    listarSenhas.style.display = 'block';
}

// Função para exibir os serviços com as senhas geradas.
function exibirSenhasGeradas(): void {
    // Apagando o conteúdo da div com a id 'senhaGrd' para não poluir a tela com informação.
    senhaGerada.textContent = "";

    // Chamando a função que removerá a tabela que exibe os serviços e senhas geradas previamente, caso exista.
    removerSevicos_Senhas();

    // Criando a tabela e armazenando na variável.
    const tabela = document.createElement('table');
    tabela.id = 'minhaTabela';

    // Adicionando uma borda preta ao redor da tabela.
    tabela.style.border = '1px solid black';

    const linhaCabecalho = tabela.insertRow();

    // Criando os cabeçalhos da tabela.
    const servicosHeader = document.createElement('th');
    servicosHeader.innerText = 'Serviços';
    linhaCabecalho.appendChild(servicosHeader);

    const senhasHeader = document.createElement('th');
    senhasHeader.innerText = 'Senhas';
    linhaCabecalho.appendChild(senhasHeader);

    const copiarSenhasHeader = document.createElement('th');
    linhaCabecalho.appendChild(copiarSenhasHeader);

    // Adicionando uma borda preta ao redor da célula com o cabeçalho para serviços.
    servicosHeader.style.border = '1px solid black';

    // Adicionando uma borda preta ao redor da célula com o cabeçalho para senhas.
    senhasHeader.style.border = '1px solid black';

    // Adicionando uma borda preta ao redor da célula com os botões para copiar as senhas.
    copiarSenhasHeader.style.border = '1px solid black';

    // Adicionando um fundo cinza na célula da coluna com os botões para copiar as senhas.
    copiarSenhasHeader.style.backgroundColor = 'gray';

    // Adicionando os dados na tabela.
    for (let i = 0; i < senhasGeradas.length; i++) {
        const linhaTabela = tabela.insertRow();

        const servicosCelula = linhaTabela.insertCell();
        servicosCelula.innerText = opUsuarioEscreveu[i];

        // Adicionando uma borda preta ao redor da célula com o nome do tipo de serviço.
        servicosCelula.style.border = '1px solid black';

        const senhasCelula = linhaTabela.insertCell();
        senhasCelula.innerText = senhasGeradas[i];

        // Adicionando uma borda preta ao redor da célula com a senha do serviço.
        senhasCelula.style.border = '1px solid black';

        const cprSenhasCelula = linhaTabela.insertCell();
        const btCopiarSenha = document.createElement('button');
        btCopiarSenha.textContent = 'Copiar Senha';

        // Quando o botão for pressionado, o evento 'click' acionará a função seta que enviará a informação para ser copiada.
        btCopiarSenha.addEventListener('click', () => {
            // Função para copiar o conteúdo da segunda coluna
            copiarSenha(senhasGeradas[i]);
        });

        cprSenhasCelula.appendChild(btCopiarSenha);

        // Adicionando uma borda preta ao redor da célula com o botão para copiar a senha.
        cprSenhasCelula.style.border = '1px solid black';
    }

    // Adiciona a tabela na div com id 'sevicos_Senhas'.
    servicos_e_senhas.appendChild(tabela);

    // Exibindo o botão de exportação do conteúdo da tabela abaixo da mesma.
    btExpCSV.style.display = 'inline';
}

// Função que remove todo o conteúdo de uma div.
function removerSevicos_Senhas() {
    // Declaração da variável que receberá a div com a id 'sevicos_Senhas' da página 'index.html'.
    const divSevicos_Senhas = document.getElementById('sevicos_Senhas') as HTMLDivElement;
  
    // Verifica se a div existe
    if (divSevicos_Senhas) {
        // Enquanto a div tiver conteúdo, o laço de repetição continua.
        while (divSevicos_Senhas.firstChild) {
            // Remove o primeiro conteúdo da div a cada iteração.
            divSevicos_Senhas.removeChild(divSevicos_Senhas.firstChild);
        }
    }
    else {
        console.error('Div com ID "sevicos_Senhas" não encontrada.');
    }

    // Ocultando o botão de exportação do conteúdo da tabela para arquivo CSV.
    btExpCSV.style.display = 'none';
  }

// Função que copia a senha.
function copiarSenha(senha_recebida: string) {
    // Utilização da API Clipboard para copiar o texto.
    navigator.clipboard.writeText(senha_recebida).then(() => {
        // Resposta para cópia bem sucedida.
        respSenhaCopiada.textContent = "A senha foi copiada para a área de transferência!";

        // Remove a resposta, depois de 5 segundos (com o uso da função seta).
        setTimeout(() => {
            respSenhaCopiada.textContent = '';
        }, 2500);
    }).catch(err => {
        // Resposta para cópia mal sucedida.
        respSenhaCopiada.textContent = "Erro ao copiar a senha para a área de transferência!";
        
        // Remove a resposta, depois de 5 segundos (com o uso da função seta).
        setTimeout(() => {
            respSenhaCopiada.textContent = '';
        }, 2500);
    });
}

// Função para gerar o arquivo CSV (comma-separated-values / valores separados por vírgulas) utilizando as variáveis que possuem os serviços e senhas.
function exportarParaCSV() {
    console.log(opUsuarioEscreveu);
    console.log(senhasGeradas);

    // Variável que representa as linhas do arquivo CSV.
    const csvLinhas: string[] = [];

    // Adiciona os cabeçalhos (Serviço e Senha)
    csvLinhas.push('Serviços,Senhas');

    // Laço de repetição for que percorre os arrays e adiciona as informações nas variáveis.
    for (let i = 0; i < Math.max(opUsuarioEscreveu.length, senhasGeradas.length); i++) {
        const servico = opUsuarioEscreveu[i];
        const senha = senhasGeradas[i];
        csvLinhas.push(`${servico},${senha}`); // Adicionando o serviço e a senha recebida.
    }

    // Cria um Blob (Binary large object) a partir das linhas CSV.
    // O método join é usado para unir as linhas do array csvLinhas em uma única string, com cada linha separada por uma nova linha.
    const blob = new Blob([csvLinhas.join('\n')], { type: 'text/csv' });

    // A partir desse Blob, uma URL é gerada para permitir que o usuário baixe o arquivo quando clicar no botão.
    const url = window.URL.createObjectURL(blob);

    // Cria um link para download
    const a = document.createElement('a');
    a.setAttribute('href', url); // Definindo a localização do arquivo (a URL do Blob).
    a.setAttribute('download', "servicos_senhas.csv"); // Definindo que o link deve ser tratado como um download de arquivo, em vez de navegar para a URL especificada.
    document.body.appendChild(a); // Esse método é usado para adicionar um link (<a>) temporário ao document.body antes de simular um clique para baixar o arquivo CSV.
    a.click(); // Simulando o clique do link.
    document.body.removeChild(a); // Após o clique, o link é removido.
    window.URL.revokeObjectURL(url); // Liberando a memória ocupada pelo URL do Blob, já que não há mais necessidade desse URL, após o download ter sido iniciado.
}