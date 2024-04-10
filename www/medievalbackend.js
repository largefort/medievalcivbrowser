let gameState = {
    coins: 0 // Initialize game state with coins
};

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Send current game state to just the connected client
    socket.emit('update-state', gameState);

    socket.on('click-castle', (data) => {
        // Update game state based on the action
        gameState.coins += data.coins; // Increment coins

        // Broadcast updated game state to all clients
        io.emit('update-state', gameState);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
