$(document).ready(() => {
    (() => {

        // ======== variables =========
        //==== boolean ====
        let menuActive = false,
            mMenuActive = false,
            dropDownIcon = false;

        //==== elements ====
        let $window = $(window),
            parallaxElem = $('.intro'),
            htmlBody = $('html, body'),
            nav = $('nav'),
            introh1 = $('.intro--h1'),
            introh4 = $('.intro--h4'),
            introCaption = $('.intro--caption--container'),
            $inputSearch = $('.input-search'),
            $overlay = $('.overlay');

        //==== ints ====

        let scrollTop = $window.scrollTop(),
            docHeight = $(document).height(),
            scrollPos = 0,
            timer1,
            timer2;

        //==== consts ====




        let navItemPlacement = () => {
                let topOfActive = $('li.active').position().top;
                let margin = 2 - topOfActive;
                console.log('margin', margin);
                $('.navbar-menu').css("top", margin + 'px');
            }
            //========== event listeners ==========
            // ===== resize =====
        let navReplaced = false;
        $($window).resize(() => {
            // if ($window.width() <= 1060 && $window.width() >= 1040) {
            //     navItemPlacement();
            // }
            // if ($window.width() <= 720 && $window.width() >= 700) {
            //     navItemPlacement();
            // }
            // if ($window.width() <= 420 && $window.width() >= 405) {
            //     navItemPlacement();
            // }
            if (!navReplaced && window.innerWidth < 1060) {
                navItemPlacement();
                navReplaced = true;
            }

        });

        // ===== Scroll =====
        $($window).scroll(function() {
            curScrollPos = $(this).scrollTop();
            if (($window).scrollTop() < 110) {
                $('.navbar-collapse-btn').css({
                    'position': 'absolute',
                    'top': '120px',
                });
                nav.css({ 'top': '110px', 'position': 'absolute' });
            }
            if (($window).scrollTop() >= 110) {
                nav.css({ 'top': '0px', 'position': 'fixed' });
                if (($window).scrollTop() < 180) {
                    $('.navbar-collapse-btn').css({
                        'position': 'fixed',
                        'top': '10px'
                    });
                }
            }
            nav_active(curScrollPos);
            btnScrollUpFade(curScrollPos);
            nav_collapse(curScrollPos);
            parallax(curScrollPos);
        });

        // ===== click =====
        $('.button--scroll-up').click((event) => { // When arrow is clicked
            event.preventDefault();
            btnScrollUp();
        });
        $('.navbar--search button').click(() => {
            searchFadeToggle();
        });

        let navOnProgress;

        $('.navbar-collapse-btn').click(() => {
            if (!navOnProgress) {
                navOnProgress = true;
                nav.toggleClass('active');
                if ($('.navbar-container').css('min-height').replace(/[^-\d\.]/g, '') < 60) {
                    $('.navbar-container').css('min-height', window.innerHeight - 110 + 'px');
                } else {
                    $('.navbar-container').css('min-height', '55px');
                }

                if ($('.navbar-menu').css('top').replace(/[^-\d\.]/g, '') < 0) {
                    $('.navbar-menu').css("top", '10%');
                } else {
                    navItemPlacement();
                }
                $('.navbar-container').scrollTop(0);
                setTimeout(() => { navOnProgress = false; }, 700);
            }
        });


        $(".dark-overlay").click(() => {
            $(".gallery-modal").removeClass("modal-container");
            $(".gallery-modal").addClass("modal-disp-none");
            $(".dark-overlay").fadeOut("medium");
        });
        $('.m-drop-down').click(() => {
            mDropDown();
        });
        // $("body > *").not("body .overlay-on").click(() => {
        //     $('.m-navbar--menu').slideUp('fast');
        //     searchFadeOut();
        //     $($overlay).fadeOut('fast');
        // });
        // ===== mouse enter & mouse leave =====
        $(".overlay-on").on("mouseenter", () => {
            timer1 = setTimeout(function() {
                overlayMouseEnter();
            }, 700);
        }).on("mouseleave", () => {
            clearTimeout(timer1);
            overlayMouseLeave();
        });
        $(".social").on("mouseenter", function() {
            clearTimeout(timer2);
            socialSlideDown();
        }).on("mouseleave", function() {
            timer2 = setTimeout(function() {
                socialSlideUp();
            }, 300)
        });
        $('ul.drop-down-ul li').on('mouseenter', function() {
            let itemIndex;
            itemIndex = $('ul.drop-down-ul li').index(this);
            switch (itemIndex) {
                case 0:
                    $('.drop-down-info-container>div').css({ top: 0 });
                    break;
                case 1:
                    $('.drop-down-info-container>div').css({ top: -400 });
                    break;
                case 2:
                    $('.drop-down-info-container>div').css({ top: -800 });
                    break;
                case 3:
                    $('.drop-down-info-container>div').css({ top: -1200 });
                    break;
                case 4:
                    $('.drop-down-info-container>div').css({ top: -1600 });
                    break;
                case 5:
                    $('.drop-down-info-container>div').css({ top: -2000 });
                    break;
            }
        });





        // ===== hover =====
        $('.drop-down').hover(() => {
            $('.drop-down-item').stop().fadeIn('slow');
        }, () => {
            $('.drop-down-item').stop().fadeOut(1);
        })








        //============= functions ==============
        let nav_collapse = (curScrollPos) => {
            if (curScrollPos > scrollPos) {
                $('.navbar-container').scrollTop(0);
                $('.navbar-container').removeClass('active');
                $('.navbar-container').css('min-height', '55px');
                if ($('.navbar-menu').css('marginTop').replace(/[^-\d\.]/g, '') < 0) {
                    $('.navbar-menu').css("margin-top", '0px');
                } else {
                    navItemPlacement();
                }
                if (curScrollPos >= 180) {
                    nav.addClass('hidden');
                    $('.navbar-collapse-btn').stop().fadeOut(8);
                    if ($('.navbar-menu').css('marginTop').replace(/[^-\d\.]/g, '') < 0) {
                        $('.navbar-menu').css("margin-top", '0px');
                    } else {
                        navItemPlacement();
                    }
                }
            } else if (curScrollPos < scrollPos && !menuActive) {
                $('.navbar-collapse-btn').stop().fadeIn(5);
                nav.removeClass('hidden');
            }
            scrollPos = curScrollPos;
        }
        let nav_active = (scrlTop) => {
            if (scrlTop > 5) {
                nav.addClass('colorful');
            } else if (scrlTop <= 5) {
                nav.removeClass('colorful');
            }
        }
        let btnScrollUpFade = (scrlTop) => {
            if (scrlTop >= 800) { // If page is scrolled more than 50px
                $('.button--scroll-up').fadeIn(200); // Fade in the arrow
            } else {
                $('.button--scroll-up').fadeOut(200); // Else fade out the arrow
            }
        }
        let btnScrollUp = () => {
            $('body,html').animate({
                scrollTop: 0 // Scroll to top of body
            }, 500);
        }
        let overlayMouseEnter = () => {
            $($overlay).fadeIn(500);
        }
        let overlayMouseLeave = () => {
            $($overlay).fadeOut(500);
        }
        let parallax = (currentScrollTop) => {
            parallaxElem.css('background-position', '50%' + -currentScrollTop / 4 + 'px');
        }
        let socialSlideDown = () => {
            $('.social').children('.social-icon').slideDown('fast');
            $('.social').stop(true, true).animate({ left: 5 + "px" }, 'fast');
        }
        let socialSlideUp = () => {
            $('.social').children('.social-icon').slideUp('fast');
            $('.social').stop(true, true).animate({ left: 0 + "px" }, 'fast');
        }
        let mDropDown = () => {
            $('.m-drop-down-item').slideToggle('fast');
            if (!dropDownIcon) {
                $('.fa-sort-down').css('transform', 'rotateX(180deg)');
                dropDownIcon = true;
            } else if (dropDownIcon) {
                $('.fa-sort-down').css('transform', 'rotateX(0deg)');
                dropDownIcon = false;
            }
        }
        let inputSearchSlideUp = () => {
            if ($inputSearch.height() > 5) {
                searchFadeOut();
            } else if ($inputSearch.height() < 5) {
                return;
            }
        }
        let searchFadeToggle = () => {
            searchFadeIn();
            searchFadeOut();
        }
        let searchFadeIn = () => {
            if ($($inputSearch).height() <= 0) {
                $($inputSearch).stop().animate({ height: 38 }, "fast");
                $($inputSearch).animate({ opacity: 1 }, "fast");
                $($overlay).fadeIn(500);
            }
        }
        let searchFadeOut = () => {
            if ($($inputSearch).height() > 10) {
                $($inputSearch).stop().animate({ height: 0 }, "fast");
                $($inputSearch).animate({ opacity: 0 }, "fast");
                if (!$($overlay).is(':visible')) {
                    return;
                } else {
                    $($overlay).fadeOut(500);
                }
            }
        }
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementBottom > viewportTop && elementTop < viewportBottom;
        };







        // ===== on load execute =====
        introh1.addClass('intro--h1--anim');
        introh4.addClass('intro--h4--anim');
        introCaption.addClass('abs-md-container-anim');

        window.onload = () => {
            if (window.innerWidth < 1060) {
                navItemPlacement();
                navReplaced = true;
            }
        };

        // $(".wave-1").click(function(e) {
        //     wave1(e, this);
        // });
        let rippleDone = false;
        $(".wave").click(function(e) {
            wave(e, this);
        });

        let wave = function(e, $this) {

            // Remove any old one
            $(".ripple").remove();

            // Setup
            var posX = $($this).offset().left,
                posY = $($this).offset().top,
                buttonWidth = $($this).width(),
                buttonHeight = $($this).height();

            // Add the element
            $($this).prepend("<span class='ripple'></span>");


            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            // Get the center of the element
            var x = e.pageX - posX - buttonWidth / 2;
            var y = e.pageY - posY - buttonHeight / 2;


            // Add the ripples CSS and start the animation
            $(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
            rippleDone = true;
            // setTimeout(() => { rippleDone = true }, 600);

        }
        let wave1 = function(e, $this) {

            // Remove any old one
            $(".ripple-1").remove();

            // Setup
            var posX = $($this).offset().left,
                posY = $($this).offset().top,
                buttonWidth = $($this).width(),
                buttonHeight = $($this).height();

            // Add the element
            $($this).prepend("<span class='ripple-1'></span>");


            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            // Get the center of the element
            var x = e.pageX - posX - buttonWidth / 2;
            var y = e.pageY - posY - buttonHeight / 2;


            // Add the ripples CSS and start the animation
            $(".ripple-1").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect-1");
            rippleDone = true;
        }
        var $slider = $(".slider"),
            $slideBGs = $(".slide__bg"),
            diff = 0,
            curSlide = 0,
            numOfSlides = $(".slide").length - 1,
            animating = false,
            animTime = 800,
            autoSlideTimeout,
            autoSlideDelay = 6000,
            $pagination = $(".slider-pagi");

        function createBullets() {
            for (var i = 0; i < numOfSlides + 1; i++) {
                var $li = $("<li class='slider-pagi__elem'></li>");
                $li.addClass("slider-pagi__elem-" + i).data("page", i);
                if (!i) $li.addClass("active");
                $pagination.append($li);
            }
        };

        createBullets();

        function manageControls() {
            $(".slider-control").removeClass("inactive");
            if (!curSlide) $(".slider-control.left").addClass("inactive");
            if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
        };

        function autoSlide() {
            autoSlideTimeout = setTimeout(function() {
                curSlide++;
                if (curSlide > numOfSlides) curSlide = 0;
                changeSlides();
            }, autoSlideDelay);
        };

        autoSlide();

        function changeSlides(instant) {
            if (!instant) {
                animating = true;
                manageControls();
                $slider.addClass("animating");
                $slider.css("top");
                $(".slide").removeClass("active");
                $(".slide-" + curSlide).addClass("active");
                setTimeout(function() {
                    $slider.removeClass("animating");
                    animating = false;
                }, animTime);
            }
            window.clearTimeout(autoSlideTimeout);
            $(".slider-pagi__elem").removeClass("active");
            $(".slider-pagi__elem-" + curSlide).addClass("active");
            $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
            $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
            diff = 0;
            autoSlide();
        }

        function navigateLeft() {
            if (animating) return;
            if (curSlide > 0) curSlide--;
            changeSlides();
        }

        function navigateRight() {
            if (animating) return;
            if (curSlide < numOfSlides) curSlide++;
            changeSlides();
        }

        $(document).on("mousedown touchstart", ".slider", function(e) {
            if (animating) return;
            window.clearTimeout(autoSlideTimeout);
            var startX = e.pageX || e.originalEvent.touches[0].pageX,
                winW = $(window).width();
            diff = 0;

            $(document).on("mousemove touchmove", function(e) {
                var x = e.pageX || e.originalEvent.touches[0].pageX;
                diff = (startX - x) / winW * 70;
                if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
                $slider.css("transform", "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)");
                $slideBGs.css("transform", "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)");
            });
        });

        $(document).on("mouseup touchend", function(e) {
            $(document).off("mousemove touchmove");
            if (animating) return;
            if (!diff) {
                changeSlides(true);
                return;
            }
            if (diff > -8 && diff < 8) {
                changeSlides();
                return;
            }
            if (diff <= -8) {
                navigateLeft();
            }
            if (diff >= 8) {
                navigateRight();
            }
        });

        $(document).on("click", ".slider-control", function() {
            if ($(this).hasClass("left")) {
                navigateLeft();
            } else {
                navigateRight();
            }
        });

        $(document).on("click", ".slider-pagi__elem", function() {
            curSlide = $(this).data("page");
            changeSlides();
        });

    })();

    $(function() {
        $('.btn-6')
            .on('mouseenter', function(e) {
                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find('span').css({ top: relY, left: relX })
            })
            .on('mouseout', function(e) {
                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find('span').css({ top: relY, left: relX })
            });
        $('[href=#]').click(function() { return false });
    });


});