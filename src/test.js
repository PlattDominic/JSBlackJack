/*
- Dominic Martinez
- Project: JS Black Jack
- Description: Black Jack game written in JS
- Due Date: 5/10/2023
*/

let dealerCountDisplay = document.getElementById('dealer-count');
let playerCountDisplay = document.getElementById('player-count');
let dealerCount = 0;
let playerCount = 0;

let dealerCardsContainer = document.getElementById('dealer-cards');
let playerCardsContainer = document.getElementById('player-cards');

let newGameButton = document.getElementById('newgame-btn');
let hitButton = document.getElementById('hit-btn');
let standButton = document.getElementById('stand-btn');

hitButton.disabled = true;
standButton.disabled = true;

let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10];

let dealerCards = [];
let playerCards = [];

let playerIndex = 2;
let dealerIndex = 2;

let newGame = () => {
    console.log(dealerCardsContainer.querySelector('img').src.split(/(\\|\/)/g).pop().split('.')[0]);
    dealerCards = [];
    playerCards = [];
    playerIndex = 2;
    dealerIndex = 2;
    playerCount = 0;
    dealerCount = 0;

    dealerCards.push(null);
    dealerCards.push(randNumInRange(0,12));
    playerCards.push(randNumInRange(0,12));
    playerCards.push(randNumInRange(0,12));

    dealerCardsContainer.innerHTML = `<img src="img/backcard.jpg"><img src="img/${dealerCards[1]}.png">`;
    playerCardsContainer.innerHTML = `<img src="img/${playerCards[0]}.png"><img src="img/${playerCards[1]}.png">`;

    dealerCount = cardValues[dealerCards[1]];
    dealerCountDisplay.innerText = dealerCount;

    if (cardValues[playerCards[0]] == 11 && cardValues[playerCards[1]] == 11)
        playerCount = 1 + cardValues[playerCards[1]];
    else
        playerCount = cardValues[playerCards[0]] + cardValues[playerCards[1]];

    if (playerCount == 21) {
        addText('Player got Blackjack!!!', playerCardsContainer);
        playerCountDisplay.innerText = 21;
        return;
    };

    playerCountDisplay.innerText = playerCount;

    newGameButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
}
let endGame = (blackjack) => {
    if (blackjack) {
        addText('Dealer got Blackjack!!!', dealerCardsContainer);
    } else if (dealerCount > 21 && playerCount > 21) {
        addText('Push. Double Bust!', dealerCardsContainer);
        addText('Push. Double Bust!', playerCardsContainer);
    } else if (dealerCount > 21 && playerCount <= 21) {
        addText('Dealer busted!!', dealerCardsContainer);
        addText('Player Wins', playerCardsContainer);
    } else if (playerCount > 21 && dealerCount <= 21) {
        addText('Player busted!!', playerCardsContainer);
        addText('Dealer Wins', dealerCardsContainer);
    } else if (dealerCount > playerCount) {
        addText('Dealer Wins!!', dealerCardsContainer);
    } else if (dealerCount < playerCount) {
        addText('Player Wins!!', playerCardsContainer);
    } else if (dealerCount == playerCount) {
        addText('Push!', dealerCardsContainer);
        addText('Push!', playerCardsContainer);
    }

    newGameButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
}


let hit = () => {
    playerCards.push(randNumInRange(0, 12));

    addImage(playerCards[playerIndex], playerCardsContainer);
    
    let currentValue = cardValues[playerCards[playerIndex]];

    if (currentValue == 11 && playerCount + currentValue > 21)
        playerCount += 1;
    else 
        playerCount += currentValue;
    
        playerCountDisplay.innerText = playerCount;

    if (playerCount > 21) {
        hitButton.disabled = true;
        standButton.disabled = true;
        setTimeout(stand, 500);
    } 
    
    playerIndex++;
}

let stand = () => {
    standButton.disabled = true;
    hitButton.disabled = true;
    let currentValue;

    if (dealerCards[0] == null) {
        dealerCards[0] = randNumInRange(0,12);
        dealerCardsContainer.querySelector('img').src = `img/${dealerCards[0]}.png`;

        currentValue = cardValues[dealerCards[0]];

        if (currentValue + dealerCount == 21) {
            dealerCountDisplay.innerText = 21;
            endGame(true)
            return;
        }
    } else {
        dealerCards.push(randNumInRange(0, 12));
        addImage(dealerCards[dealerIndex], dealerCardsContainer);
        currentValue = cardValues[dealerCards[dealerIndex]];
        dealerIndex++;
    }

    if (currentValue == 11 && dealerCount + currentValue > 21)
        dealerCount += 1;
    else 
        dealerCount += currentValue;
    
    dealerCountDisplay.innerText = dealerCount;
    
    if (dealerCount < 17) {
        setTimeout(stand, 750);
    }
    else {
        endGame();
    }
}


let randNumInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

let addText = (str, container) => {
    const text = document.createElement('span');
    text.innerText = str;
    container.appendChild(text);
}
let addImage = (fileName, container) => {
    const img = document.createElement('img');
    img.src = `img/${fileName}.png`;
    container.appendChild(img);
}