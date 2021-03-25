/*!
 * ScriptName: common.js
 * Version: 1.12
 *
 * Scripts for SP Team
 *
 * FCV - http://foodconnection.jp/
 *
 */

$(document).ready(function() {
    var UA = navigator.userAgent;
    if (UA.indexOf("iPhone") < 0 && UA.indexOf("Android") < 0) $(".telhref").contents().unwrap(); // remove link [tel] on desktop

    // fix bg parallax on mobile
    if (isMobile.any()) $(".bg-parallax").css("background-attachment", "inherit");
    else $(".bg-parallax").css("background-attachment", "");


    if (window.ClipboardJS && !/\{\s*\[native code\]\s*\}/.test("" + ClipboardJS)) {
        var clipboardData = new ClipboardJS(".copy", {
            // container: $(".copy").get(0),
            text: function(trigger) {
                var _text_ = "{TITLE} {URL}",
                    _viewport_ = $("meta[name='viewport']").last().attr("content");

                if ($(trigger).attr("data-copy") && $(trigger).attr("data-copy").length > 0) _text_ = $(trigger).attr("data-copy");

                if (_viewport_ && /(?:user-scalable\s*=\s*yes)/i.test(_viewport_)) $("meta[name='viewport']").last().attr("content", _viewport_.replace(/(?:user-scalable\s*=\s*yes)/i, "user-scalable=no")); // disabled zoom

                if ($(trigger).attr("data-replace-text")) $(trigger).html($(trigger).attr("data-replace-text"));
                else if ($(trigger).attr("data-replace-image")) {
                    var _imgReplace_ = $(trigger).attr("data-replace-image");

                    if ($(trigger).children("picture").length > 0) {
                        $(trigger).children("picture").addClass("copy-change");
                        $(trigger).children("picture").children().each(function() {
                            if ($(this).prop("tagName").toLowerCase() == "img") $(this).attr("src", _imgReplace_).removeClass("btn");
                            else if ($(this).prop("tagName").toLowerCase() == "source") $(this).attr("srcset", $(this).attr("src-replace") ? $(this).attr("src-replace") : _imgReplace_);
                        });
                    } else if ($(trigger).children("img").length > 0) {
                        if ($(trigger).children("img").hasClass("btn")) {
                            $(trigger).children("img").addClass("copy-change");

                            _imgReplace_ =
                                _imgReplace_
                                .replace(/^(.*?)(_on)?\.(.*?)$/, "$1_on.$3");
                        }

                        $(trigger).children("img").attr("src", _imgReplace_);
                    } else $(trigger).html('<img src="' + _imgReplace_ + '" />');
                }

                $(trigger).addClass("copied");

                if (_viewport_) $("meta[name='viewport']").last().attr("content", _viewport_); // enabled zoom

                _text_ = _text_.replace("{TITLE}", document.title).replace("{URL}", location.href);

                return _text_;
            }
        });

        clipboardData
            .on("success", function() {
                var offsetX = window.scrollX || window.pageXOffset || window.document.documentElement.scrollLeft,
                    offsetY = window.scrollY || window.pageYOffset || window.document.documentElement.scrollTop;

                // firefox jump - fixed
                window.scroll(offsetX, offsetY); // started

                setTimeout(function() { // step 1
                    window.scroll(offsetX, offsetY);
                }, 20);

                setTimeout(function() { // step 2
                    window.scroll(offsetX, offsetY);
                }, 15);

                setTimeout(function() { // step 3
                    window.scroll(offsetX, offsetY);
                }, 10);

                setTimeout(function() { // step 4
                    window.scroll(offsetX, offsetY);
                }, 5);

                setTimeout(function() { // step 5
                    window.scroll(offsetX, offsetY);
                }, 0);

                window.scroll(offsetX, offsetY); // final
            })
            .on("error", function() {});
    }

    // BEGIN: slide fading
    if ($(".slide-fade").length) {
        var $slideFadeTimer = {};

        $(".slide-fade").each(function() {
            if (!$(this).hasClass("stop")) {
                var $this = $(this),
                    $duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
                    $timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

                if (!$this.children(".active").length) {
                    $this.children().hide();
                    $this.children().eq(0).show().addClass("active");

                    if ($this.siblings(".slide-page").length) $this.siblings(".slide-page").children().eq(0).addClass("active");
                } else {
                    if ($this.siblings(".slide-page").length) $this.siblings(".slide-page").children().eq($this.children(".active").index()).addClass("active");
                }

                $slideFadeTimer[$this.index()] = setInterval(function() {
                    slideFade($this, $duration);
                }, $timer);
            }
        });

        $("body").on("click", ".slide-btn > .slide-next", function() {
            var $btn = $(this),
                $this = $btn.parent().siblings(".slide-fade"),
                $duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
                $timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

            if (!$btn.hasClass("clicked") && !$this.hasClass("stop")) {
                clearInterval($slideFadeTimer[$this.index()]);

                $btn.addClass("clicked");

                $this.children(".active").stop().fadeOut($duration, function() {
                    $(this).removeClass("active").removeAttr("style").hide();
                });

                if ($this.children(".active").next().length) {
                    $this.children(".active").next().stop().fadeIn($duration, function() {
                        $(this).addClass("active").removeAttr("style").show();
                        $btn.removeClass("clicked");

                        $slideFadeTimer[$this.index()] = setInterval(function() {
                            $this.siblings(".slide-btn").children(".slide-next").click();
                        }, $timer);
                    });
                } else {
                    $this.children().eq(0).stop().fadeIn($duration, function() {
                        $(this).addClass("active").removeAttr("style").show();
                        $btn.removeClass("clicked");

                        $slideFadeTimer[$this.index()] = setInterval(function() {
                            $this.siblings(".slide-btn").children(".slide-next").click();
                        }, $timer);
                    });
                }
            }
        });
        $("body").on("click", ".slide-btn > .slide-prev", function() {
            var $btn = $(this),
                $this = $btn.parent().siblings(".slide-fade"),
                $duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
                $timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

            if (!$btn.hasClass("clicked") && !$this.hasClass("stop")) {
                clearInterval($slideFadeTimer[$this.index()]);

                $btn.addClass("clicked");

                $this.children(".active").stop().fadeOut($duration, function() {
                    $(this).removeClass("active").removeAttr("style").hide();
                });

                if ($this.children(".active").prev().length) {
                    $this.children(".active").prev().stop().fadeIn($duration, function() {
                        $(this).addClass("active").removeAttr("style").show();
                        $btn.removeClass("clicked");

                        $slideFadeTimer[$this.index()] = setInterval(function() {
                            $this.siblings(".slide-btn").children(".slide-next").click();
                        }, $timer);
                    });
                } else {
                    $this.children().last().stop().fadeIn($duration, function() {
                        $(this).addClass("active").removeAttr("style").show();
                        $btn.removeClass("clicked");

                        $slideFadeTimer[$this.index()] = setInterval(function() {
                            $this.siblings(".slide-btn").children(".slide-next").click();
                        }, $timer);
                    });
                }
            }
        });

        $("body").on("click", ".slide-page > *", function() {
            var $page = $(this).parent(),
                $idx = $(this).index(),
                $this = $(this).parents(".slideParent").length ? $(this).parents(".slideParent").find(".slide-fade") : $(this).siblings(".slide-fade"),
                $duration = typeof $this.attr("data-duration") != "undefined" ? parseInt($this.attr("data-duration")) : 1000,
                $timer = typeof $this.attr("data-timer") != "undefined" ? parseInt($this.attr("data-timer")) : 4000;

            if ($this.length) {
                if (!$page.hasClass("clicked") && !$this.hasClass("stop")) {
                    if ($this.children().eq($idx).length) {
                        clearInterval($slideFadeTimer[$this.index()]);

                        $this.siblings(".slide-page").children(".active").removeClass("active");
                        $(this).addClass("active");

                        $page.addClass("clicked");

                        $this.children(".active").stop().fadeOut($duration, function() {
                            $(this).removeClass("active").removeAttr("style").hide();
                        });

                        $this.children().eq($idx).stop().fadeIn($duration, function() {
                            $(this).addClass("active").removeAttr("style").show();
                            $page.removeClass("clicked");

                            $slideFadeTimer[$this.index()] = setInterval(function() {
                                slideFade($this, $duration);
                            }, $timer);
                        });
                    } else console.info("Slide not found");
                }
            } else console.info(".slideParent or .slide-fade not found!");
        });

        function slideFade(elm, duration) {
            elm.children(".active").stop().fadeOut(duration, function() {
                $(this).removeClass("active").removeAttr("style").hide();
            });

            if (elm.children(".active").next().length) {
                if (elm.siblings(".slide-page").length) {
                    elm.siblings(".slide-page").children(".active").removeClass("active");
                    elm.siblings(".slide-page").children().eq(elm.children(".active").next().index()).addClass("active");
                }

                elm.children(".active").next().stop().fadeIn(duration, function() {
                    $(this).addClass("active").removeAttr("style").show();

                    if (elm.siblings(".slide-btn").hasClass("clicked")) elm.siblings(".slide-btn.clicked").removeClass("clicked");
                    if (elm.siblings(".slide-page").hasClass("clicked")) elm.siblings(".slide-page.clicked").removeClass("clicked");
                });
            } else {
                if (elm.siblings(".slide-page").length) {
                    elm.siblings(".slide-page").children(".active").removeClass("active");
                    elm.siblings(".slide-page").children().eq(0).addClass("active");
                }

                elm.children().eq(0).stop().fadeIn(duration, function() {
                    $(this).addClass("active").removeAttr("style").show();

                    if (elm.siblings(".slide-btn").hasClass("clicked")) elm.siblings(".slide-btn.clicked").removeClass("clicked");
                    if (elm.siblings(".slide-page").hasClass("clicked")) elm.siblings(".slide-page.clicked").removeClass("clicked");
                });
            }
        }
    }
    // BEGIN: slide fading


    // BEGIN: toggle
    if ($(".toggle").length) {
        $toggleDuration = 500;
        $(".toggle").each(function() {
            if (typeof $(this).attr("data-duration") != "undefined") {
                if ($.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0) $toggleDuration = $(this).attr("data-duration");
                else $toggleDuration = parseInt($(this).attr("data-duration"));
            }
        });

        $(".toggle-link").click(function() {
            var $toggle = $(this).parents(".toggle").first();

            if ($toggle.hasClass("active")) {
                var toggleHeight = $toggle.outerHeight();
                $(this).parents(".bx-viewport").each(function() { // adaptive height
                    var bxHeight = $(this).outerHeight();

                    $(this).stop().animate({
                        height: bxHeight - toggleHeight
                    }, 300);
                });

                $(this).siblings(".toggle-main").stop().slideUp($toggleDuration, function() {
                    $(this).removeAttr("style");
                    $toggle.removeClass("active");
                });
            } else {
                var $main = $toggle.children(".toggle-main"),
                    toggleHeight = 0;

                $main.css("display", "block");
                toggleHeight += $toggle.outerHeight(); // update height
                $main.css("display", "");

                $(this).parents(".bx-viewport").each(function() { // adaptive height
                    var bxHeight = $(this).outerHeight();

                    $(this).stop().animate({
                        height: bxHeight + toggleHeight
                    }, 300);
                });

                $(this).siblings(".toggle-main").stop().slideDown($toggleDuration, function() {
                    $(this).removeAttr("style");
                    $toggle.addClass("active");
                });

                if ($(this).siblings(".toggle-main").find("[class*=heightLine]").length) heightLine();
            }
        })
    }
    // END: toggle

    // BEGIN: tabs - switch
    if ($(".tabs-switch").length) {
        $(".tabs-switch").each(function() {
            var $tabsSwitch = $(this),
                $tabLink = $tabsSwitch.find(".tab-link"),
                $tabContent = $tabsSwitch.find(".tab-content");

            $tabLink.children().each(function() {
                if ($(this).find("img").length && !$(this).find("img").hasClass("over") && !$(this).find("img").hasClass("non-over")) {
                    $(this).data("src", $(this).find("img").attr("src"));

                    $(this).find("img").attr("src").match(/^(.*)(\.{1}.*)/g);
                    $(this).data("active", RegExp.$1 + "_on" + RegExp.$2);
                }
            });

            $tabContent.children().hide();

            $tabLink.each(function() {
                // TODO: active by [data-active]
                if (location.hash) {
                    if ($(this).children("[data-tab-anchor='" + location.hash + "']").length) $(this).children("[data-tab-anchor='" + location.hash + "']").addClass("active");
                    else $(this).children().first().addClass("active");
                } else if (!$(this).children(".active").length) $(this).children().first().addClass("active");

                $(this).children(".active").find("img").attr("src", $(this).children(".active").data("active"));
            });

            $tabContent.children().eq($tabLink.children(".active").index()).show();

            //bxslider in tab

            var _idx = false;
            if ($(this).parents(".bxSlider").length) {
                _idx = $(".bxSlider").index($(this).parents(".bxSlider"));
                $bxSlider[_idx].stopAuto();

                // $bxSliderData[_idx].startSlide = $bxSlider[_idx].getCurrentSlide();
                setTimeout(function() {
                    // $bxSlider[_idx].reloadSlider($bxSliderData[_idx]);
                    // $bxSlider[_idx].startAuto();
                    $(window).trigger("resize");
                }, 100);
            }


        });

        $("body").on("click", ".tab-link > *", function() {
            var $this = $(this),
                $idx = $this.index(),
                $act = $this.parent().children(".active"),
                $tabMode = $.inArray($this.parents(".tabs-switch").attr("data"), ["fade", "slide", "block"]) >= 0 ? $this.parents(".tabs-switch").attr("data") : "block",
                $tabDuration = $this.parents(".tabs-switch").attr("data-duration") ? parseInt($this.parents(".tabs-switch").attr("data-duration")) : 300,
                $tabContent = $this.parents(".tabs-switch").children(".tab-content"),
                $tabIdx = $this.attr("data-active") ? $this.attr("data-active") : false,
                $autoScroll = $.inArray($this.parents(".tabs-switch").attr("data-scroll"), ["true", "on", "enable", "enabled", "1"]) >= 0 ? true : false;

            if ($tabIdx) {
                $this.parents(".tabs-switch").find(".tab-link").each(function() {
                    var $tabBtn = $(this).children("[data-active='" + $tabIdx + "']");

                    $(this).children(".active").find("img").attr("src", $(this).children(".active").data("src"));
                    $(this).children(".active").removeClass("active");

                    $tabBtn.addClass("active");
                    if (!$tabBtn.find("img").hasClass("active")) $tabBtn.find("img").attr("src", $tabBtn.data("active"));
                });
            } else {
                $act.find("img").attr("src", $act.data("src"));
                $act.removeClass("active");
                $this.addClass("active");
                if (!$this.find("img").hasClass("active")) $this.find("img").attr("src", $this.data("active"));
            }

            var _idx = false;
            if ($tabContent.children().eq($idx).find(".bxSlider").length) {
                _idx = $(".bxSlider").index($tabContent.children().eq($idx).find(".bxSlider"));
                $bxSlider[_idx].stopAuto();
            }

            if (!$this.parents(".tab-link").hasClass("clicked")) {
                if ($tabMode == "fade") {
                    $tabContent.css({
                        minHeight: $tabContent.outerHeight()
                    });

                    $tabContent.children().stop().fadeOut($tabDuration, function() {
                        $(this).removeAttr("style").hide();
                    });
                    $tabContent.children().eq($idx).stop().delay($tabDuration).fadeIn($tabDuration, function() {
                        $(this).removeAttr("style").show();

                        if ($(this).find("[class*=heightLine]").length) heightLine();

                        if ($this.children("a").length) $this.children("a").click();

                        $tabContent.css({
                            minHeight: ""
                        });

                        if (_idx !== false) {
                            // $bxSliderData[_idx].startSlide = $bxSlider[_idx].getCurrentSlide();
                            // $bxSlider[_idx].reloadSlider($bxSliderData[_idx]);
                            // $bxSlider[_idx].startAuto();
                            $(window).trigger("resize");
                        }

                        $this.parents(".tab-link").removeClass("clicked");
                    });
                } else if ($tabMode == "slide") {
                    $tabContent.children().stop().slideUp($tabDuration, function() {
                        $(this).removeAttr("style").hide();
                    }).siblings().eq($idx).stop().slideDown($tabDuration, function() {
                        $(this).removeAttr("style").show();

                        if ($(this).find("[class*=heightLine]").length) heightLine();

                        if ($this.children("a").length) $this.children("a").click();

                        if (_idx !== false) {
                            // $bxSliderData[_idx].startSlide = $bxSlider[_idx].getCurrentSlide();
                            // $bxSlider[_idx].reloadSlider($bxSliderData[_idx]);
                            // $bxSlider[_idx].startAuto();
                            $(window).trigger("resize");
                        }

                        $this.parents(".tab-link").removeClass("clicked");
                    });
                } else {
                    $tabDuration = $this.parents(".tabs-switch").attr("data-duration") ? parseInt($this.parents(".tabs-switch").attr("data-duration")) : 0;

                    $tabContent.children().stop().hide($tabDuration, function() {
                        $(this).removeAttr("style").hide();
                    }).siblings().eq($idx).stop().show($tabDuration, function() {
                        $(this).removeAttr("style").show();

                        if ($(this).find("[class*=heightLine]").length) heightLine();

                        if ($this.children("a").length) $this.children("a").click();

                        if (_idx !== false) {
                            // $bxSliderData[_idx].startSlide = $bxSlider[_idx].getCurrentSlide();
                            // $bxSlider[_idx].reloadSlider($bxSliderData[_idx]);
                            // $bxSlider[_idx].startAuto();
                            $(window).trigger("resize");
                        }

                        $this.parents(".tab-link").removeClass("clicked");
                    });
                }

                if ($autoScroll) {
                    var $offsetY = $tabContent.offset().top,
                        $navOffset = 0;

                    if ($(".nav-fixed").length) $navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

                    if ($(".nav-target").length) {
                        if ($(".nav-fixed").length) $navOffset = typeof $(".nav-fixed").attr("data-height") != "undefined" ? parseInt($(".nav-fixed").attr("data-height")) : $(".nav-fixed").outerHeight();

                        $("html, body").stop().animate({
                            scrollTop: $offsetY - $navOffset
                        }, 500);
                    } else {
                        $("html, body").stop().animate({
                            scrollTop: $offsetY - $navOffset
                        }, 500);
                    }
                }
            }
            setTimeout(function() {
                $(window).trigger("resize");
            }, 50);

            $this.parents(".tab-link").addClass("clicked");
        });

    }
    // END: tab - switch



    // BEGIN: scroll to top
    if ($(window).scrollTop() > 0) $("#pagetop").addClass("visible");
    else $("#pagetop").removeClass("visible");

    $("body").on("click", "#pagetop", function() {
        if (!$(this).hasClass("in-scroll")) {
            $(this).addClass("in-scroll");

            var $scrollDuration = $.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0 || parseInt($(this).attr("data-duration")) > 0 ? $(this).attr("data-duration") : "slow";

            $("html, body").stop().animate({
                scrollTop: 0
            }, $scrollDuration, function() {
                $("#pagetop").removeClass("in-scroll");
            });
        }
    });
    // END: scroll to top

    // BEGIN: text vertical
    $(".txt-vertical").each(function() {
        if (!$(this).hasClass("all-str")) {
            var $regex = /(\d{1,2})/g;

            if ($(this).hasClass("per-line")) $regex = /(\d)/g;

            $(this).html(function(idx, val) {
                return val.replace($regex, '<span class="int">$1</span>');
            });
        }

        if ($(this).children(".txt-normal").length) {
            $(this).children(".txt-normal").html(function(idx, val) {
                var $characters = $.trim(val).split("");
                return '<span class="int">' + $characters.join('</span><span class="int">') + '</span>';
            });
        }
    });
    $(".txt-vertical-x").each(function() {
        $(this).html($(this).text().replace(/(.)/g, "<span>$1</span>"));
    });
    // END: text vertical


    // BEGIN: social button
    var __socialsHTML__ = "",
        __socialsLang = $("html").attr("lang") !== undefined && $.trim($("html").attr("lang")).length == 2 ? $.trim($("html").attr("lang")).toLowerCase() : "ja",
        $socialsLine = "",
        $socialsTwitter = "",
        $socialsFacebook = "",
        locationURL = window.location.href || location.href;

    $socialsTwitter += '<div class="social-twitter">';
    $socialsTwitter += '<a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>';
    $socialsTwitter += '<script type="text/javascript">!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
    $socialsTwitter += '</div>';

    $socialsFacebook += '<div class="social-facebook">';
    $socialsFacebook += '<div class="fb-like" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>';
    $socialsFacebook += '</div>';

    $socialsLine += '<div class="social-line">';
    $socialsLine += '<div class="line-it-button" data-lang="' + __socialsLang + '" data-type="share-a" data-ver="3" data-url="' + locationURL + '" data-color="default" data-size="small" data-count="false" style="display: none;">';
    $socialsLine += '<script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer"></script>';
    $socialsLine += '</div>';
    $socialsLine += '</div>';


    if ($("#socialbuttons").length) {
        var $socialsOrder = typeof $("#socialbuttons").attr("data") != "undefined" ? $("#socialbuttons").attr("data").split("") : false;

        if (typeof $socialsOrder == "object" && $socialsOrder.length) {
            for (var socialsType in $socialsOrder) {
                if ($.trim(socialsType).length > 0) {
                    socialsType = socialsType.toLowerCase();

                    if ($socialsOrder[socialsType].toLocaleLowerCase() === "f") __socialsHTML__ += $socialsFacebook;
                    else if ($socialsOrder[socialsType].toLocaleLowerCase() === "t") __socialsHTML__ += $socialsTwitter;
                    else if ($socialsOrder[socialsType].toLocaleLowerCase() === "l") __socialsHTML__ += $socialsLine;
                }
            }
        } else {
            __socialsHTML__ += $socialsTwitter;
            __socialsHTML__ += $socialsFacebook;
            __socialsHTML__ += $socialsLine;
        }

        $("#socialbuttons").html(__socialsHTML__);
    }
    // END: social button

    /* fix smoothscroll on IE */
    if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
        $("body").on("mousewheel", function(e) {
            event.preventDefault();
            window.scrollTo(0, window.pageYOffset - event.wheelDelta);
        });
    }

    // scrollBefore(); // smoothscroll before page loaded

    $("body").on({
        mouseup: function() {
            $(this).removeClass("scrollable");
        },
        mousedown: function() {
            $(this).addClass("scrollable");
        },
        mouseleave: function() {
            $(this).removeClass("scrollable");
        }
    }, ".gmap");
});

// user agents
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(window).resize(function() {
    // fix bg parallax on mobile
    if (isMobile.any()) $(".bg-parallax").css("background-attachment", "inherit");
    else $(".bg-parallax").css("background-attachment", "");
}).on("scroll resize", function() {
    if ($(this).scrollTop() > 0) $("#pagetop").addClass("visible");
    else $("#pagetop").removeClass("visible");

    if ($(".nav-fixed").length) {
        var $navPinY = $(".nav-target").length ? $(".nav-target").offset().top - $(".nav-fixed").outerHeight() - 1 : $(".nav-fixed").offset().top;
        if ($(this).scrollTop() > $navPinY || ($navPinY < 0 && $(this).scrollTop() > 0)) {
            if ($(".nav-pin").length) $(".nav-pin").addClass("fixed");
            else $(".nav-fixed").addClass("fixed");
        } else {
            if ($(".nav-pin").length) $(".nav-pin").removeClass("fixed");
            else $(".nav-fixed").removeClass("fixed");
        }
    }
}).on("load", function() {
    // scrollBefore();
});

var scrollBefore = function() {
    if (location.hash) {
        var ptnHash = /([;?%&,+*~\':"!^$[\]()=>|\/@])/g,
            hash = location.hash;

        hash = hash.replace(ptnHash, "\\$1");
        if ($(hash).length) {
            if ($(".nav-fixed").length) {
                var $offsetY = $(hash).offset().top;

                // if ($(".nav-pin").length) $offsetY -= $(".nav-pin").outerHeight();
                $offsetY -= $(".nav-fixed").outerHeight();

                setTimeout(function() {
                    window.scroll(0, $offsetY);
                }, 10);

                $("a[href=" + hash + "]").click();
            }
        }
    }
};

scrollBefore(); // DOM loaded



/*
 * Plugins/Functions
 *
 */

// check object is variable or DOM elements
function isObjectVar(obj) {
    return ((typeof obj != "undefined") && (typeof obj === "object") && (obj.nodeType !== 1) && (typeof obj.ownerDocument !== "object"));

}

(function($) {
    // BEGIN: $.fcvScroll
    $.fn.fcvScroll = function(options) {
        var options = $.extend({
            selector: ".section", // selector
            delay: 50, // time delay (ms)
            duration: 400, // time duration (ms)
            reference: .9,
        }, options);

        if (options.selector) {
            var $wrapper = $(this),
                $offsetSelectors = [],
                $scrollDown = true,
                $scrollPos = $(window).scrollTop(),
                $scrollTimer = null;

            $wrapper.find(options.selector).each(function(i) {
                $offsetSelectors.push($(this).offset().top); // offsetY fined
            });

            $(window).scroll(function() {
                $scrollDown = $(window).scrollTop() >= $scrollPos;
                $scrollPos = $(window).scrollTop();

                clearTimeout($scrollTimer);

                if ($.inArray($(window).scrollTop(), $offsetSelectors) < 0) { // not in area fined
                    $scrollTimer = setTimeout(function() { // fcv-snap
                        var $scrollTop = $(window).scrollTop(),
                            $posY = $(window).height() * options.reference,
                            $position = 0,
                            $target;

                        if ($scrollDown) { // direction down
                            $position = $scrollTop + $posY - 1;
                            $wrapper.find(options.selector).each(function() {
                                var $offsetY = $(this).offset().top;
                                if (($offsetY > $scrollTop) && ($offsetY <= $position)) {
                                    $target = $(this);
                                    return false;
                                }
                            });
                        } else { // direction up
                            $position = $scrollTop - $posY + 1;
                            $wrapper.find(options.selector).each(function() {
                                var $offsetY = $(this).offset().top;
                                if (($offsetY < $scrollTop) && ($offsetY >= $position)) {
                                    $target = $(this);
                                    return false;
                                }
                            });
                        }

                        if ($target) {
                            $("html, body").stop().animate({
                                scrollTop: $target.offset().top
                            }, options.duration, function() {
                                clearTimeout($scrollTimer);
                            });
                        }
                    }, options.delay);
                }
            }).resize(function() {
                if ($(options.selector).hasClass("minHeight")) {
                    $(options.selector).css({
                        minHeight: $(window).height()
                    });
                } else {
                    $(options.selector).css({
                        height: $(window).height()
                    });
                }
            }).trigger("resize");
        } else console.error("Missing selector");

        return this;
    };
    // END: $.fcvScroll

    // END: $.toggle 
    $('.box-tg01').hide();
    $('.btn-tg01').click(function() {
        var active = $(this).attr("role");
        if ($(this).hasClass('close')) {
            $('.box-tg01').slideUp(500);
            $('.btn-tg01').removeClass('open').addClass('close');
            $(this).removeClass('close').addClass('open');
            $("#" + active).stop(1, 1).delay(100).slideDown(500);
        } else {
            $("#" + active).slideUp(500);
            $('.btn-tg01').removeClass('open').addClass('close');
        }
    });

    // END: $.toggle


})(jQuery);

// BEGIN: heightLine

// END: heightLine

(function() { // DOM loaded
    // facebook
    if (document.getElementById("fb-root")) {
        var fbScript = document.createElement("script"),
            fbScriptContent = "";

        fbScriptContent += '(function(d, s, id) {';
        fbScriptContent += 'var js, fjs = d.getElementsByTagName(s)[0];';
        fbScriptContent += 'if (d.getElementById(id)) return;';
        fbScriptContent += 'js = d.createElement(s);';
        fbScriptContent += 'js.id = id;';
        fbScriptContent += 'js.src = "https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.12";';
        fbScriptContent += 'fjs.parentNode.insertBefore(js, fjs);';
        fbScriptContent += '}(document, "script", "facebook-jssdk"));';

        fbScript.innerHTML = fbScriptContent;
        document.body.appendChild(fbScript);
    }

    // WOW js

})();

// conflicts
if (!Object.keys) {
    Object.keys = (function() {
        "use strict";
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            }).propertyIsEnumerable("toString"),
            dontEnums = [
                "toString",
                "toLocaleString",
                "valueOf",
                "hasOwnProperty",
                "isPrototypeOf",
                "propertyIsEnumerable",
                "constructor"
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
                throw new TypeError("Object.keys called on non-object");
            }

            var result = [],
                prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}


$(function() {

    $('body').removeClass('navOpen');
    $(".hamburger").click(function() {
        if ($('body').hasClass('navOpen')) {
            $('body').addClass('navClose');
            $('body').removeClass('navOpen');
            $('body').css('position', 'static');
            $(window).scrollTop(offsetY);
            $(".hamburger").removeClass('is-active');

        } else {
            $('body').addClass('navOpen');
            $('body').removeClass('navClose');

            offsetY = window.pageYOffset;
            $('body').css({
                position: 'fixed',
                width: '100%',
                'top': -offsetY + 'px'
            });

            $(".hamburger").addClass('is-active');
            return false;
        }
    });

    $(".close_btn,#menu_toggle a").click(function() {
        $('body').removeClass('navOpen');
        $('body').addClass('navClose');
        $(".hamburger").removeClass('is-active');
        $('body').css('position', 'static');
    });


    $(".type_a").click(function() {
        if ($("body").hasClass('mn_tyle_a')) {
            $("body").removeClass('mn_tyle_a');

        } else {
            $("body").addClass('mn_tyle_a');



        }
    });

});



function isHTML(str) {
    var a = document.createElement("div");
    a.innerHTML = str;
    for (var child = a.childNodes, i = child.length; i--;) {
        if (child[i].nodeType == 1) return true;
    }
    return false;
}

var checkDomain = function(url) {
    if (url.indexOf('//') === 0) url = location.protocol + url;
    return url.toLowerCase().replace(/([a-z])?:\/\//, "$1").split("/")[0];
};
var isExternal = function(url) {
    return ((url.indexOf(":") > -1 || url.indexOf("//") > -1) && checkDomain(location.href) !== checkDomain(url));
};

var Cookie = function() {};
Cookie.prototype.set = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
Cookie.prototype.get = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}