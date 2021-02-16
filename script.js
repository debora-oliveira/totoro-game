const totoro = document.querySelector('.totoro');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 146){
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    totoro.style.bottom = position + 'px';
                }
            },20);
        }else{
            position += 20;
            totoro.style.bottom = position + 'px';
        }
    },20);
}

function createPurmoonTotoro(){
    const purmoonTotoro = document.createElement('div');
    let purmoonTotoroPosition = 1200;
    let randomTime = Math.random() * 9000;
    if(isGameOver) return;
    purmoonTotoro.classList.add('purmoonTotoro');
    background.appendChild(purmoonTotoro);
    purmoonTotoro.style.left = purmoonTotoroPosition + 'px';

    let leftTimer = setInterval(() => {
        if(purmoonTotoroPosition < -60){
            clearInterval(leftTimer);
            background.removeChild(purmoonTotoro);
        }else if(purmoonTotoroPosition > 0 && purmoonTotoroPosition < 60 && position < 60){
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }else{
            purmoonTotoroPosition -= 10;
            purmoonTotoro.style.left = purmoonTotoroPosition + 'px';
        }
    }, 20);
    setTimeout(createPurmoonTotoro, randomTime);
}

createPurmoonTotoro();
document.addEventListener('keyup', handleKeyUp);


