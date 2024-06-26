var jogadorO = false;
var jogadorX = false;
var numX = 0;
var numO = 0;
var selecaoFeita = false;
var jogoAcabou = false;
var campo = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function limparCampo() {
    jogadorO = false;
    jogadorX = false;
    numX = 0;
    numO = 0;
    selecaoFeita = false; // Resetando a seleção
    jogoAcabou = false;
    
    for (let i = 0; i < campo.length; i++) {
        for (let j = 0; j < campo[i].length; j++) {
            document.getElementById('td' + i + j).innerHTML = ''; // Limpa o conteúdo das células
            campo[i][j] = ''; // Limpa o conteúdo do array de campo
        }
    }

    atualizarStatusJogador(); // Atualiza o status do jogador após limpar o campo
}

function verificar_vencedor() {
    if (jogoAcabou) return;
    
    for (let i = 0; i < campo.length; i++) {
        if (campo[i][0] === campo[i][1] && campo[i][1] === campo[i][2] && campo[i][0] !== '') {
            alert("Vencedor na linha: " + (i + 1) + " do tipo " + campo[i][0]);
            jogoAcabou = true;
            return;
        }
        if (campo[0][i] === campo[1][i] && campo[1][i] === campo[2][i] && campo[0][i] !== '') {
            alert("Vencedor na Coluna: " + (i + 1) + " do tipo " + campo[0][i]);
            jogoAcabou = true;
            return;
        }
    }
    if (campo[0][0] === campo[1][1] && campo[1][1] === campo[2][2] && campo[0][0] !== '') {
        alert("Vencedor na diagonal do tipo: " + campo[1][1]);
        jogoAcabou = true;
        return;
    } else if (campo[0][2] === campo[1][1] && campo[1][1] === campo[2][0] && campo[0][2] !== '') {
        alert("Vencedor na diagonal do tipo: " + campo[1][1]);
        jogoAcabou = true;
        return;
    } else if (campo[0][0] && campo[0][1] && campo[0][2] && campo[1][0] && campo[1][1] && campo[1][2] && campo[2][0] && campo[2][1] && campo[2][2] !== '') {
        alert('Jogo Empatado!');
        jogoAcabou = true;
        return;
    }
}

function selecaoJogador() {
    var selecionar = document.getElementById('selecao').value;
    if (selecionar == "opcao1") {
        jogadorO = true;
    } else if (selecionar == "opcao2") {
        jogadorX = true;
    }
    selecaoFeita = true;
}

function marcar_jogo(linha, coluna) {
    if (!selecaoFeita || jogoAcabou) {
        selecaoJogador();
    }
    if (campo[linha][coluna] !== '') return; // Se a célula já está preenchida, não faça nada
    if (numX == numO && jogadorX) {
        document.getElementById('td' + linha + coluna).innerHTML = 'X';
        numX++;
        campo[linha][coluna] = 'X';
        jogadorX = false;
        jogadorO = true;
    } else if (numX == numO && jogadorO) {
        document.getElementById('td' + linha + coluna).innerHTML = 'O';
        numO++;
        campo[linha][coluna] = 'O';
        jogadorO = false;
        jogadorX = true;
    }

    if (numX < numO && jogadorX) {
        document.getElementById('td' + linha + coluna).innerHTML = 'X';
        numX++;
        campo[linha][coluna] = 'X';
    } else if (numO < numX && jogadorO) {
        document.getElementById('td' + linha + coluna).innerHTML = 'O';
        numO++;
        campo[linha][coluna] = 'O';
    }

    verificar_vencedor();
    atualizarStatusJogador();
}

function atualizarStatusJogador() {
    var vezJogador = document.getElementById('vezJogador');
    if (jogadorX) {
        vezJogador.textContent = "Vez do Jogador O";
    } else if (jogadorO) {
        vezJogador.textContent = "Vez do Jogador X";
    } else {
        vezJogador.textContent = "-";
    }

    if(jogoAcabou){
        vezJogador.textContent = "Jogo finalizado"
    }
}
