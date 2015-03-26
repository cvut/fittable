

$(document).ready(function () {
    
    $(document).foundation();
   
    /** Otevírání jednotlivých paralelek */
    
    $(".parallel").click(function (e) {
       
        if ($(this).hasClass("parallel-extended"))
        {
            // Zavření paralelky po kliknutí na header otevřené paralelky
            closeParallels();
        }
        else
        {
            // Otevření paralelky
            $(".parallel").removeClass("parallel-extended").each(function(num,el) { $(el)[0].style = " "; });
            $(this).addClass("parallel-extended");
            $("section#timetable").addClass("fade-inactive"); 
            
            // Upravit pozici, pokud by se box otevřel přes pravý kraj viewportu
            /*if ($(this).offset().left + 300 >= $(window).width()) {
                var left = $(this).offset().left - $("section#timetable > .row").offset().left;
                console.log(left);
                var difference = $(this).offset().left - $(window).width();
                left = left + difference - 20;
                console.log([left, difference ]);
                $(this)[0].style = "left: "+ left + "px";
            } wrong , přepsat... */

            // Pozice parallel-details boxu
            var parallelBoxPos = { 
                "x": $(this).offset().left - $("section#timetable > .row").offset().left + 2.5 , 
                "y": $(this).offset().top - $("section#timetable > .row").offset().top + $(this).height() 
            };

            $(".parallel-details").hide().slideDown(400).css(
                "left", parallelBoxPos.x + "px").css("top", parallelBoxPos.y + "px");
        }
    });
    
    
    
    /** Zavření všech paralelek po kliknutí jinam */
    
    $(".row.tt-row, section#timetable, div.gap, div.info-line").click(function (e) {
        closeParallels(); 
    }).children().click(function(e) {
      return false;
    });
    
    
    
    /** Funkce pro zavření paralelek */
    function closeParallels() {
        /*$(".parallel").removeClass("parallel-extended").each(function(num,el) { $(el)[0].style = " "; });*/
        $(".parallel-details").slideUp(400);
        $("section#timetable").removeClass("fade-inactive"); 
    }
    
    
    /** Procházení týdnů */
    
    $("a.prev-week").click(function () {
       $("section#timetable").removeClass("animate-left").removeClass("animate-right");
       setTimeout(function () { $("section#timetable").addClass("animate-right"); }, 100);
        switchWeek(parseInt($("section#timetable").attr("data-week")) -1);
    });
    $("a.next-week").click(function () {
       $("section#timetable").removeClass("animate-left").removeClass("animate-right");
       setTimeout(function () { $("section#timetable").addClass("animate-left"); }, 100);
        switchWeek(parseInt($("section#timetable").attr("data-week")) +1);
    });
    
    function switchWeek(week) {
        $("section#timetable").attr("data-week", week);
        $("#heading .primary-head strong").text("Týden "+week);
        $("#heading .primary-head span").text(week%2==0 ? "Sudý" : "Lichý");
    }
    
    
    /** Dočasně zavírat ajax loaderovátko */
    setTimeout(function() {
        $(".info-line .spinner").fadeOut(500);
    },2000);
    
    
    /** Dočasné přihl. údaje na sirius */
    $("input#accesstoken").val( $.cookie('sirius-accesstoken') );
    $("input#username").val( $.cookie('sirius-username') );
    
    $("#savein").click(function() {
        $.cookie('sirius-accesstoken', $("input#accesstoken").val(), { expires: 14 } );
        $.cookie('sirius-username', $("input#username").val(), { expires: 14 } );
        alert("Settings saved. Sup, "+$("input#username").val()+" :)");
        window.location.reload();
    });
    
    
    
    /** Chování rozvržení timetablu */
    
    $.get( "https://sirius.fit.cvut.cz/api/v1/people/" + $.cookie('sirius-username') + "/events?access_token=" + $.cookie('sirius-accesstoken') + "&from=2015-01-12T00:00:00&to=2015-01-19T23:59:59&limit=128" )
        .done( function(d) { 
            
            if ( d.meta.count <= d.meta.limit )
            {
                showEvents( d.events );
            }
            else console.log("Too many data. App is not ready yet for making more requests. Sry :/");
        
        });
    
    
    function showEvents( events )
    {
        var timeExtremes = findMinMaxTimes( events );
        $( "#timetable" ).attr( "data-mintime", timeExtremes[0] ).attr( "data-maxtime", timeExtremes[1] );
        
        $.each( events, function ( num, el ) {
            createEventElement( el );        
        } );
        
        console.log( events );
    }
    
    function getSecondsToday( momentDate )
    {
        return momentDate.hours() * 3600 + momentDate.minutes() * 60 + momentDate.seconds();
    }
    
    function findMinMaxTimes( siriusEvents )
    {
        var min = getSecondsToday( moment( siriusEvents[0].starts_at ) );
        var max = getSecondsToday( moment( siriusEvents[0].ends_at ) );        
        
        $.each( siriusEvents, function ( num, el ) {
            var estart = getSecondsToday( moment( el.starts_at ) );
            var eend = getSecondsToday( moment( el.ends_at ) );
            
            if (estart < min) min = estart;
            if (eend > max) max = eend;
        } );
        
        return [min, max];
    }
    
    function createEventElement( siriusEventobj )
    {
        var element = $("<div>").addClass("parallel").attr("role","listitem")
                                .attr("data-from", siriusEventobj.starts_at).attr("data-to", siriusEventobj.ends_at);
        
        element.append( $("<div>").addClass("inner-item") );
        
        element.children().append( $("<h1>").text( siriusEventobj.links.course ) );
        element.children().append( $("<div>").addClass("place").text( siriusEventobj.links.room ) );
        element.children().append( $("<div>").addClass("time")
                                  .text( moment( siriusEventobj.starts_at ).format("h:mm") +"-"+ moment( siriusEventobj.ends_at ).format("h:mm") ) 
                                 );
        
        $("#timetable .row.day").eq( parseInt( moment( siriusEventobj.starts_at ).format("d") ) -1 ).find(".day-parallels").append( element );
        
        setEventRightSize( $("#timetable"), element );
    }
    
    function setEventRightSize( timetableDOMobj, eventDOMobj )
    {
        var tablestarts = $( timetableDOMobj ).attr( "data-mintime" ),
            fulldiff = $( timetableDOMobj ).attr( "data-maxtime" ) - $( timetableDOMobj ).attr( "data-mintime" ),
            eventstarts = moment( $( eventDOMobj ).attr("data-from") ), eventends = moment( $( eventDOMobj ).attr("data-to") ),
            eventlength = eventends.diff(eventstarts, "seconds"),
            leftoffset = getSecondsToday( eventstarts ) - tablestarts;
        
        $( eventDOMobj ).css("width", ((eventlength/fulldiff)*100)+"%").css("left", ((leftoffset/fulldiff)*100)+"%");
    }
    
    
    
});
