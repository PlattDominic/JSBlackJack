/*
- Dominic Martinez
- Project: JS Black Jack
- Description: Black Jack game written in JS
- Due Date: 5/10/2023
*/

// Will contain the dealer and player card count H4 HTML elements
let dealerCountDisplay = document.getElementById('dealer-count');
let playerCountDisplay = document.getElementById('player-count');
// Will contain card count for dealer and player 
let dealerCount = 0;
let playerCount = 0;

// Will contain DIV that hold dealer and player cards
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

// Both arrays will contain the cards(filename of card image) of both dealer and player
let dealerCards = [];
let playerCards = [];

// Player and dealer index will represent the current index of dealerCards and playerCards arrays
let playerIndex = 2;
let dealerIndex = 2;

// Will run when player clicks on new game function and will initialize the main game
let newGame = () => {
    // Reset all main game variables back to their default values
    dealerCards = [];
    playerCards = [];
    playerIndex = 2;
    dealerIndex = 2;
    playerCount = 0;
    dealerCount = 0;

    // Add the starter cards for dealer and player. DealerCards first value will be null for now
    dealerCards.push(null);
    dealerCards.push(randNumInRange(0,12));
    playerCards.push(randNumInRange(0,12));
    playerCards.push(randNumInRange(0,12));

    // Reset and set the dealer and player cards Div to show the starter cards. For dealer cards show back card for first card
    dealerCardsContainer.innerHTML = `<img src="img/backcard.jpg"><img src="img/${dealerCards[1]}.png">`;
    playerCardsContainer.innerHTML = `<img src="img/${playerCards[0]}.png"><img src="img/${playerCards[1]}.png">`;

    // Add value of second card in dealerCards to dealerCount and display that count
    dealerCount = cardValues[dealerCards[1]];
    dealerCountDisplay.innerText = dealerCount;

    // if (cardValues[playerCards[0]] == 11 && cardValues[playerCards[1]] == 11)
    //     playerCount = 1 + cardValues[playerCards[1]];
    // else
    //     playerCount = cardValues[playerCards[0]] + cardValues[playerCards[1]];

    // Get current count of both cards in playerCards and display it
    playerCount = countCards(playerCards);
    playerCountDisplay.innerText = playerCount;

    // If playerCount is equal to 21 that means player has got a blackjack and won so end the game
    if (playerCount == 21) {
        addText('Player got Blackjack!!!', playerCardsContainer);
        playerCountDisplay.innerText = 21;
        return;
    };

    // Disable new game button and enable others
    newGameButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
}
// Function will run when dealer and player have both took their turns
// blackJack - should be only true when dealer gets a blackjack
let endGame = (blackjack) => {
    // If dealer gets a blackjack
    if (blackjack) {
        addText('Dealer got Blackjack!!!', dealerCardsContainer);
    } else if (dealerCount > 21 && playerCount <= 21) { // If dealer has busted
        addText('Dealer busted!!', dealerCardsContainer);
        addText('Player Wins', playerCardsContainer);
    } else if (playerCount > 21 && dealerCount <= 21) { // If player has busted
        addText('Player busted!!', playerCardsContainer);
        addText('Dealer Wins', dealerCardsContainer);
    } else if (dealerCount > playerCount) { // If dealer has more than player
        addText('Dealer Wins!!', dealerCardsContainer);
    } else if (dealerCount < playerCount) { // player has more than dealer
        addText('Player Wins!!', playerCardsContainer);
    } else if (dealerCount == playerCount) { // If dealer and player have a push
        addText('Push!', dealerCardsContainer);
        addText('Push!', playerCardsContainer);
    }

    // Enable new game button and disable others
    newGameButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
}

// Will run when player clicks on hit button and will allow player to hit until they bust
let hit = () => {
    // push a random number(0, 12) into playerCards
    playerCards.push(randNumInRange(0, 12));

    // Call addImage and pass the number that was just added into playerCards using playerIndex(current index of playerCards) 
    addImage(playerCards[playerIndex], playerCardsContainer);
    
    // Get current count of all cards in playerCards and display it
    playerCount = countCards(playerCards);
    playerCountDisplay.innerText = playerCount;

    // If playerCount is more than 21, that means player has bust, so end the game
    // Also show flip the first dealer card
    if (playerCount > 21) {
        hitButton.disabled = true;
        standButton.disabled = true;
        setTimeout(flipDealerFirstCard(), 1000);
        endGame();
    } 
    
    // Increment playerIndex to update current playerCards index
    playerIndex++;
}

let flipDealerFirstCard = () => {
    // Get a random number from 0, 12(represents name of card image file) 
    dealerCards[0] = randNumInRange(0,12);
    // Use that random number to display correct card to player
    dealerCardsContainer.querySelector('img').src = `img/${dealerCards[0]}.png`;
    
    dealerCountDisplay.innerText = countCards(dealerCards)
}

// Stand function will run when player clicks on stand button
// Will allow dealer to hit until they reach 17
let stand = () => {
    // Disable both stand and hit button so player can't break code
    standButton.disabled = true;
    hitButton.disabled = true;

    // Check if dealer has it's first card 'flipped' yet
    if (dealerCards[0] == null) {
        // If so, call flipDealerFirstCard function to add and display the first card
        flipDealerFirstCard();

        // Get value of first card by using first card of dealerCards as index for cardValues
        let currentValue = cardValues[dealerCards[0]];  

        // Check if dealer got a blackjack by checking if current card value and previous card value is equal to 21
        if (currentValue + dealerCount == 21) {
            // If so change the dealer count to 21
            dealerCountDisplay.innerText = 21;
            // Call endGame with blackjack set to true
            endGame(true)
            return;
        }
    } else {
        // If dealer has already flipped it first card than push a random number(0, 12) into dealerCards
        dealerCards.push(randNumInRange(0, 12));
        // Call addImage and pass the number that was just added into dealerCards using dealerIndex(current index of dealerCards)
        addImage(dealerCards[dealerIndex], dealerCardsContainer);
        // Increment dealerIndex to update current index of dealerCards next time dealer hits
        dealerIndex++;
    }
    
    // Get current count of dealer cards and display it
    dealerCount = countCards(dealerCards, dealerCountDisplay)
    dealerCountDisplay.innerText = dealerCount;

    // If dealer has a count of less than 17 call stand function so they can hit again
    // Else, end the game
    if (dealerCount < 17) {
        setTimeout(stand, 750);
    }
    else {
        endGame();
    }
}

// Will return the sum of all the values in a card array
// cards - the card to add sums from
let countCards = (cards) => {
    // Will be variable that contains final sum
    let count = 0;
    // Will contain all aces in cards
    let aces = []

    // Iterate through whole cards array
    for (let i = 0; i < cards.length; i++) {
        // Set val using current card item as an index to get its card value
        let val = cardValues[cards[i]];
        // If val is an ace than add that to aces array
        if (val == 11)
            aces.push(val)
        else
            // If not, add val to count
            count += val
    }
    // Iterate through all aces and if adding an ace(11) to sum will make it 21
    // Then, only add one to count
    aces.forEach(a => {
        if (count + a > 21)
            count += 1;
        else 
            count += 11;
    })
    return count;
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