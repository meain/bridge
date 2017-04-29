var server_address = 'http://localhost:8080'
var fuid = 0

var user_data = {}


InitializeUser = function(user){
    this.class_name = 'initialize_user';
    this.user = user;
}
InitializeUser.prototype.get_data_from_server = function(callback){
    var self = this;
    if (callback === undefined) { callback=function(){} }
    $.get(server_address+'/events/'+fuid, function(upcoming_events){
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
                    "<span class='span violet name'>title</span><span class='span white span-content'>"+ this.events[i]['name']+ "</span>"+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span green name'>subject</span><span class='span white span-content'>"+ this.events[i]['subject']+ "</span>"+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span blue name'>submission</span><span class='span white span-content'>"+ this.events[i]['to']+ "</span>"+
                "</div>"+
            "</div>"
    }
    $('#rcontent').html(htmlstr);

    // Now set up the click handlers
    event_cards = $('.event');
    for(var i = 0, len = event_cards.length; i<len; i++){
        $(event_cards[i]).click(function(){
            event_data = self.events[$($(this)[0]).data('event')]
            el_main = $('#event-popup').children()
            el_date = $($(el_main[1]).children()[1]).text(event_data['due'])
            el_title = $($(el_main[2]).children()[1]).text(event_data['name'])
            el_subject = $($(el_main[3]).children()[1]).text(event_data['subject'])
            el_submission = $($(el_main[4]).children()[1]).text(event_data['to'])
            el_desc = $($(el_main[5]).children()[3]).text(event_data['description'])
            // console.log(el_date, el_subject, el_submission, el_desc)
            $($('#event-popup').parent()).css('display', 'flex');
        });
    }
    $($('#event-popup').parent()).click(function(){
        $($('#event-popup').parent()).css('display', 'none');
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
        $($('#signout-popup').parent()).css('display', 'none');
    });
    // Handle sinout popup remove click
    $($('#signout-popup').parent()).click(function(){
        $($('#signout-popup').parent()).css('display', 'none');
    });
    $('#signout-popup').click(function(e){
        e.stopPropagation();
    });
    // Open up the signout popup
    $('#profile-image').click(function(){
        $($('#signout-popup').parent()).css('display', 'flex');
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



Home = function(){
    this.class_name = 'home'
}
Home.prototype.get_data_from_server = function(callback){
    var self = this;
    if (callback === undefined) { callback=function(){} }

    $.get(server_address+'/track_data/'+fuid, function(track_data){
        $.get(server_address+'/subject_data/'+fuid, function(subject_data){
            $.get(server_address+'/timetable/'+fuid, function(timetable){
                self.timetable = timetable;
                self.subject_data = subject_data;
                self.track_data = track_data['data'];
                callback()
            })
        })
    })
}
Home.prototype.init = function(){
    var self = this;
    this.get_data_from_server(function(){
        var day = new Date().getDay();
        var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
        if(self.timetable[dow] != undefined){
            self.create_base_template();
            self.populate_timetable_heder();
            self.populate_subject_data(this.subject_data[this.timetable[dow][0]], this.track_data[0],0);
            self.handlers();
        }
        else{
            text = "<div style='text-align:center; width:100%; height:100%; font-size:30px; padding-top: 200px;'>It's a " + dow + ". You are free today!<div>"
            $('#mcontent').html(text);
        }
    })
}
Home.prototype.create_base_template = function(){
    htmlstr =
        '<div id="subject-data" class="card huge">'+
            '<!-- Use data tag  with the above element to store the period number -->'+
            '<div id="subject-name" class="subject-module">'+
                '<span class="span red name">subject</span>'+
                '<span class="span white span-content" id="subject-name-content"></span>'+
            '</div>'+
            '<div id="teacher-name" class="subject-module">'+
                '<span class="span blue name">teacher</span>'+
                '<span class="span white span-content" id="teacher-name-content"></span>'+
            '</div>'+
            '<div id="subject-time" class="subject-module">'+
                '<span class="span green name">time</span>'+
                '<span class="span white span-content" id="subject-time-content"></span>'+
            '</div>'+
            '<div id="subject-notes" class="subject-module">'+
                '<span class="span yellow name">notes</span>'+
            '</div>'+
            '<textarea id="notes-text" rows="15" placeholder="Boo, enter your notes here"></textarea>'+
        '</div>'
    $('#mcontent').html(htmlstr);
    this.notes_editor = new SimpleMDE({ element: document.getElementById("notes-text") });
    ne = this.notes_editor;  // Just to make it global for debug
}
// Populate the list of subjects
Home.prototype.populate_timetable_heder = function(timetable){
    var count = 0;
    for (var i in this.timetable) {
       if (this.timetable.hasOwnProperty(i)) count++;
    }
    htmlstr = ''
    var day = new Date().getDay();
    var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
    for( var i=0; i<=count; i++ ){
        htmlstr+=
            "<div class='card tiny timetable-subject' data="+i+">"+
                this.timetable[dow][i]+
            "</div>"
    }
    htmlstr =
        "<div id='timetable-banner'>"+
            htmlstr+
        "</div>"
    $('#mcontent').prepend(htmlstr);
}
// Populate data for each subject ( called on user click )
Home.prototype.populate_subject_data = function(subject_data, period_data, period_number){
    $('#subject-name-content').html(subject_data['subject']);
    $('#teacher-name-content').html(subject_data['teacher']);
    $('#subject-time-content').html(period_data['time']);
    this.notes_editor.value(period_data['notes']);
    $('#subject-data').attr('data', period_number);
}
Home.prototype.handlers = function(){
    var self = this;
    // Add in notes data to the variable
    this.notes_editor.codemirror.on("change", function(){
        note = self.notes_editor.value();
        period_number = $('#subject-data').attr('data');
        // console.log('was supposed to save after this for period:' + period_number)
        $.each(this.track_data, function(i, v) {    // probable to cause a bug
            if (v.period == period_number) {
                self.track_data[i].notes = note;
                return;
            }
        });
    });
    $('.timetable-subject').click(function(){
        var el = this;
        var day = new Date().getDay();
        var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
        period_number = $(el).attr('data');
        $('#subject-data').attr('data', period_number);
        self.populate_subject_data(self.subject_data[self.timetable[dow][period_number]], self.track_data[period_number], period_number);
    });
}



NotesView = function() {
    this.name = 'notesView';
    // filter with date and subject ( and even make requests based on that )
}
NotesView.prototype.get_data_from_server = function(callback){
    var self = this;
    if (callback === undefined) { callback=function(){} }
    $.get(server_address+'/notes/'+fuid, function(notes_data){
        self.notes_data = notes_data['data'];
        callback()
    })
}
NotesView.prototype.init = function(){
    var self = this
    this.get_data_from_server(function(){
        self.create_base_template()
        self.populate_notes()
    })
}
NotesView.prototype.populate_notes = function(){
    htmlstr = ''
    for(note in this.notes_data){
        htmlstr +=  "<br><br>"+
                    "<span class='span red name'>date</span><span class='span white span-content'>"+
                        this.notes_data[note]['date']+
                    "</span>&nbsp&nbsp&nbsp"+
                    "<span class='span green name'>subject</span><span class='span white span-content'>"+
                        this.notes_data[note]['subject']+
                    "</span>"+
                    "<br><br>"+
                    '<textarea class="notes-content" id="notes-content-' + note + '">'+
                        this.notes_data[note]['note']+
                    '</textarea>'
    }
    $('#notes-view-data').html(htmlstr);
    editor_items_notes = $('.notes-content')
    for(var item=0, len=editor_items_notes.length; item<len; item++){
        elem = $('#notes-content-'+item)
        new SimpleMDE({
            element: elem[0],
            status: false,
            toolbar: false,
        }).togglePreview();
    }
}
NotesView.prototype.create_base_template = function(){
    htmlstr =
        '<div id="notes-view-heading">'+
            'Notes'+
        '</div>'+
        '<div id="notes-view-data">'+
        '</div>'
    $('#mcontent').html(htmlstr);
}



AttendenceView = function() {
    this.name = 'attendenceView';
}
AttendenceView.prototype.get_data_from_server = function(callback){
    var self = this;
    if (callback === undefined) { callback=function(){} }
    $.get(server_address+'/subject_attendence/'+fuid, function(subject_attendence){
        self.subject_attendence = subject_attendence['data']
        callback()
    })
}
AttendenceView.prototype.init = function(){
    var self = this
    this.get_data_from_server(function(){
        self.create_base_template()
        self.populate_attendence()
    })
}
AttendenceView.prototype.populate_attendence = function(){
    var percentColors = [
        { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
    for( var i=0,len=this.subject_attendence.length ; i<len ; i++ ){
        var att_val = (this.subject_attendence[i].attended/this.subject_attendence[i].total)*100
        $('#attendence-'+i+'>#att').easyPieChart({
            size: 120,
            barColor: function(pct){
                pct = pct/100
                for (var i = 1; i < percentColors.length - 1; i++) {
                    if (pct < percentColors[i].pct) {
                        break;
                    }
                }
                var lower = percentColors[i - 1];
                var upper = percentColors[i];
                var range = upper.pct - lower.pct;
                var rangePct = (pct - lower.pct) / range;
                var pctLower = 1 - rangePct;
                var pctUpper = rangePct;
                var color = {
                    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
                };
                hexcol = "#" +
                 ("0" + parseInt(color.r,10).toString(16)).slice(-2) +
                 ("0" + parseInt(color.g,10).toString(16)).slice(-2) +
                 ("0" + parseInt(color.b,10).toString(16)).slice(-2)
                return hexcol
            }
        }).data('easyPieChart').update(att_val);
    }
}
AttendenceView.prototype.create_base_template = function(){
    htmlstr =
        '<div id="attendence-view-heading">'+
            'Attendence'+
        '</div>'+
        '<div id="attendence-view-data">'
    for( var i=0,len=this.subject_attendence.length ; i<len ; i++ ){
            htmlstr += '<div id="attendence-'+ i +'" class="attendence-pie">'+
                '<div id="att"></div>'+
                '<div id="att-name">'+this.subject_attendence[i].name+' ('+this.subject_attendence[i].attended+'/'+this.subject_attendence[i].total+')</div>'+
                '<div id="att-att" data-subject="'+ this.subject_attendence[i].name  +'">+attended</div>'+
                '<div id="att-bnk" data-subject="'+ this.subject_attendence[i].name  +'">+bunked</div>'+
            '</div>'
    }
    htmlstr += '</div>'
    $('#mcontent').html(htmlstr);
}



CalenderView = function() {
    this.name = 'calenderView';
}
CalenderView.prototype.get_data_from_server = function(callback){
    var self = this;
    if (callback === undefined) { callback=function(){} }
    $.get(server_address+'/calendar/'+fuid, function(cal_events){
        self.cal_events = cal_events['data']
        callback()
    })
}
CalenderView.prototype.init = function(){
    var self = this
    this.get_data_from_server(function(){
        self.create_base_template()
        self.populate_calender()
    })
}
CalenderView.prototype.populate_calender = function(){
    console.log(this.cal_events)
    $('#calender-view-data').fullCalendar({
        header: {
            // not really happending, probably need paid version
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        events: this.cal_events
    });
}
CalenderView.prototype.create_base_template = function(){
    htmlstr =
        '<div id="calender-view-heading">'+
            'Calender'+
        '</div>'+
        '<div id="calender-view-data">'+
        '</div>'
    $('#mcontent').html(htmlstr);
}





AboutView = function() {
    this.name = 'aboutView';
}
AboutView.prototype.init = function(){
    this.create_base_template()
    this.populate_about_content()
}
AboutView.prototype.populate_about_content = function(){
    htmlstr = ''
    htmlstr +=
        '<div id="team-image-container">'+
            '<img id="team-image" src="static/core/images/team.jpg" alt="Bridge Team">'+
        '</div>'+
        '<div class="team-data-heading">'+
            'Team'+
        '</div>'+
        '<div class="team-data-content">'+
            '<br>'+
            'Team Bridge'+
        '</div>'+
        '<div class="team-data-heading">'+
            'Team Members'+
        '</div>'+
        '<div class="team-data-content">'+
            '<br>'+
            '😜 Aayisha Shehsin 😜<br>'+
            'Yeah, it was hard getting her up and running'+
            '<br>'+
            '<br>'+
            '🤔 Abhai Kollara 🤔<br>'+
            "I asked him to submit and tagline and he didn't"+
            '<br>'+
            '<br>'+
            '✌️ Abin Simon ✌️<br>'+
            'I need help, seriously!'
        '</div>'
    $('#about-view-data').html(htmlstr);
}
AboutView.prototype.create_base_template = function(){
    htmlstr =
        '<div id="about-view-heading">'+
            'About'+
        '</div>'+
        '<div id="about-view-data">'+
        '</div>'
    $('#mcontent').html(htmlstr);
}









// User login
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    user_data['id'] = profile.getId();
    user_data['name'] = profile.getName();
    user_data['email'] = profile.getEmail();
    user_data['photo'] = profile.getImageUrl();
    console.log(user_data);
    $.post(server_address+'/signin/', { data:JSON.stringify(user_data) } ,  function(data){
        // populate_user_profile(user_data);
        data = JSON.parse(data)
        console.log(data)
        if(data['exists'] == true){
            initialize_user = new InitializeUser(user_data);
            initialize_user.init();
            home = new Home();
            home.init();
            fuid = user_data['id']
            $('#login-popup').css('display', 'none');
        }
        else{
            // Show class selector
            classes = data['options']
            htmlstr = ''
            for(i=0,len=classes.length;i<len;i++){
                htmlstr+='<div class="class-option" data-class='+classes[i].replace(' ','%')+'>'+classes[i]+'</div>'
            }
            $('#popup-class-list').html(htmlstr)
            class_option_buttons = $('.class-option')
            for( var i=0,len=class_option_buttons.length; i<len; i++ ){
                $(class_option_buttons[i]).click(function(){
                    user_class = $(this).data('class').replace('%',' ')
                    console.log(user_class)
                    $.post(server_address+'/create_user/', { 'user_data':JSON.stringify(user_data), 'class':user_class } ,  function(data){
                        console.log('New user created')
                        $($('#choose-class-popup').parent()).css('display', 'none');
                        $('#login-popup').css('display', 'none');
                        fuid = user_data['id']
                    })
                    })
            }
            $('#popup-welcome-message').text('Hello '+user_data['name']+' , welcome to Bridge!')
            $($('#choose-class-popup').parent()).css('display', 'flex');
        }
    })
}


// Hamburger menu thingy
$('#hamburger-menu-button').click(function(e){
    e.stopPropagation();
    nav = $($('.leftpane')[0]);
    nav.css('position', 'absolute');
    nav.css('display', 'block');
    nav.css('width', '50%');
    // nav.css('visibility', 'visible');
    // $($('.midpane')[0]).css('width', '50%');
});

$('div').not('.leftpane').click(function(){
    cur_state = $('#hamburger-menu-button').css('display');  //Kinda hacky, eeks
    if(cur_state == 'block'){
        nav = $($('.leftpane')[0]);
        nav.css('display', 'none');
        nav.css('width', '20vw');
        // nav.css('visibility', 'hidden');
        // $($('.midpane')[0]).css('width', 'calc(100vw - 45px)');
    }
});

$('#upcoming-menu-button').click(function(e){
    e.stopPropagation();
    nav = $($('.rightpane')[0]);
    nav.css('position', 'absolute');
    nav.css('display', 'block');
    nav.css('width', '50%');
    nav.css('right', '0');
    // nav.css('visibility', 'visible');
    // $($('.midpane')[0]).css('width', '50%');
});

$('div').not('.rightpane').click(function(){
    cur_state = $('#upcoming-menu-button').css('display');  //Kinda hacky, eeks
    if(cur_state == 'block'){
        nav = $($('.rightpane')[0]);
        nav.css('display', 'none');
        nav.css('width', '20vw');
        // nav.css('visibility', 'hidden');
        // $($('.midpane')[0]).css('width', 'calc(100vw - 45px)');
    }
});
