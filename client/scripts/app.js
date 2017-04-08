// YOUR CODE HERE:
var dataX = [];
var App = function() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.fetchedData = null;
}

App.prototype.init = function() {
    var that = this;
    this.fetch(this.renderMessage);

    $('body').on('click', '.chat-submit', function(){
        var message = {
            text: $('.chat-input').val(),
            room: 'room',
            username: ''
        }
        that.send(message);
    });

    
    // get value of clicked item
    $('.rooms').change(function(){
        $('.hide').removeClass('hide');
        var value = $(this).val().split(" ")[0];
        if (value === 'allrooms') {
            $('.hide').removeClass('hide');
        } else {
            $(`.${value}`).addClass("hide");
        }

    });

    // add class of .hide to all children of rooms
    // remove class on clicked item


    $('.rooms').on('click', '.chat-submit', function(){
        var message = {
            text: $('.chat-input').val(),
            room: 'room',
            username: ''
        }
        that.send(message);
    });

    this.fetch(this.saveRooms);

    // $('.rooms').append(`<option>${room}</option>`)    

    this.fetch(this.renderMessage);
    //this.fetch(this.saveRooms);
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



App.prototype.fetch = function(callback) {

    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
        type: 'GET',
        // dataType: 'JSON',
        data: {},
        contentType: 'application/json',
        success: function(data) {
            dataX.push(data);
            callback(data);
            //console.log(data);
        },

        error: function(data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to get data', data);
        }

    });

};


App.prototype.filter = function(message){
    if (message === undefined) {
        return '';
    }
    return message.replace(/([<>()[{*+.$^\\|?])/g, '\\$1');
}

//console.log(output);


App.prototype.clearMessages = function() {
    $('#chats').empty();
};


App.prototype.renderMessage = function(message) {
// $('#chats').append("<div>" + message + "</div>");
console.log(message)
    for (var i = 0; i < message.results.length; i++) {
        var chat = message.results[i];
        var time = moment(chat.createdAt);
        var filteredText = app.filter(chat.text);
        $('#chats').append(`
            <div class="${chat.roomname}">
                <p>${chat.username}</p>
                <p>${filteredText}</p>
                <p>${time.fromNow()}</p>
            </div>`);
    }
};


App.prototype.saveRooms = function(data) {
  var rooms = {};
  _.each(data.results, function(item) {  
    if (!Object.prototype.hasOwnProperty.call(rooms, item.roomname)) {
       rooms[item.roomname] = item.roomname; 
    } 
  });
  
  for (var key in rooms) {
    $('.rooms').append(`<option class="${key}">${rooms[key]}</option>`); 
  }

   
}


var app = new App();
app.init();


console.log(dataX);
// var cb = function(message){
//     console.log(message);
//     //app.renderMessage(message);
// }



// var result = app.saveRooms([{
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// }, {
//   username: 'sharkesforcheap',
//   text: 'trolls',
//   roomname: '4chan'
// }])

// console.log(result)
// app.fetch(app.renderMessage);
// console.log(app.fetchedData)



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