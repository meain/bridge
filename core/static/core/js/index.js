var user_data = {}


var timetable = {
    'monday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'tuesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'wednessday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'thursday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'friday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
}

var notes_data = [
    {
        'date': '24-3-2014',
        'note': 'lot of garbage'
    },
    {
        'date': '21-3-2014',
        'note': "random sutff for the heck of it, don't think I have time to use *lorem ipsum*"
    },
    {
        'date': '22-3-2014',
        'note': '# somethingggggggggggggggggggggggg'
    },
    {
        'date': '25-3-2014',
        'note': 'you bet it is soemtig not useful, just like you'
    },
    {
        'date': '26-3-2014',
        'note': 'dummy text, we really need to script this once the backed is set up'
    },
    {
        'date': '28-3-2014',
        'note': 'even more garbage, hahaa. crap, I hate my life'
    },
]


//attendece and stuff
var track_data = [
    {
        'period': 0, //period number
        'notes': 'random notes in period 0', //note data
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
    'maths': {
        'subject': 'Mathematics',  // incase we have abbr, probably won't get to that
        'teacher':'Adam Smith',
    },
    'physics': {
        'subject': 'Physics',
        'teacher':'Delin Mathew',
    },
    'chemistry': {
        'subject': 'Chemistry',
        'teacher':'Alex Philip',
    },
    'computer science': {
        'subject': 'Computer Science',
        'teacher':'Hebin Hentry',
    },
    'party': {
        'subject': 'Partttyyy',
        'teacher':'meain',
    },
    'boohoo': {
        'subject': 'BoooooHoooo',
        'teacher':'Boo',
    }
}


var upcoming_events = [
    {
        'name': 'Submit something',
        'due': '3-10-2017',
        'to': 'Sam Kodi',
        'description': 'Description for just something'
    },
    {
        'name': 'Kill Aayisha',
        'due': '5-11-2017',
        'to': 'Abhai Kollara',
        'description': 'Yaaaaay, we get to kill Aayisha for once. :)'
    },
    {
        'name': 'Ressuruct Aayisha',
        'due': '5-12-2017',
        'to': 'Abin Simon',
        'description': 'Well, I think we need her to complete the project. Let us get her back.'
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
    htmlstr = '';
    for( var i=0, len=this.events.length; i<len; i++ ){
        htmlstr +=
            "<div class='card small event' data=event-"+i+">"+
                "<div class='card tiny date-card'>"+
                    this.events[i]['due']+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span red name'>subject</span><span class='span white span-content'>"+ this.events[i]['name']+ "</span>"+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span blue name'>submission</span><span class='span white span-content'>"+ this.events[i]['to']+ "</span>"+
                "</div>"+
            "</div>"
    }
    $('#rcontent').html(htmlstr);

    // Now set up the click handlers
    $($('#event-popup').parent()).css('display', 'flex');
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
}



Home = function(){
    this.class_name = 'home'
}
Home.prototype.get_data_from_server = function(){
    // get calls will replace this
    $.get('localhost:8000/timetable/3409824309832408', function(data){
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
}
Home.prototype.init = function(){
    this.get_data_from_server();
    var day = new Date().getDay();
    var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
    if(this.timetable[dow] != undefined){
        this.create_base_template();
        this.populate_timetable_heder();
        this.populate_subject_data(subject_data[this.timetable[dow][0]], this.track_data[0],0);
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
        htmlstr += '<div class="note-date">'+
                        this.notes_data[note]['date']+
                    '</div>'+
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
