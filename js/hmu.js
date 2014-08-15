var hmu = {
    jsonUrl : '/handler/appweb.json',
    para: {
        //获取社团全部帖子列表
        topic_list:{
            op: 'getTopicList',
            leagueID: 0,
            boardID : 0,
            page : 1,
            pageSize : 10,
            flip: true
        },
        topic_list_b:{
            op: 'getTopicList',
            leagueID: 0,
            boardID : 0,
            page : 1,
            pageSize: 10,
            flip: true
        },
        //获取期刊列表
        mag_list:{
            op: 'getSubMagazineListByLeagueID',
            leagueID: 0,
            page: 1,
            pageSize: 10,
            flip: true
        },
        //获取社团列表
        league_list:{
            op: 'getLangueList',
            cateID: 0,
            page: 1,
            pageSize: 10,
            flip: true
        },
        //获取我发的帖子列表
        mytopic_list:{
            op: 'getMySend',
            page: 1,
            pageSize: 10,
            flip: true
        },
        //获取回复我的帖子列表
        re_mytopic_list:{
            op: 'getMyTopic',
            page: 1,
            pageSize: 10,
            flip: true
        },
        //获取活动帖子列表
        act_list:{
            op: 'getActivityList',
            leagueID: 0,
            page: 1,
            pageSize: 10,
            flip: true
        },
        //获取贴子回复列表
        get_reply:{
            op: 'getGetReplyList',
            topicID: 0,
            orderType: 0,
            page: 1,
            pageSize: 10,
            flip: true
        }
    },
    cfg:{
        scrolled: false,
    },
    modalHtml:[
        {
            html:   '<div class="pop-out">'+
                        '<div class="pop-cont black"><i class="icon-correct"></i>您已成功加入社团'+
                        '</div>'+
                    '</div>'
        },
        {
            html:   '<div class="pop-out">'+
                        '<div class="pop-cont black">等待审核通过...'+
                        '</div>'+
                    '</div>'
        },
        {
            html:   '<div class="pop-out">'+
                        '<div class="pop-cont">'+
                            '<p class="lead">加入社团才可以参与讨论哦</p>'+
                            '<div class="func cf">'+
                                '<div class="col-5"><a href="javascript:;" onclick="hmu.closeModal();">取消</a></div>'+
                                '<div class="col-5"><a href="javascript:;" onclick="topic.click.OpenLeague();">申请入社</a></div>' +
                            '</div>'+
                        '</div>'+
                    '</div>'
        },
        //申请社团
        {
            html:   '<div class="pop-out">'+
                        '<div class="pop-cont">'+
                            '<div class="pop-reply-cont cf">'+
                                '<textarea placeholder="填写加入社团的理由"></textarea>'+
                            '</div>'+
                            '<div class="pop-reply fr cf">'+
                                '<a href="javascript:;" onclick="hmu.closeModal();" class="btn btn-default">取消</a>'+
                                '<a href="javascript:;" class="btn btn-green" onclick="topic.SendLeagueInfo(this)">申请</a>' +
                            '</div>'+
                        '</div>'+
                    '</div>'
        },
        //一级回复
        {
            html: '<div class="pop-out">' +
                        '<div class="pop-cont">' +
                            '<div class="pop-reply-cont cf">' +
                                '<textarea></textarea><input id="hid_entryID" type="hidden" value="0" />' +
                            '</div>' +
                            '<div class="pop-reply fr cf">' +
                                '<a href="javascript:;" onclick="hmu.closeModal();" class="btn btn-default">取消</a>' +
                                '<a href="javascript:;" class="btn btn-green" onclick="topic.SendPostInfo(this)">回复</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        },
        //二级回复
        {
            html: '<div class="pop-out">' +
                        '<div class="pop-cont">' +
                            '<div class="pop-reply-cont cf">' +
                                '<textarea></textarea><input id="hid_entryID" type="hidden" value="0" />' +
                            '</div>' +
                            '<div class="pop-reply fr cf">' +
                                '<a href="javascript:;" onclick="hmu.closeModal();" class="btn btn-default">取消</a>' +
                                '<a href="javascript:;" class="btn btn-green" onclick="topic.SendReplyInfo(this)">回复</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        },
        //退出
        {
            html:   '<div class="pop-out">'+
                        '<div class="pop-cont">'+
                            '<p class="lead">亲，你确定要退出吗</p>'+
                            '<div class="func cf">'+
                                '<div class="col-5"><a href="javascript:;" onclick="hmu.closeModal();">取消</a></div>'+
                                '<div class="col-5"><a href="javascript:;" onclick="league.btnQuitLeague();">确定</a></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
        }
    ],
    dotHtml:function(tmpl,data){
        //require dot.js to output html
        _html = $(tmpl).html();
        var tpl = doT.template(_html);
        var html = tpl(data);
        return html;
    },
    ajaxData:function(url, parameter, callback, ajaxType){
        // for cache
        // url = url + '?v=' + Math.random();
        $.ajax({
            type: 'GET' || ajaxType,
            url: url,
            dataType: 'jsonp',
            data:parameter,
            jsonp: 'callback',
            success:function(data){
                if(callback == null){
                    return;
                }
                callback(data);
            },
            error:function(error){
                console.log(error);
            }
        })
    },
    postData: function (url, method, parameter, callback, ajaxType) {
        url = url + '/' + method;
        if (parameter != null) {
            parameter = JSON.stringify(parameter);
        }
        $.ajax({
            type: "POST",
            url: url,
            async: true,
            contentType: "application/json",
            dataType: "json",
            json: "callback",
            data: parameter,
            success: function (data) {
                if (callback == null) {
                    return;
                }
                callback(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    },
    getQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    commonHtml:function(url,para,tmpl,target,callback){
        hmu.ajaxData(url, para, function(data){
            if(data.ret > 0){
                if(data.count == 0){
                    $(target).html('<div class="zero">暂无数据</div>')
                }else{
                    var html = hmu.dotHtml(tmpl, data.data);
                    $(target).html(html);
                    if(callback!=null){
                        callback();
                    }
                }
            }
        });
    },
    sec2time: function(seconds){
        var h = Math.floor(seconds / 3600),
            m = Math.floor(seconds % 3600 / 60),
            s = Math.ceil(seconds % 3600 % 60);
        h = h < 10 ? '0' + h : h.toString();
        m = m < 10 ? '0' + m : m.toString();
        s = s < 10 ? '0' + s : s.toString();
        return [h,m,s];
    },
    time2sec: function(h,m,s){
        var s1 = parseInt(h,10) * 60 * 60,
            s2 = parseInt(m,10) * 60,
            s3 = parseInt(s,10);
        return s1 + s2 + s3;
    },
    modal:function(id){
        //弹窗,固定从modalhtml中取html;
        $('body').append('<div class="pop-bg"></div>');
        $('.pop-bg').addClass('fadeIn');
        if(this.modalHtml[id]){
            var pop = this.modalHtml[id].html,
                timeout = 0;
            $('body').append(pop);

            var h = $('.pop-out').height();
            // $('.pop-out').css('margin-top',-h/2 - 40)
            $('.pop-out').css('top','80px')
                         .addClass('fadeInDown');

            $('.pop-bg').on('click',function (event){
                hmu.closeModal();
                event.stopPropagation();
            });
        }
    },
    closeModal:function(){
        $('.pop-out,.pop-bg').remove();
    },
    touchList:{
        old_x: 0,
        new_x: 0,
    },
    overSlide:function(obj){
        $(obj).each(function(){
            var $this = $(this),
                $child = $this.children(),
                real_width = 0,
                padding =42,
                win_width = $(window).width();

            $.each($child,function(){
                var w = $(this).width();
                real_width += (w+padding);
            });

            // $this.css({
            //     'width' : real_width
            // });

            // check if need check
            if(real_width > win_width){
                hmu.overSlideEvent($this,real_width,win_width);
            }
        });
    },
    overSlideEvent:function(obj,w1,w2){
        var $this = $(obj),
            $parent = $this.parent(),
            t1, t2;
        $parent.on('touchstart', function (e){
            // clearTimeout(t1,t2);
            var offset = $this.offset().left;
            
            hmu.touchList.old_x = event.touches[0].pageX - offset;
        });
        $parent.on('touchmove', function (e){
            // event.preventDefault();
            $this.css({
                '-webkit-transition' : '0s',
                '-moz-transition' : '0s',
                'transition' : '0s'
            });
            hmu.touchList.new_x = event.touches[0].pageX;
            var node = hmu.touchList,
                offset = $this.offset().left,
                diff = node.new_x - node.old_x;
            // distance = diff * (100 - Math.abs(diff))/100;
            // $('.league-head .title').html(diff);
            _translate3d($this,diff);
            $(document).on('touchmove',hmu.preventScroll);
        });

        $parent.on('touchend', function (event){
            // event.preventDefault();
            $this.css({
                '-webkit-transition' : '0.3s',
                '-moz-transition' : '0.3s',
                'transition' : '0.3s'
            });
            var offset = $this.offset().left;
            
            if(offset > 0){
                setTimeout(function(){
                    _translate3d($this,0);
                },100);
            }
            if(offset < w2 - w1){
                setTimeout(function(){
                    _translate3d($this,w2-w1);
                },100);
            }
            $(document).off('touchmove',hmu.preventScroll);
        });
        function _translate3d(obj,x){
            $(obj).css({
                '-webkit-transform':'translate3d('+ x +'px,0,0)',
                '-moz-transform':'translate3d('+ x +'px,0,0)',
                'transform':'translate3d('+ x +'px,0,0)'
            });
        }
    },
    touchColor:function(obj){
        var canTouch = 'ontouchstart' in window,
            tap      = canTouch ? 'tap'         : 'click',
            eStart   = canTouch ? 'touchstart'  : 'mousedown',
            eMove    = canTouch ? 'touchmove'   : 'mousemove',
            eEnd     = canTouch ? 'touchend'    : 'mouseup',
            xy       = {x:0,y:0},
            on       = 'touchlight';

        $(obj).live('click',function (event){
            var link = $(this).attr('data-link');
            event.stopPropagation();
            var target1 = $(event.target).parents('.row-4').length,
                target2 = $(event.target).parents('.replylist').length;
            if(event.target !== 'a' && target1 < 1 && target2 < 1){
                window.location.href = link;
            }
        });
        $(obj).live(eStart,function (event){
            add_on(this,on);
        });
        $(obj).live(eEnd,function (event){
            remove_on(this,on);
        });
        $(obj).live(eMove,function (event){
            remove_on(this,on);
        });
        function remove_on(obj,c){
            $(obj).removeClass(c);
        }
        function add_on(obj,c){
            $(obj).addClass(c);
        }
    },
    tapToUrl:function(obj){
        var canTouch = 'ontouchstart' in window,
            tap      = canTouch ? 'tap' : 'click';
        $(obj).live('click', function (event){
            var link = $(this).attr('data-link');
            if(event.target !== 'a'){
                window.location.href = link;
            }
        });
    },
    tab:function(obj,target){
        $(obj).bind('click', function (event){
            var $this = $(this),
                $target = $(target),
                $source = $this.find("a"),
                typeid =parseInt($source.attr("data-tid")),
                boardid = parseInt($source.attr("data-id")),
                leagueid = $("#hid_LeagueID").val();

            $this.addClass('active').siblings().removeClass('active');
            
            if (typeid == 3) {//全部类别
                _op_class($target, 0);
                //topic.getTopicAllList(leagueID, 1, 20);
                if($.trim($('#target_topiclistall').html()) == ''){
                    hmu.fillData(topic.getUrl,hmu.para.topic_list,'#j-uc-topic-list','#target_topiclistall');
                }
                hmu.cfg.scrolled = true;
                hmu.scrollMore('#t_alllist .l_more',function(){
                    hmu.fillData(topic.getUrl,hmu.para.topic_list,'#j-uc-topic-list','#target_topiclistall');
                });
            } else if (typeid == 1) {//社团活动
                _op_class($target, 1);
                if($.trim($('#target_activityList').html()) == ''){
                    hmu.fillData(topic.getUrl,hmu.para.act_list,'#j-uc-activity-list','#target_activityList');
                }
                hmu.cfg.scrolled = true;
                hmu.scrollMore('#t_maglist .l_more',function(){
                    hmu.fillData(topic.getUrl,hmu.para.act_list,'#j-uc-activity-list','#target_activityList');
                });
            } else if (typeid == 2) {//精品社刊
                _op_class($target, 2);
                if($.trim($('#target_SubMagazineList').html()) == ''){
                   hmu.commonHtml(topic.getUrl,hmu.para.mag_list,'#j-uc-submagazine-list','#target_SubMagazineList');
                }
            } else if (typeid == 0) {//普通类别
                _op_class($target, 3);
                hmu.para.topic_list_b.boardID = boardid;
                hmu.para.topic_list_b.page = 1;
                hmu.para.topic_list_b.flip = true;
                $('#target_topiclist').html('');
                hmu.fillData(topic.getUrl,hmu.para.topic_list_b,'#j-uc-topic-list','#target_topiclist');
                hmu.scrollMore('#t_topiclist .l_more',function(){
                    hmu.fillData(topic.getUrl,hmu.para.topic_list_b,'#j-uc-topic-list','#target_topiclist');
                });
            }
            hmu.checkFoot();
        });
        function _op_class($obj, id){
            $obj.eq(id).show().addClass('on').siblings().hide().removeClass('on');
        }
    },
    scrollMore:function(target,callback){
        var win_h = $(window).height(),
            active_height = 0,
            $parent = $(target).closest('.panel');
        $(window).scroll(function(){
            if($parent.hasClass('on')){
                var win_offset = $(window).scrollTop(),
                    offset = $(target).offset().top,
                    h = win_offset + win_h - active_height;
                if(h > offset && hmu.cfg.scrolled){
                    hmu.cfg.scrolled = false;
                    //$.trim($(target).html()) !== ''
                    if(callback != undefined){
                        callback();
                    }
                }
            }
        });
    },
    fillData:function(url,para,templateid,targetid){
        var $parent = $(targetid).parent();
        //flip is check if need ajaxData;
        if(para.flip){
            hmu.ajaxData(url, para, function(data){
                if(data.ret > 0){
                    if(data.count == 0){
                        if(targetid == '#replylist'){
                            $(targetid).html('<div class="zero">暂无回复</div>')
                        }else{
                            $(targetid).html('<div class="zero">暂无数据</div>')
                        }
                        _remove_more();
                        hmu.checkFoot();
                    }else if(data.count == 1 && para.page == 1){
                        var html = hmu.dotHtml(templateid,data.data);
                        $(targetid).html(html);
                        if($(html).find('.overslide').length > 0){
                            hmu.overSlide('.overslide');
                        }
                        _remove_more();
                        hmu.checkFoot();
                    }else if(para.page <= data.count){
                        var html = hmu.dotHtml(templateid,data.data);
                        $(targetid).append(html);
                        if($(html).find('.overslide').length > 0){
                            hmu.overSlide('.overslide');
                        }
                        para.page ++;
                        hmu.checkFoot();
                    }else{
                        $parent.find('.l_more').text('没有更多了');
                        _remove_more();
                        hmu.checkFoot();
                    }
                    hmu.cfg.scrolled = true;
                }
            });
        }
        function _remove_more(){
            $parent.find('.l_more').addClass('fadeOut');
            setTimeout(function(){
                $parent.find('.l_more').hide();
            },800);
            para.flip = false;
        }
    },
    common_tab:function(obj,target){
        $(obj).on('click', function (event){
            var $this = $(this),
                index = $this.index(),
                $target = $(target);
            $this.addClass('active').siblings().removeClass('active');
            $target.eq(index).show().addClass('on').siblings().hide().removeClass('on');

            if (index == 0) {

                if ($.trim($('#target_myTopic').html()) == '') {
                    hmu.fillData(topic.getUrl, hmu.para.mytopic_list, '#j-uc-mytopic-list', '#target_myTopic');
                }
                hmu.cfg.scrolled = true;
                hmu.scrollMore('#t_myTopic .l_more', function () {
                    hmu.fillData(topic.getUrl, hmu.para.mytopic_list, '#j-uc-mytopic-list', '#target_myTopic');
                });
            } else if (index == 1) {
                if ($.trim($('#target_replyMy').html()) == '') {
                    hmu.fillData(topic.getUrl, hmu.para.re_mytopic_list, '#j-uc-replymytopic-list', '#target_replyMy');
                }
                hmu.cfg.scrolled = true;
                hmu.scrollMore('#replyMeList .l_more', function () {
                    hmu.fillData(topic.getUrl, hmu.para.re_mytopic_list, '#j-uc-replymytopic-list', '#target_replyMy');
                });
            }
            hmu.checkFoot();
        });
    },
    RetDateTime: function (objtimes) {//时间处理方法
        var times = objtimes;
        if (times == null || times == '')
            return "刚刚";
        var nowTime = $('#hddTime').val();
        times = times.replace("T", " ").replace(/\-/g, "/");
        if (times.indexOf(".") > 0)
            times = times.substring(0, times.indexOf("."));
        nowTime = nowTime.replace("T", " ");
        var oldTime = new Date(times).getTime();
        if (isNaN(oldTime)) 
            oldTime = new Date(objtimes).getTime();
        if (oldTime <= 0)
            return "刚刚";
        var now = new Date(nowTime).getTime();
        var ts = now - oldTime;
        ts = Math.abs(ts);
        if (ts < 2)
            return "1秒前";
        var seconds = 1000;
        var minute = seconds * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var strSeconds = parseInt(ts / seconds);
        var strMinute = parseInt(ts / minute);
        var strHour = parseInt(ts / hour);
        var strDay = parseInt(ts / day);
        if (strSeconds < 50)
            return (strSeconds + 7) + "秒前";
        else if (strMinute < 60)
            return (strMinute + 1) + "分钟前";
        else if (strMinute > 60 && strHour <= 24)
            return strHour + "小时前";
        else if (strHour > 24 && strDay <= 10)
            return strDay + "天前";
        else if (strDay > 10 && strDay <= 365)
            return new Date(times).Format("MM-dd");
        else
            return new Date(times).Format("yyyy-MM-dd");
    },
    act_time:function(objtimes){
        var times = objtimes.replace('T',' '),
            time = times.replace(/\d{4}\-/g,'').replace(/\:00$/,'');
            // match 4 numbers - and last :00 to '';
        return time;
    },
    preventScroll:function(e){
        if (e.target.type === 'range') { return; }
            e.preventDefault();
    },
    checkFoot:function(){
        var h = $('#wrapper').height(),
            win_h = $(window).height();
        $('#wrapper').css('min-height',win_h);
        if(h <= win_h){
            $('.slide-box').addClass('h100');
        }else{
            $('.slide-box').removeClass('h100');
        }
    }
};
// hmu.unit = new Common(window, null);
// (function(){
//     Date.prototype.Format = function (fmt) { //时间处理扩展
//         var o = {
//             "M+": this.getMonth() + 1,
//             "d+": this.getDate(),
//             "h+": this.getHours(),
//             "m+": this.getMinutes(),
//             "s+": this.getSeconds(),
//             "q+": Math.floor((this.getMonth() + 3) / 3),
//             "S": this.getMilliseconds()
//         };
//         if (/(y+)/.test(fmt))
//             fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//         for (var k in o)
//             if (new RegExp("(" + k + ")").test(fmt))
//                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//         return fmt;
//     }
// })();
$(function(){
    

    // hmu.touchColor('#indexlist li,#target_topiclistall>li,#t_topiclist > ul > li');
    // hmu.touchColor('#divMagazineList li,#divSubMagazineList li,#target_activityList li,#target_SubMagazineList li');

    // hmu.tab('.row-league li', '.row-leacont .panel');
    // hmu.common_tab('.row-tab > div', '.row-tab-cont .panel');
    
    // hmu.checkFoot();
    // //tapdown in header
    // $('.tapdown,.tapdown-fixbg').on('click', function (event) {
    //     var $bg = $('.tapdown-fixbg'),
    //         bg_on = 'tapdown-fixbg-on';
    //     $('.top-menu').toggleClass('cont-on');
    //     if($bg.hasClass(bg_on)){
    //         $bg.removeClass(bg_on);
    //         setTimeout(function(){
    //             $bg.hide();
    //         },100)
    //     }else{
    //         $bg.addClass(bg_on).show();
    //     }
    //     event.stopPropagation();
    // });

    // // input back2top html
    // $('body').append('<div class="btn-backtop"></div>');
    // $('.btn-backtop').bind('click', function (event) {
    //     window.scrollTo(0, 0);
    //     event.stopPropagation();
    // });
    // $(window).scroll(function () {
    //     var srollPos = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (srollPos > 50) {
    //         $('.btn-backtop').show();
    //     } else {
    //         $('.btn-backtop').hide();
    //     }
    // });

    // $('.side-a').bind('click',function (event){
    //     var on  = 'slide-right',
    //         z_index = 'z-index',
    //         $wrapper = $('#wrapper,footer');
    //     if($wrapper.hasClass(on)){
    //         $('.side-nav-left').removeClass(z_index);
    //         setTimeout(function(){
    //             $wrapper.removeClass(on);
    //         },100);
    //         setTimeout(function(){
    //             $('footer').show();
    //         },500);
    //     }else{
    //         $wrapper.addClass(on);
    //         $('footer').hide();
    //         setTimeout(function(){
    //             $('.side-nav-left').addClass(z_index);
    //         },500);
    //     }
    //     $('.fix-bottom').toggle();
    //     $('.slide-box').toggleClass('overflow');
    //     event.stopPropagation();
    // });
    // if($('.join-league').length || $('.btn-functions').length){
    //     $('footer').css('height','100px');
    // }
});

function slideList(id) {
    var el = $('#' + id),
        controls = $(el).find('.paging>li');

    var slider = new Swipe(document.getElementById(id), {
        startSlide: 0,
        speed: 400,
        callback: function (index) {
            if (index >= controls.length) {
                index = index - controls.length;
            }
            if (controls.length > 1) {
                controls.removeClass('active');
                controls.eq(index).addClass('active');
            }
        }
    })
}

