/*
- Dominic Martinez
- Project: JS Black Jack
- Description: Black Jack game written in JS
- Due Date: 5/10/2023
*/



let dealerCountDisplay = document.getElementById('dealer-count');
let playerCountDisplay = document.getElementById('player-count');

let dealerCardsContainer = document.getElementById('dealer-cards');
let playerCardsContainer = document.getElementById('player-cards');

let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10];

let dealerCards = [];
let playerCards = [];

let currentIndex = 2;

let newGame = () => {
    dealerCards = [];
    playerCards = [];

    dealerCards.push(0);
    dealerCards.push(randNumInRange(2,14));
    playerCards.push(randNumInRange(2,14));
    playerCards.push(randNumInRange(2,14));

    
    dealerCardsContainer.innerHTML = `<img src="img/backcard.jpg"><img src="img/${dealerCards[1]}.png">`;
    playerCardsContainer.innerHTML = `<img src="img/${playerCards[0]}.png"><img src="img/${playerCards[1]}.png">`;

    dealerCountDisplay.innerText = cardValues[dealerCards[1]-2];
    
    if (cardValues[playerCards[0]-2] == 11 && cardValues[playerCards[1]-2] == 11)
        playerCountDisplay.innerText = 1 + cardValues[playerCards[1]-2];
    else
        playerCountDisplay.innerText = cardValues[playerCards[0]-2] + cardValues[playerCards[1]-2];

    console.log(dealerCardsContainer.querySelector('img').src.split(/(\\|\/)/g).pop().split('.')[0]);


}


let hit = () => {
    playerCards.push(randNumInRange(2,14));

    const img1 = document.createElement('img');
    img1.src = `img/${playerCards[currentIndex]}.png`;
    playerCardsContainer.appendChild(img1);
}


let randNumInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)