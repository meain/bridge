var user_data = {}


var timetable = {
    'monday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'tuesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'wednessday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'thursday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'friday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo']
}


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
    },
    {
        'name': 'Kill Aayisha',
        'due': '5-11-2017',
        'to': 'Abhai Kollara',
    },
    {
        'name': 'Ressuruct Aayisha',
        'due': '5-12-2017',
        'to': 'Abin Simon',
    },
]





// Add in the upcoming events to the upcoming events tab
populate_upcoming = function(event){
    htmlstr = '';
    for( var i=0, len=event.length; i<len; i++ ){
        htmlstr +=
            "<div class='card small event'>"+
                "<div class='card tiny date-card'>"+
                    event[i]['due']+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span red name'>subject</span><span class='span white span-content'>"+ event[i]['name']+ "</span>"+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span blue name'>submission</span><span class='span white span-content'>"+ event[i]['to']+ "</span>"+
                "</div>"+
            "</div>"
    }
    $('#rcontent').html(htmlstr);
}


// Add in user profile information
populate_user_profile = function(user){
    $('#profile-name').html(user['name']);
    $('#profile-image').attr('src', user['photo']);
    $('#popup-profile-name').html(user['name']);
    $('#popup-profile-image').attr('src', user['photo']);
    $('#popup-profile-email').html(user['email']);
}


// Populate data for each subject ( called on user click )
populate_subject_data = function(subject_data, period_data, period_number){
    $('#subject-name-content').html(subject_data['subject']);
    $('#teacher-name-content').html(subject_data['teacher']);
    $('#subject-time-content').html(period_data['time']);
    $('#notes-text').val(period_data['notes']);
    $('#subject-data').attr('data', period_number);
}


// Populate the list of subjects
populate_timetable_heder = function(timetable){
    var count = 0;
    for (var i in timetable) {
       if (timetable.hasOwnProperty(i)) count++;
    }
    htmlstr = ''
    var day = new Date().getDay();
    var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
    for( var i=0; i<=count; i++ ){
        htmlstr+=
            "<div class='card tiny timetable-subject' data="+i+">"+
                timetable[dow][i]+
            "</div>"
    }
    htmlstr =
        "<div id='timetable-banner'>"+
            htmlstr+
        "</div>"
    $('#mcontent').prepend(htmlstr);
    $('.timetable-subject').click(function(){
        period_number = $(this).attr('data');
        console.log(period_number);
        populate_subject_data(subject_data[timetable[dow][period_number]], track_data[period_number], period_number);
    });
}

// Call initial functions
populate_upcoming(upcoming_events);
populate_timetable_heder(timetable);


// Initially set it to show the first period data
var day = new Date().getDay();
var dow = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'][day]
populate_subject_data(subject_data[timetable[dow][0]], track_data[0],0);


// User login
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    user_data['id'] = profile.getId();
    user_data['name'] = profile.getName();
    user_data['email'] = profile.getEmail();
    user_data['photo'] = profile.getImageUrl();
    console.log(user_data);
    populate_user_profile(user_data);
    $('#login-popup').css('display', 'none');
}

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

// Add in notes data to the variable
$('#notes-text').blur(function(){
    note = $(this).val();
    period_number = $('#subject-data').attr('data');
    $.each(track_data, function(i, v) {
        if (v.period == period_number) {
            track_data[i].notes = note;
            return;
        }
    });
});
