// Function to handle castle click
function clickCastle() {
    // Assuming each castle click generates 1 coin for simplicity
    socket.emit('click-castle', { coins: 1 });
}

// Listen for state updates from the server
socket.on('update-state', (data) => {
    // Update the UI with the new game state
    document.getElementById('counter').innerText = `Gold coins: ${data.coins}`;
});
