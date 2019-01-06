var socket = io();

socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

// Custom listener event
socket.on('newEmail', function (email) {
    console.log("New email", email);
});

// Custom emit event
socket.emit('createMessage', {
    from: "Andy",
    text: "Works for me"
});

socket.on('newMessage', (message) => {
        console.log("newMessage", message);
})