import random

# Define card suits and ranks
suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

# Create a deck of cards
deck = [(suit, rank) for suit in suits for rank in ranks]

# Function to shuffle the deck
def shuffle_deck(deck):
    random.shuffle(deck)
    return deck

# Function to deal a hand of cards
def deal_hand(deck, num_cards):
    hand = []
    for _ in range(num_cards):
        hand.append(deck.pop())
    return hand

# Function to determine the value of a hand
def hand_value(hand):
    value = 0
    num_aces = 0
    for suit, rank in hand:
        if rank == "Ace":
            num_aces += 1
            value += 11
        elif rank in ["Jack", "Queen", "King"]:
            value += 10
        else:
            value += int(rank)
    while value > 21 and num_aces > 0:
        value -= 10
        num_aces -= 1
    return value

# Function to play a round of poker
def play_poker(deck):
    # Shuffle the deck
    deck = shuffle_deck(deck)

    # Deal two cards to the player
    player_hand = deal_hand(deck, 2)

    # Deal two cards to the dealer
    dealer_hand = deal_hand(deck, 2)

    # Print the player's hand
    print("Your hand:", player_hand)

    # Player's turn
    while True:
        # Print the player's hand value
        print("Your hand value:", hand_value(player_hand))

        # Ask the player if they want to hit or stand
        choice = input("Hit or stand? (h/s): ")

        # If the player chooses to hit
        if choice == "h":
            # Deal a card to the player
            player_hand.append(deck.pop())
            # Check if the player has busted
            if hand_value(player_hand) > 21:
                print("You busted! Dealer wins.")
                return
        # If the player chooses to stand
        elif choice == "s":
            break
        else:
            print("Invalid choice. Please enter 'h' or 's'.")

    # Dealer's turn
    print("Dealer's hand:", dealer_hand)
    while hand_value(dealer_hand) < 17:
        print("Dealer hits.")
        dealer_hand.append(deck.pop())
        print("Dealer's hand:", dealer_hand)
        if hand_value(dealer_hand) > 21:
            print("Dealer busted! You win.")
            return

    # Determine the winner
    player_value = hand_value(player_hand)
    dealer_value = hand_value(dealer_hand)
    if player_value > 21:
        print("You busted! Dealer wins.")
    elif dealer_value > 21:
        print("Dealer busted! You win.")
    elif player_value > dealer_value:
        print("You win!")
    elif dealer_value > player_value:
        print("Dealer wins.")
    else:
        print("Tie!.")

# Start the game
play_poker(deck)
