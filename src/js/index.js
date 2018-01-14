// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    $("breathing-button").on("mousein", function() {
        window.location.hash="tatkra";
    })
    $(".toolbar").hide()
    $(".rightHandle").hide()
    $(".leftHandle").hide()

    setTimeout(function() {
        var ang = window.location.hash.match(/\d{1,4}$/);
        if(ang && ang.length) {
            ang--;
            if(ang > 1430) {
                window.location.hash = "ang/" + 1430
            }
            if(ang < 0) {
                window.location.hash = "ang/" + 1
            }
        } else {
            window.location.hash = "ang/" + 1
        }

        if(ang < 1430 && ang >= 0) {
            window.angNo = ang;

            var _angData = data[window.angNo];
            var _baani = _angData.baani
            // baani_container
            let center = $(".list-group-center-on-next").length?$(".list-group-center-on-next"):$(".list-group-center-on-prev")
            ladivaarGenerator(_baani, center, false)
            // $(".title").html("ਅੰਗ - " + (window.angNo + 1) + "/1430")
            
            // $("#angNo").html("ਅੰਗ - " + (window.angNo + 1) + "/1430")    
        } else {
            $(".guru_granth_sahib_baani").hide();
        }

    }, 600)

    var _changeInterval = null;
    var mouseout = true;
    $('body, tatkra').on("mousemove",function() {
        // wait untill user type in something
        // Don't let call setInterval - clear it, user is still typing
        clearInterval(_changeInterval)
        if(mouseout) {
            _changeInterval = setInterval(function() {
                // Typing finished, now you can Do whatever after 2 sec
                clearInterval(_changeInterval)
                $(".toolbar").hide()
            }, 2000);
            $(".toolbar").show()
        }
    })
    
    $(".flex-container").on("click", function() {
        $(".tatkra").removeClass("tatkra_hover")
    })

    $(".tatkra").on("mouseleave", function() {
        console.log("outttttt ta")
        $(".tatkra").removeClass("tatkra_hover")
    })

    // $('.guru_granth_sahib_baani').on("mousemove",function() {
    //     $(".tatkra").removeClass("tatkra_hover")
    //     window.location.hash = "ang/" + (window.angNo+1);
    // });
    
    $(".toolbar").on("mouseenter mouseup hover", function() {
        mouseout = false;
    })

    $(".toolbar").on("mouseout", function() {
        mouseout = true;
    })

    $(".homeButton").on("click", function() {
        $(".tatkra").removeClass("tatkra_hover")
    })

    $(".tatkraButton").on("click", function() {
        $(".tatkra").toggleClass("tatkra_hover")
    })

    $(".goToAngButton").on("click", function() {
        var _ang = parseInt($(".angNoInput").val());
        if (!isNaN(_ang) && _ang > 0 && _ang <= 1430) {
            window.location.hash = "ang/" + _ang
        }
        $(".angNoInput").val("")
    })
    
    $(".leftHandle").on("click", function() {
        if(window.angNo - 1 >= 0) {
            // dont confuse with swipe right - swipe to right means
            // move prev
            swipeRight();
        }
    })

    $(".rightHandle").on("click", function() {
        if(window.angNo + 1 < 1430) {
            // dont confuse with swipe left - swipe to left means
            // move next
            swipeLeft()
        }
    })

    $(window).on('hashchange load', function() {
        // console.log("haschange", window.location.hash)
        var ang = window.location.hash.match(/\d{1,4}$/);
        if(ang && ang.length) {
            ang--;
            if(ang > 1430) {
                window.location.hash = "ang/" + 1430
            }
            if(ang < 0) {
                window.location.hash = "ang/" + 1
            }
        } else {
            window.location.hash = "ang/" + 1
        }

        if(ang < 1430 && ang >= 0) {
            // hack
            $(".nitnem_listX").css("display", "none");
            if (window.location.hash == "") {
                $(".tatkra").removeClass("tatkra_hover")
                $(".guru_granth_sahib_baani").hide();
                $(".rightHandle").hide();
                $(".leftHandle").hide();
            } else if (window.location.hash == "#tatkra") {
                $(".tatkra").addClass("tatkra_hover")
                // $(".guru_granth_sahib_baani").hide();
                // $(".rightHandle").hide();
                // $(".leftHandle").hide();
            } else if (window.location.hash.match(/\d{1,4}$/)) {
                $(".tatkra").removeClass("tatkra_hover")
                $(".guru_granth_sahib_baani").show();
                $(".rightHandle").show()
                $(".leftHandle").show()

                window.angNo = ang;
                var _angData = data[window.angNo];
                var _baani = _angData.baani
                    // baani_container
                let center = $(".list-group-center-on-next").length?$(".list-group-center-on-next"):$(".list-group-center-on-prev")
                ladivaarGenerator(_baani, center, false);
                $(".nitnem_listX").show();
            }
        }
    });

    function ladivaarGenerator(baani, element, singleNumber) {
        $('h1 span').unbind("mouseover");
        $('h1 span').unbind("mouseout");
        $('p span').unbind("mouseover");
        $('p span').unbind("mouseout");
    
        // baani_container
        var _htmlString = "";
        var _paragraphStringHTMLArr = [];
        if (baani) {
            for (var i = 0; i < baani.length; i++) {
                var _paragraphsStr = null;
                if (singleNumber) {
                    _paragraphsStr = baani[i].baani_content.replace(/([੦-੯]+॥){1,}/g, function($0) {
                        return $0 + "\n"
                    })
                } else {
                    _paragraphsStr = baani[i].baani_content.replace(/([੦-੯]+॥){2,}/g, function($0) {
                        return $0 + ""
                    })
                }

                var _paragraphsArr = _paragraphsStr.trim().split(/\n/);
                if (_paragraphsArr && _paragraphsArr.length) {
                    for (var paragraph = 0; paragraph < _paragraphsArr.length; paragraph++) {
                        var _wordsArr = _paragraphsArr[paragraph].split(/\s+/g);
                        if (_wordsArr.length) {
                            if (baani[i].bold) {
                                _paragraphStringHTMLArr.push("<h1 class='text-center'><span>" + _wordsArr.join("</span><span>") + "</span></h1>")
                            } else {
                                _paragraphStringHTMLArr.push("<p class='text-center'><span>" + _wordsArr.join("</span><span>") + "</span></p>")
                            }
                        }
                    }
                } else {
                    console.log("Error", baani[i].baani_content)
                    var _wordsArr = baani[i].baani_content.split(/\s+/g);
                    if (_wordsArr.length) {
                        _paragraphStringHTMLArr.push("<p class='text-center'><span>" + _wordsArr.join("</span><span>") + "</span></p>")
                    }
                }
            }

            _htmlString = "<div class='angContainer'><div class='baaniFormatting'>" + _paragraphStringHTMLArr.join("</div><div class='baaniFormatting'>") + "</div></div>"
            // console.log(_htmlString)
            $(element).html(_htmlString)
            setTimeout(function() {
                $(element).scrollTop(0);
            }, 1000)
    
            // $("[data-attr='homeList']").hide();
            // $("[data-attr='tatkra']").hide()
            // $("[data-attr='srigurugranthsahib_ang']").show()
    
            $('h1 span').mouseover(function() {
                $(this).addClass('highlightH1')
            });
            $('h1 span').mouseout(function() {
                $(this).removeClass('highlightH1')
            });
            $('p span').mouseover(function() {
                $(this).addClass('highlightP')
            });
            $('p span').mouseout(function() {
                $(this).removeClass('highlightP')
            });
        }
    }
    
    var resim = $(".swipe-gesture");
    resim.hammer().on("swipeleft", swipeLeft);

    resim.hammer().on("swiperight", swipeRight);

    function swipeLeft(ev) {
        var center = $(".list-group-center-on-next").length?$(".list-group-center-on-next"):$(".list-group-center-on-prev")
        var left = $(".list-group-left-on-next").length?$(".list-group-left-on-next"):$(".list-group-left-on-prev")
        var right = $(".list-group-right-on-next").length?$(".list-group-right-on-next"):$(".list-group-right-on-prev")

        $(right).html("")
        $(center).removeClass("list-group-center-on-next list-group-center-on-prev").addClass("list-group-left-on-next")
        $(left).removeClass("list-group-left-on-next list-group-left-on-prev").addClass("list-group-right-on-next")
        $(right).removeClass("list-group-right-on-next list-group-right-on-prev").addClass("list-group-center-on-next")

        setTimeout(function() {
            window.angNo++;
            window.location.hash="ang/" + (window.angNo + 1)
            // $(".title").html("ਅੰਗ - " + (window.angNo + 1) + "/1430")
            
            // $("#angNo").html("ਅੰਗ - " + (window.angNo + 1) + "/1430")
        }, 600)
    }

    function swipeRight(ev) {
        var center = $(".list-group-center-on-next").length?$(".list-group-center-on-next"):$(".list-group-center-on-prev")
        var left = $(".list-group-left-on-next").length?$(".list-group-left-on-next"):$(".list-group-left-on-prev")
        var right = $(".list-group-right-on-next").length?$(".list-group-right-on-next"):$(".list-group-right-on-prev")

        $(left).html("")
        $(center).removeClass("list-group-center-on-prev list-group-center-on-next").addClass("list-group-right-on-prev")
        $(left).removeClass("list-group-left-on-prev list-group-left-on-next").addClass("list-group-center-on-prev")
        $(right).removeClass("list-group-right-on-prev list-group-right-on-next").addClass("list-group-left-on-prev")

        setTimeout(function() {
            window.angNo--;
            window.location.hash="ang/" + (window.angNo + 1)
        }, 600)
    }
});