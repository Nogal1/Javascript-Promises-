const drawCardBtn = document.getElementById('draw-card-btn');
const cardContainer = document.getElementById('card-area');
let deckId = null;

// Function to get a new deck
function getDeck() {
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
        });
}

// Function to draw a card and add it to the container
function drawCard() {
    if (!deckId) return;

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            const card = data.cards[0];
            if (card) {
                const img = document.createElement('img');
                img.src = card.image;
                img.classList.add('card');

                // Random rotation between -30 and 30 degrees
                const randomRotation = Math.floor(Math.random() * 60) - 30;

                // Random positions within a small range
                const randomX = Math.floor(Math.random() * 20) - 10;
                const randomY = Math.floor(Math.random() * 20) - 10;

                // Apply transformations to simulate a messy pile
                img.style.transform = `rotate(${randomRotation}deg) translate(${randomX}px, ${randomY}px)`;

                cardContainer.appendChild(img);

                if (data.remaining === 0) {
                    drawCardBtn.disabled = true;
                    drawCardBtn.textContent = "No more cards!";
                }
            }
        })
        .catch(error => {
            console.error('Error drawing card:', error);
        });
}

drawCardBtn.addEventListener('click', drawCard);
getDeck();


