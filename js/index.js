$(function() {
	initTag();
	showAppInfo();
	addHeaderTagLogic();
	addArrowLogic();
});

$(window).bind("load", function() {

	// FastClick.attach(document.body);

	// var ts1 = new HJ_TouchScroll("header ul", "header");
	// ts1.setBoundary(true);

	hmu.overSlide($("header ul"));

});
function showAppInfo() {
	judgeType();
	$(".app").addClass("hidden");
	$(".app").eq(g_down_type).removeClass("hidden");
}

function addHeaderTagLogic() {
	
	$("header a").bind("click", function() {
		$("header li").removeClass("active");
		$(this).parent().addClass("active");
		var idx = $(this).parent().index();
		
		g_down_type = idx;
		showAppInfo();

	});
}
function addArrowLogic() {
	$(".next").click(function() {
		g_down_type += 1;
		changeTag();
		showAppInfo();
	});
	$(".prev").click(function() {
		g_down_type -= 1;
		changeTag();
		showAppInfo();
	});



}
function judgeType() {
	var total = 5;
	if (g_down_type > 0) {
		g_down_type = g_down_type % total;
	} else if (g_down_type < 0) {
		g_down_type += total;
	};
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initTag() {
	var t = (typeof(g_down_type)==="undefined") ? getParameterByName("t") : g_down_type;
	if ((typeof(t) === "undefined") || ($.trim(t) === "") ) {
		t = "0";
	} else if ( t === "0") {
		hideHeader();
	} else if ( t === "1") {
		hideHeader();
	} else if ( t === "2") {
		hideHeader();
	} else if ( t === "3") {
		hideHeader();
	} else if ( t === "4") {
		hideHeader();
	}
	window.g_down_type = parseInt(t);
}
function changeTag() {
	judgeType();
	$("header li").removeClass("active");
	$("header li").eq(g_down_type).addClass("active");
}
function hideHeader() {
	$("header").hide();
}













/**
 * Description: Horizontal Scroll Menu
 * @author Bob
 * @date 2014.08.14
 * @param jq_sel_scroller(*) :  scroll dom selector like: #id , .someclassname ,etc
 * @param jq_sel_listener([])	: scroll event listener . 
 */
function HJ_TouchScroll(jq_sel_scroller, jq_sel_listener ) {
	this.boundary = false;
	
	this.jq_scroller  = $(jq_sel_scroller);
	this.jq_listener  = $(jq_sel_listener);

	if ((typeof(jq_sel_listener) === "undefined") || ($.trim(jq_sel_listener) === "")) {
		this.jq_listener = this.jq_scroller;
	};
	
	
	this.touch_begin_x = 0;
	this.trans_x_old = 0;
	this.trans_x_new = 0;
	this.__init();

	return this;
}
HJ_TouchScroll.prototype.__init = function() {
	var pointer = this;
	var jq_listener = pointer.jq_listener;
	var jq_scroller = pointer.jq_scroller;
	jq_listener.bind("touchstart", function(e) {
		e.preventDefault();
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		// console.log(touch.pageY+' '+touch.pageX);
		pointer.touch_begin_x = touch.pageX;
		var oldScrollLeft = jq_scroller.css("-webkit-transform").split(",")[4];
		oldScrollLeft = (typeof(oldScrollLeft) === "undefined") ? 0 : oldScrollLeft;
		pointer.trans_x_old = oldScrollLeft;
		

	});
	jq_listener.bind("touchmove", function(e) {
		e.preventDefault();
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		//console.log(touch.pageY+' '+touch.pageX);
		var move_offset = pointer.touch_begin_x - touch.pageX;
		pointer.trans_x_new = pointer.trans_x_old - move_offset;
		pointer.__translate3d(jq_scroller, pointer.trans_x_new);
	});
	jq_listener.bind("touchend", function(e) {
		e.preventDefault();
		// var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		// console.log(touch.pageY+' '+touch.pageX);
		if (pointer.boundary) {
			//intelligence adjust
			var oldScrollLeft = jq_scroller.css("-webkit-transform").split(",")[4];
			oldScrollLeft = (typeof(oldScrollLeft) === "undefined") ? 0 : oldScrollLeft;
			if (oldScrollLeft > 0) {
				pointer.trans_x_new = 0;
				pointer.__translate3d(jq_scroller, pointer.trans_x_new);
			};

			var item_num = jq_scroller.children().size();
			var last_child_width = jq_scroller.children().last().width();
			var last_child_margin_l = parseInt(jq_scroller.children().last().css("margin-left"));
			var last_child_margin_r = parseInt(jq_scroller.children().last().css("margin-right"));
			var last_child_padding_l = parseInt(jq_scroller.children().last().css("padding-left"));
			var last_child_padding_r = parseInt(jq_scroller.children().last().css("padding-right"));
			var parent_width = jq_scroller.parent().width();
			var last_child_line =  parent_width - item_num * (last_child_width + last_child_margin_l + last_child_margin_r + last_child_padding_l + last_child_padding_r);

			if (oldScrollLeft < last_child_line) {
				pointer.trans_x_new = last_child_line;
				pointer.__translate3d(jq_scroller, pointer.trans_x_new);
			};
		};

	});
}
HJ_TouchScroll.prototype.__translate3d = function(jq_obj,x) {
    jq_obj.css({
        '-webkit-transform':'translate3d('+ x +'px,0,0)',
        '-moz-transform':'translate3d('+ x +'px,0,0)',
        'transform':'translate3d('+ x +'px,0,0)'
    });
}

HJ_TouchScroll.prototype.setBoundary = function(b) {
	this.boundary = b;
}
