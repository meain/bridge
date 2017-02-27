var user_data = {
    'name': 'Juliet Andy',
    'email': 'julietandy@gmail.com',
    'photo': 'https://thumbs.dreamstime.com/z/beautiful-profile-face-young-woman-clean-fresh-skin-40988715.jpg',
}


var timetable = {
    'monday': {'maths', 'physics', 'chemistry', 'computer science', 'party', 'none'}
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
populate_upcoming(upcoming_events);
populate_user_profile(user_data);







