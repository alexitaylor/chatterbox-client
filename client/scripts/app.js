// YOUR CODE HERE:
var dataX = [];
var App = function() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.fetchedData = null;
}

App.prototype.init = function() {
    this.fetch()

};

App.prototype.send = function(message) {
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(data) {
            console.log('chatterbox: Message sent');
        },
        error: function(data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
        }
    });
};

var output = 'asdf';
var promise = null;

App.prototype.fetch = function(cb) {

    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        data: {},
        contentType: 'application/json',
        success: function(data) {
            cb(data);
        },

        error: function(data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to get data', data);
        }

    });

};


//console.log(output);



App.prototype.clearMessages = function() {
    $('#chats').empty();
};

App.prototype.renderMessage = function(message) {
// $('#chats').append("<div>" + message + "</div>");
    for (var i = 0; i < message.results.length; i++) {
        $('#chats').append("<div><p>" + message.results[i].username +
            "</p><p>" + message.results[i].text + "</p><p>" + message.results[i].createdAt + "</p></div>");
    }
};


var app = new App();
var cb = function(message){
	console.log(message);
	//app.renderMessage(message);
}

app.fetch(app.renderMessage);
console.log(app.fetchedData)



// var promise = app.fetch();
// promise.done(function(data){
// 	output = data;
// 	console.log(data);
// })


// console.log(promise);


// Promise.all([promise]).then(values => {
// 	console.log(values);
// });

// var makeRequest = async () => {
// 		console.log(await app.fetch());
// };

// console.log(makeRequest());


console.log('hi Im here')