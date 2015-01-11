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
            if ($(this).offset().left + 300 >= $(window).width()) {
                var left = $(this).offset().left - $("section#timetable > .row").offset().left;
                console.log(left);
                var difference = $(this).offset().left - $(window).width();
                left = left + difference - 20;
                console.log([left, difference ]);
                $(this)[0].style = "left: "+ left + "px";
            }

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
    
    $(".row.tt-row").click(function (e) {
        closeParallels(); 
    }).children().click(function(e) {
      return false;
    });
    
    
    
    /** Funkce pro zavření paralelek */
    function closeParallels() {
        $(".parallel").removeClass("parallel-extended").each(function(num,el) { $(el)[0].style = " "; });
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
    
    
    
});