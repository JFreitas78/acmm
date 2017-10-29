/**
 * Golbal JS
 * Criado por Jorge Freitas 05/10/2017
 */

$(document).ready(function () {

    $('#acmm-form').submit(function() {

        if (validaCamposContato()) {

            $('#acmm-status-sucess-msg').css('display', 'none');
            $('#acmm-status-valid-msg').css('display', 'none');
            $('#acmm-status-fail-msg').css('display', 'none');
            $('#acmm-name').css('display', 'none');
            $('#acmm-email').css('display', 'none');
            $('#acmm-message').css('display', 'none');
            $('#acmm-recaptcha').css('display', 'none');

            $(this).ajaxSubmit({
                host: 'www.google.com',
                port: '443',
                method: 'POST',
                path: '/recaptcha/api/siteverify',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                error: function(xhr) {
                    $('#acmm-status-fail-msg').css('display', 'block');
                    $('#acmm-open-modal').click();
                },
                success: function(response) {

                    var retStatus = response.responseCode;

                    if (retStatus == 0) {
                        $('#acmm-status-sucess-msg').css('display', 'block');
                        $('#acmm-open-modal').click();

                        jQuery("#acmm-close-modal").on('click', function () {
                            window.location.href = "/";
                        });
                    }
                    if (retStatus == 1) {
                        $('#acmm-status-valid-msg').css('display', 'block');
                        $('#acmm-open-modal').click();
                    }
                    else if (retStatus == 2) {
                        $('#acmm-recaptcha').css('display', 'block');
                    }
                    else if (retStatus == 3) {
                        $('#acmm-recaptcha-verification').css('display', 'block');
                    }
                    else if (retStatus == 4) {
                        $('#acmm-status-fail-msg').css('display', 'block');
                        $('#acmm-open-modal').click();

                        jQuery("#acmm-close-modal").on('click', function () {
                            window.location.href = "/";
                        });
                    }
                }
            });

            //Importante! Não permite que o formulário seja submetido
            return false;

        }

        return false;

    });
	
});

/* Scroll Anchor Menu */
$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a.acmm-link-menu[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
	
    $('#acmm-banner-container a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
	
    $('#acmm-about-us-container a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.acmm-nav-main a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.acmm-nav-main ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}

// ----------------------------------------------
// Valida os campos do formulário de contato
// ----------------------------------------------
function validaCamposContato() {

    var result = true;
    var RegExp = /^[\w]+@[\w]+\.[\w|\.]+$/;
        
    if ($('#acmm_contact_name').val() == "" || $('#acmm_contact_name').val() == null) {
        $('#acmm_contact_name').css("border", '2px solid #FFC036');
        $('#acmm-name').css("display", 'block');

        $('#acmm-contact-name').on('focus', function () {
            $('#acmm_contact_name').css('border-color', '#FFC036')
        })
        result = false;
    }

    if ($('#acmm_contact_email').val() == "" || $('#acmm_contact_email').val() == null) {
        $('#acmm_contact_email').css("border", '2px solid #FFC036');
        $('#acmm-email').css("display", 'block');

        
        $('#acmm-contact-email').on('focus', function () {
            $('#acmm_contact_email').css('border-color', '#FFC036')
            
        })
        result = false;
    }
    else {

        if (RegExp.test($('#acmm_contact_email').val()) != true) {
            result = false;
        } 
        
    }

    if ($('#acmm_contact_message').val() == "" || $('#acmm_contact_message').val() == null) {
        $('#acmm_contact_message').css("border", '2px solid #FFC036');
        $('#acmm-message').css("display", 'block');

        $('#acmm-contact-message').on('focus', function () {
            $('#acmm_contact_message').css('border-color', '#FFC036')
        })
        result = false;
    }

    return result;
}

