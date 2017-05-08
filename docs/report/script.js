InitializeUser = function(user){
    this.class_name = 'initialize_user';
    this.user = user;
}
InitializeUser.prototype.get_data_from_server =
    function(callback){
    var self = this;
    if (callback === undefined) { callback=function(){} }
    $.get(server_address+'/events/'+fuid,
        function(upcoming_events){
        self.events = upcoming_events['data'];
        callback()
    })
}
InitializeUser.prototype.init = function(events){
    var self = this
    this.get_data_from_server(function(){
        self.populate_user_profile();
        self.populate_upcoming();
        self.click_handlers();
    })
}
InitializeUser.prototype.populate_user_profile = function(){
    $('#profile-name').html(this.user['name']);
    $('#profile-image').attr('src', this.user['photo']);
    $('#popup-profile-name').html(this.user['name']);
    $('#popup-profile-image').attr('src', this.user['photo']);
    $('#popup-profile-email').html(this.user['email']);
}
InitializeUser.prototype.populate_upcoming = function(){
    var self = this;
    htmlstr = '';
    for( var i=0, len=this.events.length; i<len; i++ ){
        htmlstr +=
            "<div class='card small event' data-event="+i+">"+
                "<div class='card tiny date-card'>"+
                    this.events[i]['due']+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span violet name'>title"+
            "</span><span class='span white span-content'>"+
            this.events[i]['name']+ "</span>"+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span green name'>subject'"+
            "</span><span class='span white span-content'>"+
            this.events[i]['subject']+ "</span>"+
                "</div>"+
                "<div class='card tiny subject-card'>"+
            "<span class='span blue name'>submission"+
        "</span><span class='span white span-content'>"+
            this.events[i]['to']+ "</span>"+
                "</div>"+
            "</div>"
    }
    $('#rcontent').html(htmlstr);

    // Now set up the click handlers
    event_cards = $('.event');
    for(var i = 0, len = event_cards.length; i<len; i++){
        $(event_cards[i]).click(function(){
            event_data = self.events[$($(this)[0])
                .data('event')]
            el_main = $('#event-popup').children()
            el_date = $($(el_main[1]).children()[1])
                .text(event_data['due'])
            el_title = $($(el_main[2]).children()[1])
                .text(event_data['name'])
            el_subject = $($(el_main[3]).children()[1])
                .text(event_data['subject'])
            el_submission = $($(el_main[4]).children()[1])
                .text(event_data['to'])
            el_desc = $($(el_main[5]).children()[3])
                .text(event_data['description'])
            $($('#event-popup').parent())
                .css('display', 'flex');
        });
    }
    $($('#event-popup').parent()).click(function(){
        $($('#event-popup').parent())
            .css('display', 'none');
    });
}
InitializeUser.prototype.click_handlers = function(){
    // User logout
    $('#popup-profile-signout-button').click(function(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        $('#login-popup').css('display', 'flex');
        $($('#signout-popup').parent())
            .css('display', 'none');
    });
    // Handle sinout popup remove click
    $($('#signout-popup').parent()).click(function(){
        $($('#signout-popup').parent())
            .css('display', 'none');
    });
    $('#signout-popup').click(function(e){
        e.stopPropagation();
    });
    // Open up the signout popup
    $('#profile-image').click(function(){
        $($('#signout-popup').parent())
            .css('display', 'flex');
    });


    //other handles (menu items)
    $('#home').click(function(){
        new Home().init()
    });
    $('#notes').click(function(){
        new NotesView().init()
    });
    $('#about').click(function(){
        new AboutView().init()
    });
    $('#attendece').click(function(){
        new AttendenceView().init()
    });
    $('#calender').click(function(){
        new CalenderView().init()
    });
}
