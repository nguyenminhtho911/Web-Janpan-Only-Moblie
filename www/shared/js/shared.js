/*!
 * ScriptName: shared.js
 *
 * FCV - http://foodconnection.jp/
 *
 */

// DOM ready
$(document).ready(function() {


    //$('.tab-link li:first-child').click(); 
    // anchor link
    $('a[href^="#"]').click(function(e) {
        if ($(this).attr('href') && $(this).attr('href').length > 0) {
            if (!$(this).hasClass("btn-popup")) {
                var p = $($(this).attr('href')).offset();
                // if(p.top <= 78){
                // 	$('html,body').animate({ scrollTop: p.top }, 200);
                // }
                // else{
                $('html,body').animate({ scrollTop: p.top - 30 }, 200);
                // }
                if ($($(this).attr('href')).hasClass("link-archo") && !$($(this).attr('href')).parents(".toggle").first().hasClass("active")) $($(this).attr('href')).click();

            } else {
                var scroll = $(window).scrollTop();
                location.replace(location.origin + location.pathname + $(this).attr('href'));
                window.scroll(0, scroll);
                e.preventDefault();
                return false;
            }
        }
    }); // end anchor link



    $(window).load(function(e) {
        var hash1 = location.hash;
        var $root = $('html, body');
        if (hash1 != "" && $(hash1).length > 0) {
            var top01 = $(hash1).offset();
            //alert(hash1);

            // $root.animate({ scrollTop: top01.top - 30 }, 0);
            $root.animate({ scrollTop: top01.top }, 0);

            if ($(hash1).hasClass("link-archo"))


                $(hash1).click();



        }
    });


    // slide co thumbnail	
    $('.btn-tg01').click(function(e) {
        e.preventDefault();
        var dataslide = $(this).attr('data-slide');
        goToByScroll(1);
    });

    function goToByScroll(dataslide) {
        $("html, body").animate({ scrollTop: $('.go_slide' + dataslide).offset().top - 60 }, 500);
    }
    // end slide co thumbnail
});


$(window).load(function(e) {
    var hash1 = location.hash;
    var $root = $('html, body');
    if (hash1 != "" && $(hash1).length > 0) {
        var top01 = $(hash1).offset();
        //alert(hash1);
        if ($(hash1).parent().hasClass("tab-arc-link"))

        {
            $(hash1).click();

            var dataslide = $(this).attr('data-slide');
            goToByScroll(1);
        }

    }
});



$(window).load(function(e) {
    var hash1 = location.hash;
    var $root = $('html, body');
    if (hash1 != "") {
        var top01 = $(hash1).offset();
        //alert(hash1);
        $('html,body').animate({ scrollTop: top01.top - 60 }, 200);
    }
});





$(document).ready(function() {
    'use strict';
    $('.sub_scroll_box').slideUp(0);
    $('.sub_click').click(function() {
        if ($(this).hasClass('close')) {
            $(this).next().slideDown(500);
            $(this).removeClass('close').addClass('open');
        } else {
            $(this).next().slideUp(500);
            $(this).removeClass('open').addClass('close');
        }

    });

});

$(document).ready(function() {

    var h = 428;
    var w = 640;
    var wW = $(window).width();
    $('.bx_ext .bx-controls-direction').css('top', ((wW * h) / (640 * 2)) + 'px');
    $('.bx_ext .bx-wrapper .bx-pager').css('top', ((wW * h) / (640 * 2)) + 'px');
    $(window).resize(function() {
        wW = $(window).width();
        $('.bx_ext .bx-controls-direction').css('top', ((wW * h) / (640 * 2)) + 'px');
        $('.bx_ext .bx-wrapper .bx-pager').css('top', ((wW * h) / (640 * 2)) + 'px');
    })
})

$(document).ready(function() {

    var TargetPos = $('section.block').offset().top;

    $(window).scroll(function() {
        ////console.log(TargetPos);

        var ScrollPos = $(window).scrollTop();

        if (ScrollPos > TargetPos) {



            $("body").addClass('has_nav');

        } else {


            $("body").removeClass('has_nav');

        }


    });



});





// END: $.toggle 
$('.box-tg02').hide();
$('.btn-tg02').click(function() {
    var active = $(this).attr("role");
    if ($(this).hasClass('close')) {
        $('.box-tg02').slideUp(500);
        $('.btn-tg02').removeClass('open').addClass('close');
        $(this).removeClass('close').addClass('open');
        $("#" + active).stop(1, 1).delay(100).slideDown(500);
    } else {
        $("#" + active).slideUp(500);
        $('.btn-tg02').removeClass('open').addClass('close');
    }
});

// END: $.toggle

// END: $.toggle 
$('.box-tg03').hide();
$('.btn-tg03').click(function() {
    var active = $(this).attr("role");
    if ($(this).hasClass('close')) {
        $('.box-tg03').slideUp(500);
        $('.btn-tg03').removeClass('open').addClass('close');
        $(this).removeClass('close').addClass('open');
        $("#" + active).stop(1, 1).delay(100).slideDown(500);
    } else {
        $("#" + active).slideUp(500);
        $('.btn-tg03').removeClass('open').addClass('close');
    }
});

// END: $.toggle



// END: $.toggle 
$('.box-tg04').hide();
$('.btn-tg04').click(function() {
    var active = $(this).attr("role");
    if ($(this).hasClass('close')) {
        $('.box-tg04').slideUp(500);
        $('.btn-tg04').removeClass('open').addClass('close');
        $(this).removeClass('close').addClass('open');
        $("#" + active).stop(1, 1).delay(100).slideDown(500);
    } else {
        $("#" + active).slideUp(500);
        $('.btn-tg04').removeClass('open').addClass('close');
    }
});

// END: $.toggle

// END: $.toggle 
$('.box-tg05').hide();
$('.btn-tg05').click(function() {
    var active = $(this).attr("role");
    if ($(this).hasClass('close')) {
        $('.box-tg05').slideUp(500);
        $('.btn-tg05').removeClass('open').addClass('close');
        $(this).removeClass('close').addClass('open');
        $("#" + active).stop(1, 1).delay(100).slideDown(500);
    } else {
        $("#" + active).slideUp(500);
        $('.btn-tg05').removeClass('open').addClass('close');
    }
});

// END: $.toggle

//WOW Js
$(document).ready(function() {
    new WOW().init();
});