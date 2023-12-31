let palavras = ['VALDEZ', 'BERGAMOTA', 'ASH', 'TITANIC', 'SURREAL', 'TELESCOPIO'];
let qtnErros = 0;
let acertos = 0;
let tentativas = "";
let palavraSecreta = palavras[Math.floor(Math.random() * 6)];
let mudarDescricao = document.getElementById("descricao");



const canvas = document.getElementById("forca");
const ctx = canvas.getContext("2d");

desenharPoste();
desenharBarraSuperior();
desenharCorda();
desenharRiscos();
desenharBase();

window.onkeypress = teclaPressionada;

// colocar a letra na palavra se for a certa, se não for não é inclusa na palavra mas sim como tentativa e desenha uma parte do boneco
function teclaPressionada() {
	if (!tentativas.includes(event.key) && palavraSecreta.includes((event.key).toUpperCase())) {
		addTentativa();
		for (let i = 0; i < palavraSecreta.length; i++) {
			if (palavraSecreta[i] == (event.key).toUpperCase()) {
				ctx.font = "35px Arial";
				ctx.fillText((event.key).toUpperCase(), 20 + (35 * i), 200);
				acertos++;
			}
		}
	} else {
		addTentativa();
		qtnErros++;
		desenharBoneco(qtnErros);
	}
	verificaJogo();
}

//Inclui a letra errada como tentativa
function addTentativa() {
	if (!tentativas.includes(event.key)){
		tentativas = tentativas + event.key;
		ctx.font = "25px Arial";
		ctx.fillText("Tentativas: " + tentativas.toUpperCase(), 25, 285);
	}
}

//Verifica se o boneco esta inteiro ou a palavra esta completa
function verificaJogo() {
	if (qtnErros >=6) {
		ctx.font = "20px Arial";
		ctx.fillText("Fim do Jogo! a palavra era: " + palavraSecreta, 200, 100);
		window.onkeypress = null;
		return;
	}
	if (acertos == palavraSecreta.length ) {
		ctx.font = "20px Arial";
	    window.onkeypress = null;
		ctx.fillText("Parabéns, você acertou! Aperte K para reiniciar o jogo", 200, 100);
		return;
	}
}

function desenharPoste() {
	ctx.moveTo(10, 10);
	ctx.lineTo(10, 100);
	ctx.stroke();
}

function desenharBarraSuperior() {
	ctx.moveTo(10, 10);
	ctx.lineTo(60, 10);
	ctx.stroke();
}

function desenharCorda() {
	ctx.moveTo(60, 10);
	ctx.lineTo(60, 30);
	ctx.stroke();
}

function desenharBase(){
	ctx.moveTo(10, 100);
	ctx.lineTo(40, 100);
	ctx.stroke();
}

function desenharRiscos() {
	for (var i = 0; i < palavraSecreta.length; i++) {
		ctx.moveTo(20 + (35 * i), 200);
	    ctx.lineTo(50 + (35 * i), 200);
	    ctx.stroke();
	}
}

//Desenhar toda vez que erra a letra
function desenharBoneco(qtnErros) {
	switch (qtnErros) {
	case 1:
		desenharCabeca();
		break;
	case 2:
		desenharTronco();
		break;
    case 3:
        desenharBracoE();
        break;
    case 4:
        desenharBracoD();
        break;
    case 5:
        desenharPernaE();
        break;
    case 6:
    	desenharPernaD();
    	break;

	}
}

function desenharCabeca() {
	ctx.beginPath();
	ctx.arc(60, 40, 10, 0, 2 * Math.PI);
	ctx.stroke();
}

function desenharTronco() {
	ctx.moveTo(60, 50);
	ctx.lineTo(60, 80);
	ctx.stroke();
}

function desenharBracoE() {
	ctx.moveTo(60, 60);
	ctx.lineTo(50, 70);
	ctx.stroke();
}

function desenharBracoD() {
	ctx.moveTo(60, 60);
	ctx.lineTo(70, 70);
	ctx.stroke();
}

function desenharPernaE() {
	ctx.moveTo(60, 80);
	ctx.lineTo(70, 90);
	ctx.stroke();
}

function desenharPernaD() {
	ctx.moveTo(60, 80);
	ctx.lineTo(50, 90);
	ctx.stroke();
}

document.addEventListener('keydown', (e) => {
	if (e.key === "k" || e.key === "K" ){
		window.location.reload()
	}
});
	
//dicas de cada palavra
let dicas = {
	'VALDEZ': 'Sobrenome de um personagem da saga de livros de Heróis do Olimpo',
	'BERGAMOTA':'Nome sulista para a fruta tangerina',
	'ASH': 'Nome de um personagem de Banana Fish',
	'TELESCOPIO': 'Ferramenta utilizada para ver planetas',
	'SURREAL': 'Algo extraordinário',
	'TITANIC': 'Nome de um barco que carrega um histórico de grande tragédia para a humanidade'
}

//as dicas estão inclusas na palavra secreta
let dica = dicas[palavraSecreta];

//mudar a dica no html
let mudarDica = document.getElementById("dicas");
mudarDica.innerHTML = dica;