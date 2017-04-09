// YOUR CODE HERE:
var dataX = [];
var App = function() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/';
    this.fetchedData = null;
}

App.prototype.init = function() {
    var that = this;
    this.fetch(this.renderMessage);

    $('body').on('click', '.chat-submit', function(){
        var message = {
            text: $('.chat-input').val(),
            roomname: $('.room-input').val(),
            username: ''
        }
        that.send(message);
    });

    $('#USER').click(function(){
        $('#USER').addClass("active");
    })

    
    // get value of clicked item
    // change is click for dropdown
    $('.rooms').change(function(){
        $('.hide').removeClass('hide');
        // get value of the class for option (dropdown). first word only 
        var value = $(this).val().split(" ")[0];
        if (value === 'allrooms') {
            $('.hide').removeClass('hide');
        } else {
            // add class "hide" to everyone
            $(`.room`).addClass("hide");
            // remove class "hide" for the option being clicked
            $(`.${value}`).removeClass("hide");
        }

    });

    this.fetch(this.saveRooms);
    this.fetch(this.renderMessage);
};


App.prototype.send = function(message) {
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: `${this.server}messages`,
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
        url: `${this.server}messages?order=-createdAt`,
        type: 'GET',
        // dataType: 'JSON',
        data: {},
        contentType: 'application/json',
        success: function(data) {
            callback(data);
            for (var i=0; i<data.results.length; i++) {    
              dataX.push(data.results[i]);
            }
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
    if (message === 'debgguer') {
        return '';
    }
    return message.replace(/([<>()[{*+.$^\\|?])/g, '\\$1');
}

App.prototype.clearMessages = function() {
    $('#chats').empty();
};


App.prototype.renderMessage = function(message) {
console.log(message)
    for (var i = 0; i < message.results.length; i++) {
        var chat = message.results[i];
        var time = moment(chat.createdAt);
        var filteredText = app.filter(chat.text);
        var filteredUserName = app.filter(chat.username);
        var filteredRoomname = app.filter(chat.roomname);
        $('#chats').append(`
            <div class="${chat.roomname} room">
                <p>${filteredText}</p>
                <p class="${chat.username} username">${filteredUserName}  <small>${time.fromNow()}</small></p>
                <p></p>
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