let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let cobra = [];
let score = 0;
cobra[0] = {
    x: 8 * box,
    y: 8 * box
}
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direcao = "right";
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); 
}
// função de criação da cobrinha , com origem no meio do tabuleiro
function criarCobrinha(){
    for(i=0; i< cobra.length; i++){
        context.fillStyle = "green";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

function droparComida(){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box); 
}
// pega os cliques que a pessoa da no teclado e passa para função atualizar
document.addEventListener('keydown', atualizar);


// função para atualizar a nova direção da cobra de acordo com o que usuario digita
function atualizar(event){
    if(event.keyCode == 37 && direcao != "right") direcao = "left";
    if(event.keyCode == 38 && direcao != "down") direcao = "up";
    if(event.keyCode == 39 && direcao != "left") direcao = "right";
    if(event.keyCode == 40 && direcao != "up") direcao = "down";
}


function iniciarJogo(){
    
    if(cobra[0].x > 15 * box && direcao == "right") cobra[0].x = 0;
    if(cobra[0].x < 0 && direcao == "left") cobra[0].x = 16 * box;
    if(cobra[0].y > 15 * box && direcao == "down") cobra[0].y = 0;
    if(cobra[0].y < 0 && direcao == "up") cobra[0].y = 16 * box;

    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            alert("Game Over \nSeu score foi de: " + score);
        }
    }
    
    criarBG();
    criarCobrinha();
    droparComida();


    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    // codições para saber para onde ela vai andar;
    if(direcao == "right") cobraX += box;
    if(direcao == "left") cobraX -= box;
    if(direcao == "up") cobraY -= box;
    if(direcao == "down") cobraY += box;

    if(cobraX != comida.x || cobraY != comida.y){
        cobra.pop();
    }
    else{
        score ++;
        document.getElementById("score").innerHTML = score;
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    
    let novaCabeca = {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(novaCabeca);

}

let jogo = setInterval(iniciarJogo,100);