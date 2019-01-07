var socket = io();
var $ = jQuery;
// var mustache = require('mustache');

socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);

    // console.log("newMessage", message);

    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // $('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    
    // var li = $('<li></li>');
    // var a = $("<a target='_blank'>My current location</a>");

    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTestBox = $('[name=message]');

    socket.emit('createMessage', {
        from: "User",
        text: messageTestBox.val()
    }, function () {
        messageTestBox.val('');
    })

});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.")
    }

    locationButton.attr('disabled', 'disabled').text("Sending location...");

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("Send location");;
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,

        });
    }, function () {
        locationButton.removeAttr('disabled').text("Send location");;
        alert("Unable to fetch location.")
    })
});