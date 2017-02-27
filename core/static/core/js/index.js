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
    htmlstr = ''
    for( var i=0, len=event.length; i<len; i++ ){
        htmlstr +=
            "<div class='card small event'>"+
                "<div class='card tiny date-card'>"+
                    event[i]['due']+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span red'>subject: </span>"+ event[i]['name']+
                "</div>"+
                "<div class='card tiny subject-card'>"+
                    "<span class='span blue'>submission: </span>"+ event[i]['to']+
                "</div>"+
            "</div>"
    }
    $('#rcontent').html(htmlstr);
}
populate_upcoming(upcoming_events);
