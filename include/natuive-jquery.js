function is_touch_device() {
    return !!('ontouchstart' in window);
}

/*! jQuery Retina Plugin - v1.0 - 3/25/2012
* https://github.com/tylercraft/jQuery-Retina
* Copyright (c) 2012 Tyler Craft; Licensed MIT, GPL */
(function(a) {
    a.fn.retina = function(b) {
        var c = {
            dataRetina: !0,
            suffix: "",
            checkIfImageExists: !1,
            customFileNameCallback: "",
            overridePixelRation: !1
        };
        b && jQuery.extend(c, b);
        var d=!1;
        if (c.overridePixelRation || window.devicePixelRatio >= 2)
            d=!0;
        return this.each(function() {
            var b = a(this);
            b.addClass("retina-off");
            if (!d)
                return !1;
            var e = "";
            c.dataRetina && b.attr("data-retina") && (e = b.attr("data-retina")), c.suffix && (e || (e = b.attr("src")));
            if (c.suffix) {
                var f = e.replace(/.[^.]+$/, ""), g = e.replace(/^.*\./, "");
                e = f + c.suffix + "." + g
            }
            c.customFileNameCallback && (e = c.customFileNameCallback(b)), c.checkIfImageExists && e ? a.ajax({
                url: e,
                type: "HEAD",
                success: function() {
                    b.attr("src", e), b.removeClass("retina-off"), b.addClass("retina-on")
                }
            }) : e && (b.attr("src", e), b.removeClass("retina-off"), b.addClass("retina-on"))
        })
    }
})(jQuery)
/* URI parameters */

function GetURLParameter( name, source ) // if 'source' is missing, get it from the URI.
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    if ( name.split('?')[1] ) {
        name = name.split('?')[1];
    }
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( source ? source : window.location.href );
    if ( results == null )
        return "";
    else
        return results[1];
}

function SetURLParameter( name, value, source ) // if 'source' is missing, get it from the URI.
{
    name = escape(name);
    value = escape(value);

    var s = source ? source : window.location.href;
    var kvp = name + "=" + value;

    if ( !GetURLParameter(name, s) ) {
        // fix the source in case it doesn't have a parameter
        s += ( ( ( s.indexOf('?') >= 0 ) ? '&' : '?' ) + name + '=0');
    }

    var r = new RegExp("(&|\\?)" + name + "=[^\&]*");

    s = s.replace(r, "$1" + kvp);

    if (!RegExp.$1) {
        s += (s.length > 0 ? '&' : '?') + kvp;
    }

    // Fix hash in URI

    return s;

}

function updateURLParameter(url, param, paramVal) {
    // return input string with updated/added URL parameter
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function getURLParameters () { // return all URL parameters in an array

	var res = {},
		re = /[?&]([^?&]+)=([^?&]+)/g;
	location.href.replace(re, function(_,k,v) {
		res[k] = v;
	});
	return res;

}

/* Prizes slider: Bind control event handlers */

var numberprizes = 0;
var prizeswidth = 0;

function picks(pick, tot) {
    var ary = new Array(tot);
    for (var i = 0; i < tot; i++) 
        ary[i] = i + 1;
    function randOrd() {
        return (Math.round(Math.random())-0.5);
    }
    ary.sort(randOrd);
    return ary.slice(0, pick);
}

function leftclick (event) {

    $('a.prizesleft').unbind();
    $(this).stop();
    $('a.prizesleft, a.prizesright').css('opacity', '0.7');
    var l = parseInt ( $('#prizes div a').css('left') );
    if (l) {
        // slide right
        $('#prizes div a').animate ( {
            'left': ( l + prizeswidth ) + 'px' 
        }, 200, function () {
            $('a.prizesleft').click ( leftclick );
        });
    } else {
        // bounce in place
        $('a.prizesleft').css('opacity', '0.3');
        $('#prizes div a').animate ( {
            'margin-left': '50px' 
        }, 200, function () {
            $('#prizes div a').animate ( {
                'margin-left': '0px' 
            }, 100, function () {
                $('a.prizesleft').click ( leftclick );
            });
        });
    }
}

function rightclick (event) {
    $('a.prizesright').unbind();
    $(this).stop();
    $('a.prizesleft, a.prizesright').css('opacity', '0.7');
    var l = parseInt ( $('#prizes div a').css('left') );
    if ( (l + $('#prizes div a').width()) > (prizeswidth) ) {
        // slide left
        $('#prizes div a').animate ( {
            'left': ( l - prizeswidth ) + 'px' 
        }, 200, function () {
            $('a.prizesright').click ( rightclick );
        });
    } else {
        // bounce in place
        $('a.prizesright').css('opacity', '0.3');
        $('#prizes div a').animate ( {
            'margin-left': '-50px' 
        }, 200, function () {
            $('#prizes div a').animate ( {
                'margin-left': '0' 
            }, 100, function () {
                $('a.prizesright').click ( rightclick );
            });
        });
    }
}

/* Tooltip */

var tip;

function hideTip (e) {
	
	if (!tip) return;
	tip.style.display = 'none';
	tip.style.opacity = 0;

}

function showTip (e) {

	var event = e || window.event;
	var target = event.target || event.srcElement;

	tip = target.querySelector('.tip');
	if (!tip) return; //  fix it not to log error in console
	
	tip.parentNode.parentNode.style.position = 'relative'; // dangerous with absolutely-positioned containers, which should be avoided anyway

	tip.style.top = (tip.parentNode.offsetTop + tip.parentNode.offsetHeight) + 'px';
			
	tip.style.opacity = 1;
	tip.style.display = 'block';
	
}

/* RID relay. Omit links starting with "javascript", "mailto" */

// get all URL parameters and relay them to all links on the page

function relay_parameters () {

    parameters = getURLParameters();

    $('a[href]:not(a[href^="javascript"]):not(a[href^="mailto"])').each( function () {

        for (var name in parameters) {
            var hash = $(this).attr('href').split('#')[1] ? ( '#' + $(this).attr('href').split('#')[1] ) : '';
            $(this).attr('href', updateURLParameter( $(this).attr('href').split('#')[0], name, parameters[name] ) + hash );

        }
    });

}

/* ███████████████████ After DOM is created ███████████████████ */

$(document).ready(function() {

    /* Click events for Concertina/Accordion */

    $('.concertina h3').click ( function () {
        // Concertina rule: The element between two h3 is the content of the first h3
        if ( $(this).next().css('display') == 'none' ) 
            $(this).next().show('fast');
        else
            $(this).next().hide('fast');
    });

    /* Prizes slider: Randomize prizes */

    $('body').append("<div id=\"dummy\"></div>");
    $('#dummy').hide();

    numberprizes = $('#prizes div a img').length;

    var positions = new Array( numberprizes );
    positions = picks(numberprizes, numberprizes);

    $('#prizes div a').children('img').each ( function (n) {
        $('#dummy').append( $(this).parent().children('img:nth-child(' + (positions[n]) + ')').clone() );
    });

    $('#prizes div a').html('');

    $('#dummy').children('img').each ( function (n) {
        $(this).appendTo('#prizes div a');
    });

    $('#dummy').html('');

    $('#prizes div a').css ( 'width', ((numberprizes + 1) * 103) + 'px' )
    prizeswidth = $('#prizes div').width();

    /* Prizes slider: Bind control event handlers */

    $('a.prizesleft').click ( leftclick );
    $('a.prizesright').click ( rightclick );

    /* Relay URI parameters to links */

    relay_parameters();

    /* Modal window: open a link inside it */

    function add_blackbox () {

        $('#blackbox').prepend('<div class="close"> ← ' + document.title +  '</div>');
        $('#blackbox .close').click( close_blackbox );
        relay_parameters();
    }

    function close_blackbox () {
        $('html').css('background-color', '#fff');
        $('#blackbox').remove();
		document.body.style.overflow = 'auto';
    }

    $('a.modal-link, a.lightbox').click ( function () {

		document.body.style.overflow = 'hidden';

        $('body').prepend('<div id="blackbox"> <div class="modal-box"> </div> </div>');

        $('html').css('background-color', '#333');

        $('#blackbox').click( close_blackbox );

        $('html').click( close_blackbox );

        $('#blackbox .close').click( function (e) {
            e.stopPropagation();
        });

        if ( $(this).hasClass('lightbox') ) {
            // Show an image lightbox...
            var image_url = $(this).attr('href');
            add_blackbox();
            $('#blackbox').prepend('<img src="' + image_url + '" alt="Lightbox">' );

        } else // ... or load external content in a modal window 
        {

            $('#blackbox .modal-box').load (
            ( ($(this).attr('href').split('#')[1] ) ? ($(this).attr('href').split('#')[0] + ' #' + $(this).attr('href').split('#')[1]) : ( $(this).attr('href') ) ), add_blackbox );

        }

        return false;
    });

    /* Tooltip */

    $('.tool').click ( showTip );

    if (!is_touch_device()) 
        $('.tool').hover ( showTip, hideTip );

    $('.tool').on('touchmove', hideTip);

    /* Retina images replacement */

    $('img.retina').retina({
        suffix: "@2x"
    });

    /* Add 'Back to top' button */

    $('body').append('<a class="backtotop"> ⬆ </a>');
    $('.backtotop').click ( function () {
        $('body,html').animate( {
            scrollTop: 0 
        }, 400 );
    });

    /* Tables: Embed in a scrollable container */

    $('table').before('<div class="table-container"></div>');
    $('.table-container').each ( function () {
        $(this).append( $(this).next() );
    });

    /* Hide Mobile Safari head */

    if ( is_touch_device() ) {

        // Set a timeout...
        setTimeout(function() {
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);
    }

    // Activate date picker
    /*
    	$( '[type=date], .datepicker' ).pickadate({
    		formatSubmit: 'yyyy/mm/dd'
    	})
    */

    $('textarea').keyup ( function () {
        textArea = this;
        while (
        textArea.rows > 1 &&
        textArea.scrollHeight < textArea.offsetHeight
        )
        {
            textArea.rows--
        }

        while (textArea.scrollHeight > textArea.offsetHeight)
        {
            textArea.rows++ 
        }
        textArea.rows++

    });

/* Form validation */

	$('form').each( function (i) {
		el = this;
		el.onsubmit = function () {
			ready_to_submit = true;

			elements = el.querySelectorAll('.mandatory');
			Array.prototype.forEach.call(elements, function (el, i) {
				
				if (!el.querySelector('input, select, textarea').value) { 

					ready_to_submit = false;
					$(el).addClass('alert');

				} else {
					
					$(el).removeClass('alert');
					
				}

			});

			return ready_to_submit;
			
		};
		
	});

});

/* ███████████████████ After everything is loaded, including images ███████████████████ */

$(window).load(function() {
});

