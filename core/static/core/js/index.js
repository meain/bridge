var user_data = {}


var timetable = {
    'monday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
    'tuesday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
    'wednessday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
    'thursday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
    'friday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
}

var notes_data = [
    {
        'date': '24-3-2014',
        'subject': 'Modern Control Systems',
        'note': '# Control Theory \n\n` it is something important ` \n\n> e=mc^2\n\n* it\n* even\n* support\n* bulleted list'
    },
    {
        'date': '21-3-2014',
        'subject': 'Modern Control Systems',
        'note': '# Eeks \n\n` it is something important ` \n\n> e=mc^2\n\n* it\n* even\n* support\n* bulleted list'
    },
    {
        'date': '22-3-2014',
        'subject': 'Digital Signal Processing',
        'note': '# Image support \n\n` it is very very important ` \n\n![image](https://img.buzzfeed.com/buzzfeed-static/static/2015-04/21/16/enhanced/webdr05/enhanced-31550-1429646952-7.jpg)'
    },
    {
        'date': '25-3-2014',
        'subject': 'Operating Systems',
        'note': '# Multilevel headings\n\n ## second level\n\n### third level\n\n#### forth level\n\n and more ...'
    },
    {
        'date': '26-3-2014',
        'subject': 'Compiler Construction',
        'note': '# Hyperlinks too \n\n[Google](http://google.com)'
    },
    {
        'date': '28-3-2014',
        'subject': 'Control Thory',
        'note': '# Full markdown support\n\n`even code snippet`\n\n```python\nprint "hai"```'
    },
]


//attendece and stuff
var track_data = [
    {
        'period': 0, //period number
        'notes': '# Control Theory \n\n` it is something important ` \n\n> e=mc^2\n\n* it\n* even\n* support\n* bulleted list',
        'attendece' : '', // bunked|free|attended
        'time': '9:00'
    },
    {
        'period': 1, //period number
        'notes': '', //note data
        'attendece' : '', // bunked|free|attended
        'time': '10:00'
    },
    {
        'period': 2, //period number
        'notes': '', //note data
        'attendece' : '', // bunked|free|attended
        'time': '11:00'
    },
    {
        'period': 3, //period number
        'notes': '', //note data
        'attendece' : '', // bunked|free|attended
        'time': '13:00'
    },
    {
        'period': 4, //period number
        'notes': '', //note data
        'attendece' : '', // bunked|free|attended
        'time': '14:00'
    },
    {
        'period': 5, //period number
        'notes': '', //note data
        'attendece' : '', // bunked|free|attended
        'time': '15:00'
    }
]


// Will contain all the data for all the subjects that a student has
var subject_data = {
    'MCS': {
        'subject': 'Modern Control Systems',  // incase we have abbr, probably won't get to that
        'teacher':'Jisha Joseph',
    },
    'DSP': {
        'subject': 'Digital Signal Processing',
        'teacher':'Razia Rahim',
    },
    'DSP': {
        'subject': 'Digital Signal Processing',
        'teacher':'Razia Rahim',
    },
    'OS': {
        'subject': 'Operating Systems',
        'teacher':'Damodaran V',
    },
    'OS': {
        'subject': 'Operating Systems',
        'teacher':'Damodaran V',
    },
    'CC': {
        'subject': 'Compiler Construction',
        'teacher':'Sheena Mathew',
    }
}


var upcoming_events = [
    {
        'name': 'Project interim submission',
        'due': '30-03-2017',
        'to': 'Damodaran V',
        'subject' : 'Mini Project',
        'description': 'Interim submission of mini project'
    },
    {
        'name': 'SP Lab Record submission',
        'due': '30-03-2017',
        'to': 'Deepa Paul',
        'subject' : 'SP-Laboratory',
        'description': 'Fair record submission of Systems Programming Laboratory'
    },
]




InitializeUser = function(user){
    this.class_name = 'initialize_user';
    this.user = user;
}
InitializeUser.prototype.get_data_from_server = function(){
    // the get call will be used to replace here
    this.events = upcoming_events;
}
// Add in user profile information
InitializeUser.prototype.populate_user_profile = function(){
    $('#profile-name').html(this.user['name']);
    $('#profile-image').attr('src', this.user['photo']);
    $('#popup-profile-name').html(this.user['name']);
    $('#popup-profile-image').attr('src', this.user['photo']);
    $('#popup-profile-email').html(this.user['email']);
}
InitializeUser.prototype.init = function(events){
    this.get_data_from_server();
    this.populate_user_profile();
    this.populate_upcoming();
    this.click_handlers();
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
            // console.log(event_data);
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
Home.prototype.get_data_from_server = function(){
    // get calls will replace this
    console.log('obaining timetabel from the server');
    $.get('http://localhost:8000/timetable/3409824309832408', function(data){
        console.log(data);
    })
    this.timetable = timetable;
    this.subject_data = subject_data;
    this.track_data = track_data;
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
Home.prototype.init = function(){
    this.get_data_from_server();
    var day = new Date().getDay();
    var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
    if(this.timetable[dow] != undefined){
        this.create_base_template();
        this.populate_timetable_heder();
        this.populate_subject_data(this.subject_data[this.timetable[dow][0]], this.track_data[0],0);
        // this.populate_subject_data();
        this.handlers();
    }
    else{
        text = "<div style='text-align:center; width:100%; height:100%; font-size:30px; padding-top: 200px;'>It's a " + dow + ". You are free today!<div>"
        $('#mcontent').html(text);
    }
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
    console.log(this.timetable, dow)
    for( var i=0; i<=count; i++ ){
        console.log(i)
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
NotesView.prototype.get_data_from_server = function(){
    // might be an issue on async handling
    this.notes_data = notes_data;
}
NotesView.prototype.init = function(){
    this.get_data_from_server()
    this.create_base_template()
    this.populate_notes()
}
NotesView.prototype.populate_notes = function(){
    htmlstr = ''
    for(note in this.notes_data){
        console.log(this.notes_data[note]);
        htmlstr +=  "<br><br>"+
                    "<span class='span red name'>date</span><span class='span white span-content'>"+
                        this.notes_data[note]['date']+
                    "</span>&nbsp&nbsp&nbsp"+
                    "<span class='span green name'>subject</span><span class='span white span-content'>"+
                        this.notes_data[note]['subject']+
                    "</span>"+
                    '<textarea class="notes-content" id="notes-content-' + note + '">'+
                        this.notes_data[note]['note']+
                    '</textarea>'
    }
    $('#notes-view-data').html(htmlstr);
    editor_items_notes = $('.notes-content')
    for(var item=0, len=editor_items_notes.length; item<len; item++){
        elem = $('#notes-content-'+item)
        console.log(elem[0])
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
AttendenceView.prototype.get_data_from_server = function(){
    // might be an issue on async handling
}
AttendenceView.prototype.init = function(){
    this.get_data_from_server()
    this.create_base_template()
    this.populate_attendence()
}
AttendenceView.prototype.populate_attendence = function(){
    htmlstr = 'Work in progress! Just attend all the classes for now.'
    $('#attendence-view-data').html(htmlstr);
}
AttendenceView.prototype.create_base_template = function(){
    htmlstr =
        '<div id="attendence-view-heading">'+
            'Attendence'+
        '</div>'+
        '<div id="attendence-view-data">'+
        '</div>'
    $('#mcontent').html(htmlstr);
}



CalenderView = function() {
    this.name = 'calenderView';
}
CalenderView.prototype.get_data_from_server = function(){
    // might be an issue on async handling
}
CalenderView.prototype.init = function(){
    this.get_data_from_server()
    this.create_base_template()
    this.populate_calender()
}
CalenderView.prototype.populate_calender = function(){
    htmlstr = 'Work in progress!'
    $('#calender-view-data').html(htmlstr);
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
AboutView.prototype.get_data_from_server = function(){
    // might be an issue on async handling
    // this.notes_data = notes_data;
}
AboutView.prototype.init = function(){
    this.get_data_from_server()
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
            "Well, this guy's second name is Kollara"+
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
    // populate_user_profile(user_data);
    initialize_user = new InitializeUser(user_data);
    initialize_user.init();
    home = new Home();
    home.init();
    $('#login-popup').css('display', 'none');
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
