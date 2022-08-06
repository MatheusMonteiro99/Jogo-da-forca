let palavras = [
    {nome: "IRLANDA", categoria:"LUGARES"},
    {nome: "EQUADOR", categoria:"LUGARES"},
    {nome: "BRASIL", categoria:"LUGARES"},
    {nome: "CHINA", categoria:"LUGARES"},
    {nome: "ALEMANHA", categoria:"LUGARES"},
    {nome: "AUSTRIA", categoria:"LUGARES"},
    {nome: "RUSSIA", categoria:"LUGARES"},
    {nome: "ARGENTINA", categoria:"LUGARES"},
    {nome: "VENEZUELA", categoria:"LUGARES"},
    {nome: "URUGUAI", categoria:"LUGARES"},
    {nome: "MAÇA", categoria:"ALIMENTOS"},
    {nome: "PERA", categoria:"ALIMENTOS"},
    {nome: "MELANCIA", categoria:"ALIMENTOS"},
    {nome: "MANGA", categoria:"ALIMENTOS"},
    {nome: "UVA", categoria:"ALIMENTOS"},
    {nome: "OVO", categoria:"ALIMENTOS"},
    {nome: "CARNE", categoria:"ALIMENTOS"},
    {nome: "FRANGO", categoria:"ALIMENTOS"},
    {nome: "BANANA", categoria:"ALIMENTOS"},
    {nome: "SALADA", categoria:"ALIMENTOS"},
    {nome: "ARANHA", categoria:"ANIMAIS"},
    {nome: "TIGRE", categoria:"ANIMAIS"},
    {nome: "GATO", categoria:"ANIMAIS"},
    {nome: "CACHORRO", categoria:"ANIMAIS"},
    {nome: "MACACO", categoria:"ANIMAIS"},
    {nome: "MORCEGO", categoria:"ANIMAIS"},
    {nome: "ELEFANTE", categoria:"ANIMAIS"},
    {nome: "GIRAFA", categoria:"ANIMAIS"},
    {nome: "PEIXE", categoria:"ANIMAIS"},
    {nome: "GAFANHOTO", categoria:"ANIMAIS"},
];

const indexPalavra = parseInt(Math.random() * palavras.length)

palavraSecretaSorteada = palavras[indexPalavra].nome;
palavraSecretaCategoria = palavras[indexPalavra].categoria;

let chances = 6;
let acertos = 0;

let imagem = 0;

let posicao;

// CRIA OS ELEMENTOS SPAN NA DIV "PALAVRA"
for (posicao = 0; posicao < palavraSecretaSorteada.length; posicao++) {
    let span = document.createElement("span");
    span.setAttribute('id', posicao);

    let div = document.getElementById("palavra");
    div.appendChild(span);
}

// CRIA OS BOTÕES COM AS LETRAS DO ALFABETO 
let alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letras = alfabeto.split("");

for (posicao = 0; posicao < letras.length; posicao++) {
    let botao = document.createElement("button");
    let letra = document.createTextNode(letras[posicao]);
    
    botao.appendChild(letra);
    botao.setAttribute('onclick', 'escolheLetra(\''+letras[posicao]+'\')');
    botao.setAttribute('id', letras[posicao]);

    let div = document.getElementById("letras");
    div.appendChild(botao);
    
}

    let nomeTema = document.createTextNode(palavraSecretaCategoria);
    let elementoTema = document.getElementById("tema");
    elementoTema.style.color = "#D21515";
    elementoTema.innerHTML = `TEMA: ${palavraSecretaCategoria}`; 
    
    let btn = document.getElementById("input-btn")
    let btnLetras = document.getElementById("letras")

function desabilitarBotoes() {
    btn.disabled = true
    btnLetras = document.querySelectorAll("button")
    let arrayBtnLetras = Array.prototype.slice.call(btnLetras)
    Array.isArray(arrayBtnLetras)
    arrayBtnLetras.shift()
    for(let i in arrayBtnLetras){
        arrayBtnLetras[i].disabled = true
    }
    
}

function venceu() {
    let mensagem = document.createElement("h2");
    let t1 = document.createTextNode("Você venceu!");
    mensagem.appendChild(t1);
    mensagem.style.fontSize = "36px";
    mensagem.style.fontWeight = "bold";
    mensagem.style.color = "#00A41B";

    let botao = document.createElement("button");
    let t2 = document.createTextNode("jogar novamente");
    
    botao.appendChild(t2);
    botao.setAttribute('class', 'novo-bt');
    botao.setAttribute('onclick', 'window.location.reload()');

    let div = document.getElementById("novo");
    div.appendChild(mensagem);
    div.appendChild(botao);

}

function perdeu() {
    let mensagem = document.createElement("h2");
    let t1 = document.createTextNode("Você perdeu!");
    mensagem.appendChild(t1);

    mensagem.style.fontSize = "36px";
    mensagem.style.fontWeight = "bold";
    mensagem.style.color = "#E31818";

    let botao = document.createElement("button");
    let t2 = document.createTextNode("jogar novamente");

    botao.appendChild(t2);
    botao.setAttribute('class', 'novo-bt');
    botao.setAttribute('onclick', 'window.location.reload()');

    let div = document.getElementById("novo");
    div.appendChild(mensagem);
    div.appendChild(botao);
}

function escolheLetra(letra) {

    let acertou = false;

    for (posicao = 0; posicao < palavraSecretaSorteada.length; posicao++) {
        if (letra === palavraSecretaSorteada[posicao]) {
            let span = document.getElementById(posicao);
            let l = document.createTextNode(letra);

            span.appendChild(l);
            
            let botao = document.getElementById(letra);
            botao.setAttribute('class', 'certa');
            botao.removeAttribute('onclick');

            acertos++;
            acertou = true;
            
        }
    }
    
    if (acertou === false) {
        imagem++;
        document.getElementById("forca").src = "images/forca-"+imagem+".png";

        var botao = document.getElementById(letra);
        botao.setAttribute('class', 'errada');
        botao.removeAttribute('onclick');

        chances--;
    }

    if (chances === 0) {
        perdeu();
        desabilitarBotoes();
    }

    if (acertos === palavraSecretaSorteada.length) {
        venceu();
        desabilitarBotoes();
    }
}

// BOTÃO FINALIZAR 
btn.addEventListener("click", function(e){
    let acertou = false
    
    e.preventDefault()
    let input = document.getElementById("input-style")
    let palavraDigitada = input.value
    if(palavraDigitada.toUpperCase() == palavraSecretaSorteada) {
        venceu();
        input.style.borderColor = "#00A41B";
        input.style.color = "#00A41B";

        acertou = true

        let arrayPalavra = palavraSecretaSorteada.split('')
        
        for(let n = 0; n < palavraSecretaSorteada.length; n++){
            div = document.getElementById(n);
            div.innerHTML = " "
            let palavraNode = document.createTextNode(arrayPalavra[n])
            div.style.color = "#00A41B"
            div.appendChild(palavraNode)
        }

        desabilitarBotoes()

    } else if(acertou == false) {
        perdeu();
        input.style.borderColor = "#E31818";
        input.style.color = "#E31818";

        desabilitarBotoes()

    }
})