let numeroMaximo = 10;
let historicoNumero = [];
let numeroSecreto = gerarNumero();
let tentativas = 1;
exibirMensagemInicial();

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = `Escolha um número entre 1 e ${numeroMaximo}`;

function exibirTextoNaTela(tag, texto) {
	let campo = document.querySelector(tag);
	campo.innerHTML = texto;
	responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
	exibirTextoNaTela('h1', 'Jogo Número Secreto');
//	let textoParagrafo = `Escolha um número entre 1 e ${numeroMaximo}`;
	exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}

function verificarChute() {
	let chute = document.querySelector('input').value;
	if (chute == numeroSecreto){
		exibirTextoNaTela('h1', 'Parabens! Você acertou!!!');
		let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
		let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
		exibirTextoNaTela('p', mensagemTentativas);
		document.getElementById('reiniciar').removeAttribute('disabled');
	} else{
		if (chute > numeroSecreto){
			exibirTextoNaTela('h1', 'Você errou!!');
			exibirTextoNaTela('p', 'O número secreto é menor!');
		} else {
			exibirTextoNaTela('h1', 'Você errou!!');
			exibirTextoNaTela('p', 'O número secreto é maior!');
		}
		tentativas++;
		limparCampo();
	}
}

function gerarNumero() {
	let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
	let qtdElementosLista = historicoNumero.length;
	if (qtdElementosLista == numeroMaximo) {
		historicoNumero = [];
	}
	if (historicoNumero.includes(numeroEscolhido)) {
		return gerarNumero();
	} else {
		historicoNumero.push(numeroEscolhido);
		return numeroEscolhido;
	}
}

function limparCampo(){
	chute = document.querySelector('input');
	chute.value = '';
}
function reiniciar(){
	numeroSecreto = gerarNumero();
	tentativas = 1;
	limparCampo();
	exibirMensagemInicial();
	document.getElementById('reiniciar').setAttribute('disabled',true);
	
}