// Define card suits and ranks
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

// Create a deck of cards
const deck = suits.flatMap(suit => ranks.map(rank => [suit, rank]));

// Function to shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to deal a hand of cards
function dealHand(deck, numCards) {
  const hand = [];
  for (let i = 0; i < numCards; i++) {
    hand.push(deck.pop());
  }
  return hand;
}

// Function to determine the value of a hand
function handValue(hand) {
  let value = 0;
  let numAces = 0;
  for (const [, rank] of hand) {
    if (rank === "Ace") {
      numAces++;
      value += 11;
    } else if (["Jack", "Queen", "King"].includes(rank)) {
      value += 10;
    } else {
      value += parseInt(rank);
    }
  }
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  return value;
}

// Function to play a round of poker
function playPoker(deck) {
  // Shuffle the deck
  shuffleDeck(deck);

  // Deal two cards to the player
  const playerHand = dealHand(deck, 2);

  // Deal two cards to the dealer
  const dealerHand = dealHand(deck, 2);

  // Print the player's hand
  console.log("Your hand:", playerHand);

  // Player's turn
  while (true) {
    // Print the player's hand value
    console.log("Your hand value:", handValue(playerHand));

    // Ask the player if they want to hit or stand
    const choice = prompt("Hit or stand? (h/s): ");

    // If the player chooses to hit
    if (choice === "h") {
      // Deal a card to the player
      playerHand.push(deck.pop());
      // Check if the player has busted
      if (handValue(playerHand) > 21) {
        console.log("You busted! Dealer wins.");
        return;
      }
    } // If the player chooses to stand
    else if (choice === "s") {
      break;
    } else {
      console.log("Invalid choice. Please enter 'h' or 's'.");
    }
  }

  // Dealer's turn
  console.log("Dealer's hand:", dealerHand);
  while (handValue(dealerHand) < 17) {
    console.log("Dealer hits.");
    dealerHand.push(deck.pop());
    console.log("Dealer's hand:", dealerHand);
    if (handValue(dealerHand) > 21) {
      console.log("Dealer busted! You win.");
      return;
    }
  }

  // Determine the winner
  const playerValue = handValue(playerHand);
  const dealerValue = handValue(dealerHand);
  if (playerValue > 21) {
    console.log("You busted! Dealer wins.");
  } else if (dealerValue > 21) {
    console.log("Dealer busted! You win.");
  } else if (playerValue > dealerValue) {
    console.log("You win!");
  } else if (dealerValue > playerValue) {
    console.log("Dealer wins.");
  } else {
    console.log("Tie!.");
  }
}

// Start the game
playPoker(deck);
