$(document).ready(() => {
    (() => {

        // ======== variables =========
        //==== elements ====
        let $window = $(window),
            nav = $('nav'),
            $overlay = $('.overlay');

        //==== ints ====

        let scrollPos = 0,
            timer1,
            timer2;


        let navItemPlacement = () => {
                let topOfActive = $('li.active').position().top;
                let margin = 2 - topOfActive;
                $('.navbar-menu').css("top", margin + 'px');
            }
            //========== event listeners ==========
            // ===== resize =====
        let navReplaced = false;
        $($window).resize(() => {
            if (!navReplaced && window.innerWidth < 1060) {
                navItemPlacement();
                navReplaced = true;
            }
            $('.navbar-container').css('min-height', '55px');

        });

        // ===== Scroll =====
        $($window).scroll(function() {
            curScrollPos = $(this).scrollTop();
            if (($window).scrollTop() < 50) {
                $('.navbar-collapse-btn').css({
                    'position': 'absolute',
                    'top': '60px',
                });
                nav.css({ 'top': '50px', 'position': 'absolute' });
            }
            if (($window).scrollTop() >= 50) {
                nav.css({ 'top': '0px', 'position': 'fixed' });
                if (($window).scrollTop() < 180) {
                    $('.navbar-collapse-btn').css({
                        'position': 'fixed',
                        'top': '10px'
                    });
                }
            }
            btnScrollUpFade(curScrollPos);
        });

        // ===== click =====
        $('.button--scroll-up').click((event) => { // When arrow is clicked
            event.preventDefault();
            btnScrollUp();
        });

        let slideInProgress = [false, false];
        let slideNumber = [0, 0];
        $(window).resize(() => {
            iSlideChange(0, 0);
            iSlideChange(0, 1);
        });

        $('.i-slide-next').click(function() {
            if ($(this).hasClass('first')) {
                iSlideChange(++slideNumber[0], 0);
            } else {
                iSlideChange(++slideNumber[1], 1);
            }
        });

        $('.i-slide-prev').click(function() {
            if ($(this).hasClass('first')) {
                iSlideChange(--slideNumber[0], 0);
            } else {
                iSlideChange(--slideNumber[1], 1);
            }
        });

        function iSlideChange(idx, slider) {
            if (!slideInProgress[slider]) {
                slideInProgress[slider] = true;

                if (idx > 2) {
                    slideNumber[slider] = 0;
                    idx = 0;
                } else if (idx < 0) {
                    slideNumber[slider] = 2;
                    idx = 2;
                }

                let iSllideLeft = (idx * ($('.i-card-slide').width() + 12));

                if (slider == 0) {
                    $('.i-card-slide-container.first').css({
                        'left': -iSllideLeft + 'px'
                    });
                } else if (slider == 1) {
                    $('.i-card-slide-container.sec').css({
                        'left': -iSllideLeft + 'px'
                    });
                }

                setTimeout(() => {
                    slideInProgress[slider] = false;
                }, 700);
            }
        }

        let slideIntervals = [];

        function automate(slider) {
            if (slider == 0) {
                slideIntervals[0] = setInterval(() => {
                    iSlideChange(++slideNumber[0], 0);
                }, 7000);

            } else if (slider == 1) {
                slideIntervals[1] = setInterval(() => {
                    iSlideChange(++slideNumber[1], 1);
                }, 7000);
            }
        }

        $('.i-card-mother-container-1').mouseenter(() => {
            clearInterval(slideIntervals[0]);
        }).mouseleave(() => {
            automate(0);
        });

        $('.i-card-mother-container-2').mouseenter(() => {
            clearInterval(slideIntervals[1]);
        }).mouseleave(() => {
            automate(1);
        });

        automate(0);
        setTimeout(() => {
            automate(1);
        }, 600);


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
                    $('.navbar-menu').css("top", '6%');
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

        // ===== mouse enter & mouse leave =====
        $(".overlay-on").on("mouseenter", () => {
            timer1 = setTimeout(function() {
                overlayMouseEnter();
            }, 700);
        }).on("mouseleave", () => {
            clearTimeout(timer1);
            overlayMouseLeave();
        });

        let dropInfoScroll;
        $('ul.drop-down-ul li').on('mouseenter', function() {
            let itemIndex;
            dropInfoScroll = $('.drop-down-info-container>div').height();
            itemIndex = $('ul.drop-down-ul li').index(this);
            $('.drop-down-info-container').css({
                'transform': 'translateY(' + -1 * (itemIndex * dropInfoScroll) + 'px)'
            });
        });

        // ===== hover =====
        $('.drop-down').hover(() => {
            $('.drop-down-item').stop().fadeIn('slow');
        }, () => {
            $('.drop-down-item').stop().fadeOut(1);
        })

        //============= functions ==============
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

        // ===== on load execute =====
        window.onload = () => {
            navItemPlacement();
            if (($window).scrollTop() > 155) {
                $('.navbar-collapse-btn').css({
                    'position': 'fixed',
                    'top': '10px'
                });
            }
        };

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

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};