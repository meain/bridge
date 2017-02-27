var user_data = {
    'name': 'Juliet Andy',
    'email': 'julietandy@gmail.com',
    'photo': 'https://thumbs.dreamstime.com/z/beautiful-profile-face-young-woman-clean-fresh-skin-40988715.jpg',
}


var timetable = {
    'monday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'tuesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'wednessday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'thursday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
    'friday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo']
}


//attendece and stuff
var track_data = {
    '10-12-2017':[
        {
            'period': 0, //period number
            'notes': 'random notes in period 0', //note data
            'attendece' : '' // bunked|free|attended
        },
        {
            'period': 1, //period number
            'notes': '', //note data
            'attendece' : '' // bunked|free|attended
        },
        {
            'period': 2, //period number
            'notes': '', //note data
            'attendece' : '' // bunked|free|attended
        },
        {
            'period': 3, //period number
            'notes': '', //note data
            'attendece' : '' // bunked|free|attended
        },
        {
            'period': 4, //period number
            'notes': '', //note data
            'attendece' : '' // bunked|free|attended
        },
        {
            'period': 5, //period number
            'notes': '', //note data
            'attendece' : '' // bunked|free|attended
        }
    ]
}


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
populate_user_profile = function(user){
    $('#profile-name').html(user['name']);
    $('#profile-image').attr('src', user['photo']);
}
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
            "<div class='card tiny timetable-subject'>"+
                timetable[dow][i]+
            "</div>"
    }
    htmlstr =
        "<div id='timetable-banner'>"+
            htmlstr+
        "</div>"
    $('.midpane.pane').append(htmlstr);
}
populate_upcoming(upcoming_events);
populate_user_profile(user_data);
populate_timetable_heder(timetable);







