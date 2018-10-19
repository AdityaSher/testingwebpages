$(function() {
    "use strict";


    /* ==========================================================================
       CTA Form   
       ========================================================================== */


    $('#cta-signup-form').ajaxChimp({
        callback: callbackFunctionCta,
        url: 'http://csmthemes.us3.list-manage.com/subscribe/post?u=9666c25a337f497687875a388&id=df84217cb4'
            // http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    });

    function callbackFunctionCta(resp) {
        if (resp.result === 'success') {
            $('#mc-error-cta').slideUp();
            $('#mc-success-cta').slideDown();
        } else if (resp.result === 'error') {
            $('#mc-success-cta').slideUp();
            $('#mc-error-cta').slideDown();
        }
    }



    /* ==========================================================================
       Countdown timer 
       ========================================================================== */


    $('#clock').countdown('2020/12/30 12:34:56') //Change time here. Time format 'y/m/d  h/m/s' 
        .on('update.countdown', function(event) {
            var format = '%H:%M:%S';
            if (event.offset.days > 0) {
                format = '%-d day%!d ' + format;
            }
            if (event.offset.weeks > 0) {
                format = '%-w week%!w ' + format;
            }
            $(this).html(event.strftime(format));
        })
        .on('finish.countdown', function() {
            $(this).html('Registration are closed!')
                .parent().addClass('disabled');

        });




    /* ==========================================================================
       Sub Form   
       ========================================================================== */


    $('#mc-form').ajaxChimp({
        callback: callbackFunction,
        url: 'http://csmthemes.us3.list-manage.com/subscribe/post?u=9666c25a337f497687875a388&id=5b881a50fb'
            // http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    });

    function callbackFunction(resp) {
        if (resp.result === 'success') {
            $('#mc-error').slideUp();
            $('#mc-success').slideDown();
            $('#mc-form').find('input').val('');
        } else if (resp.result === 'error') {
            $('#mc-success').slideUp();
            $('#mc-error').slideDown();
        }
    }



    /* ==========================================================================
       CTA number animation
       ========================================================================== */


    $('.cta').waypoint(function() {

        $('.total-number').animateNumber({
            number: 800, //change value here
            color: '#FF5E5E'
        }, 4000);

        this.destroy();

    }, {
        offset: '70%'

    });



    /* ==========================================================================
       Share button 
       ========================================================================== */

    $("#share").jsSocials({
        showCount: false,
        shares: ["email", "twitter", "facebook", "googleplus"], // add/remove social network
        url: "http://csmthemes.com/themes/webi", // http://url.to.share
        text: "Webi - Webinar Landing Page" // text to share
    });


    /* ==========================================================================
       Counter number animation
       ========================================================================== */


    $('.counter').waypoint(function() {



        $('.total-number-1').animateNumber({
            number: 100, //change value here

        }, 2000);

        $('.total-number-2').animateNumber({
            number: 5000, //change value here

        }, 2000);

        $('.total-number-3').animateNumber({
            number: 1200, //change value here

        }, 2000);

        $('.total-number-4').animateNumber({

            number: 1500, //change value here

        }, 2000);

        this.destroy();

    }, {
        offset: '80%'

    });



    /* ==========================================================================
   Tweet
   ========================================================================== */


    $('.tweet').twittie({
        username: 'envatomarket', // change username here
        dateFormat: '%b. %d, %Y',
        template: '{{tweet}} {{user_name}}',
        count: 10
    }, function() {
        var item = $('.tweet ul');

        item.children('li').first().show().siblings().hide();
        setInterval(function() {
            item.find('li:visible').fadeOut(500, function() {
                $(this).appendTo(item);
                item.children('li').first().fadeIn(500);
            });

        }, 5000);
    });




    /* ==========================================================================
       video slider 
       ========================================================================== */


    $('.video .owl-carousel').owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        nav: true,
        dots: false,
        navText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]

    });



    /* ==========================================================================
       review slider 
       ========================================================================== */

    $('.reviews .owl-carousel').owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });




    /* ==========================================================================
       Navbar button animation
       ========================================================================== */


    $('#toggle, .overlay-menu a').on("click", function() {



        var btnCon = $(".button-container");
        if ($(btnCon).hasClass('active')) {
            $(btnCon).removeClass('active');
        } else {

            $(btnCon).addClass('active');
        }


        $('#overlay').toggleClass('open');
    });




    /* ==========================================================================
       Smooth scroll
       ========================================================================== */

    $('a[href*=#]:not([href=#]):not(.panel-title a)').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 60)
                }, 1000);
                return false;
            }
        }
    });


    /* ==========================================================================
   litebox
   ========================================================================== */

    $('.agenda .play-btn').magnificPopup({
        type: 'iframe'
    });


    /* ==========================================================================
     Textrotator
     ========================================================================== */



    $(".rotate").textrotator({
        animation: "dissolve",
        separator: ",",
        speed: 2500
    });


    /* ==========================================================================
       Contact form
       ========================================================================== */


    var formFields = $('.contact-form form input, .contact-form form textarea');



    $(formFields).on('focus', function() {
        $(this).removeClass('input-error');
    });
    $('.contact-form form').submit(function(e) {
        e.preventDefault();
        $(formFields).removeClass('input-error');
        var postdata = $('.contact-form form').serialize();
        $.ajax({
            type: 'POST',
            url: 'php/contact.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {

                if (json.nameMessage !== '') {
                    $('.contact-form form .contact-name').addClass('input-error');
                }
                if (json.emailMessage !== '') {
                    $('.contact-form form .contact-email').addClass('input-error');
                }
                if (json.messageMessage !== '') {
                    $('.contact-form form textarea').addClass('input-error');
                }
                if (json.antispamMessage !== '') {
                    $('.contact-form form .contact-antispam').addClass('input-error');
                }
                if (json.nameMessage === '' && json.emailMessage === '' && json.messageMessage === '' && json.antispamMessage === '') {
                    $('.contact-form').fadeOut('3000', "linear", function() {
                        $('.contact-form-success').slideToggle();

                    });
                }
            }
        });
    });




});