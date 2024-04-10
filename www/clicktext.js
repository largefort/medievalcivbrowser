document.addEventListener('DOMContentLoaded', function() {
    let goldCoins = 0;
    let clickValue = 1; // Base amount of gold coins earned per click
    let clickMultiplier = 1; // Tracks the overall multiplier for clicks

    // Update the display of gold coins
    function updateGoldDisplay() {
        const counter = document.getElementById('counter');
        counter.innerText = `Gold coins: ${goldCoins}`;
    }

    // Function to handle castle click
    function clickCastle() {
        const increment = clickValue * clickMultiplier; // Calculate gold earned per click
        goldCoins += increment; // Increment gold coins by the calculated amount
        updateGoldDisplay(); // Update the display
        createFloatingNumber(`+${increment}`, event.clientX, event.clientY);
    }

    // Function to create floating numbers
    function createFloatingNumber(text, x, y) {
        const floatNumber = document.createElement('div');
        floatNumber.textContent = text;
        floatNumber.style.position = 'absolute';
        floatNumber.style.left = `${x - 10}px`;
        floatNumber.style.top = `${y - 20}px`;
        floatNumber.style.color = 'gold';
        floatNumber.style.userSelect = 'none';
        floatNumber.style.pointerEvents = 'none';
        floatNumber.style.transition = 'opacity 2s ease, transform 2s ease';
        document.body.appendChild(floatNumber);

        // Start the animation
        setTimeout(() => {
            floatNumber.style.opacity = '0';
            floatNumber.style.transform = 'translateY(-100px)';
        }, 10);

        // Remove the element after animation
        setTimeout(() => {
            floatNumber.remove();
        }, 2000);
    }

    // Function to handle buying upgrades
    function buyUpgrade(type) {
        const costElementId = `${type}-cost`;
        const costElement = document.getElementById(costElementId);
        const cost = parseInt(costElement.innerText, 10);

        if (goldCoins >= cost) {
            goldCoins -= cost; // Deduct the cost from gold coins
            clickMultiplier += 1; // Increase click multiplier
            updateGoldDisplay(); // Update the display of gold coins
            // Increase and update the cost for the next purchase
            const newCost = cost + Math.floor(cost * 0.5); // Example increment, adjust as needed
            costElement.innerText = newCost;
        }
    }

    // Attach the event listener to the castle image for clicks
    document.getElementById('castle').addEventListener('click', clickCastle);

    // Example of setting up event listeners for buying upgrades
    // Adjust according to your actual upgrade element IDs
    document.getElementById('buy-knight').addEventListener('click', function() { buyUpgrade('knight'); });
    document.getElementById('buy-archer').addEventListener('click', function() { buyUpgrade('archer'); });
    document.getElementById('buy-wizard').addEventListener('click', function() { buyUpgrade('wizard'); });
    document.getElementById('buy-paladin').addEventListener('click', function() { buyUpgrade('paladin'); });
});
