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

// Get the new game, hit and stand button so they can be disabled and enabled later
let newGameButton = document.getElementById('newgame-btn');
let hitButton = document.getElementById('hit-btn');
let standButton = document.getElementById('stand-btn');

// Make sure both hit and stand button are disabled when page loads
hitButton.disabled = true;
standButton.disabled = true;

// Array represents the value of each card. Index of each element represents name of card image file
// e.g. first index 0 = 0.png
let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10];


let dealerCards = [];
let playerCards = [];

let playerIndex = 2;
let dealerIndex = 2;

let newGame = () => {
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

// Stand function will run when player clicks on stand button
// Will allow dealer to hit
let stand = () => {
    // Disable both stand and hit button so player can't break code
    standButton.disabled = true;
    hitButton.disabled = true;

    // Current value will contain the current value of the card that was generated
    let currentValue;

    // Check if dealer has it's first card 'flipped' yet
    if (dealerCards[0] == null) {
        // If so, get a random number from 0, 12(represents name of card image file)
        dealerCards[0] = randNumInRange(0,12);
        // Use that random number to display correct card to player
        dealerCardsContainer.querySelector('img').src = `img/${dealerCards[0]}.png`;

        // Get current value of card by using number generated as index for cardValues
        currentValue = cardValues[dealerCards[0]];  

        // Check if dealer got a blackjack by checking if current card value and previous card value is equal to 21
        if (currentValue + dealerCount == 21) {
            // If so change to dealer count to 21
            dealerCountDisplay.innerText = 21;
            // Call endGame with blackjack set to true
            endGame(true)
            return;
        }
    } else {
        // If dealer has already flipped it first card than push a random number(0, 12) into dealerCards
        dealerCards.push(randNumInRange(0, 12));
        // Call addImage and pass the number that was just generated into function using dealerIndex(current index of dealerCards)
        addImage(dealerCards[dealerIndex], dealerCardsContainer);
        // 
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

// Will return a random number with a min and max range
let randNumInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// Will add string to a specified HTML container
// str - the string to add
// container - the div to add string to
let addText = (str, container) => {
    const text = document.createElement('span');
    text.innerText = str;
    container.appendChild(text);
}
// Will add an image to a specified HTML container
// fileName - the file name of image to add
// container - the div to add image to
let addImage = (fileName, container) => {
    const img = document.createElement('img');
    img.src = `img/${fileName}.png`;
    container.appendChild(img);
}