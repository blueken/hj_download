﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="app_zt_apps_Default" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>触屏版下载页</title>
    <meta name="Description" content="" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="MobileOptimized" content="320" />
    <meta http-equiv="cleartype" content="on" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white" />

    <link rel="apple-touch-icon-precomposed" href="/images/icon72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/images/icon72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/images/icon144.png" />
    <link rel="stylesheet" href="/app/zt/apps/css/reset.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="/app/zt/apps/css/style.css" type="text/css" media="screen" />        
    <link rel="stylesheet" type="text/css" href="/app/zt/apps/css/landscape.css" media="(orientation : landscape)" />
</head>
<body>
    <header>
        <h1 class="hidden">沪江网校, CCTalk, 开心词场, 听力酷, 沪江小D</h1>
        <div id="scroller" style="height:70px;">
        <ul>
            <li class="active"><a href="#"><span>沪江网校</span></a></li>
            <li><a href="#"><span class="en">CCTalk</span></a></li>
            <li><a href="#"><span>开心词场</span></a></li>
            <li><a href="#"><span>听力酷</span></a></li>
            <li><a href="#"><span>沪江小D</span></a></li>
        </ul>
        </div>
    </header>

    <article class="content">
        <a class="arrow prev" href="#"></a>
        <a class="arrow next" href="#"></a>
        <h1 class="hidden">详情介绍</h1>

        <div id="scroller2" style="width:100%; height:100%; overflow:hidden">
        <div style="width:500%; height:100%">
        <section class="app hjwx">
                <h3 class="hcenter">沪江网校</h3>
                <p class="hcenter desc">权威名师外语课堂</p>
                <p class="hcenter logo"><img src="img/0.png" /></p>
                <p class="hcenter download"><a href="http://mp.weixin.qq.com/mp/redirect?url=http://dd.myapp.com/16891/FC3B9A98E60F4751CFE383F5786EBCCE.apk?fsname=com%2Ehujiang%2Ehjclass%5F3%2E1%2E3%5F65.apk " data-href="https://itunes.apple.com/cn/app/hu-jiang-wang-xiao-wai-yu/id738227542?mt=8">免费下载</a></p>

                <div class="colorful">

                </div>
            </section>


            <section class="app cctalk">
                <h3 class="hcenter">CCTalk</h3>
                <p class="hcenter desc">24小时免费公开课</p>
                <p class="hcenter logo"><img src="img/1.png" /></p>
                <p class="hcenter download"><a href="http://mp.weixin.qq.com/mp/redirect?url=http://dd.myapp.com/16891/DFCADD3B684777EE5E11631629B45F9E.apk?fsname=com%2Ehujiang%2Ecctalk%5F2%2E0%2E0%5F24.apk" data-href="https://itunes.apple.com/cn/app/cctalk/id843666882?mt=8">免费下载</a></p>

                <div class="colorful">

                </div>
            </section>

            <section class="app kxcc">
                <h3 class="hcenter">开心词场</h3>
                <p class="hcenter desc">专业高效背单词工具</p>
                <p class="hcenter logo"><img src="img/2.png" /></p>
                <p class="hcenter download"><a href="http://mp.weixin.qq.com/mp/redirect?url=http://dd.myapp.com/16891/1425369101CF42760583655B1A1C3454.apk?fsname=com%2Ehjwordgames%5F3%2E1%2E5%5F51.apk">免费下载</a></p>

                <div class="colorful">

                </div>
            </section>

            <section class="app tlk">
                <h3 class="hcenter">听力酷</h3>
                <p class="hcenter desc">免费海量外语听力</p>
                <p class="hcenter logo"><img src="img/3.png" /></p>
                <p class="hcenter download"><a href="http://mp.weixin.qq.com/mp/redirect?url=http://dd.myapp.com/16891/FCEF441C5076054775BEA92271D4744D.apk?fsname=com%2Ehj%2Edictation%5F2%2E4%2E2%5F69.apk">免费下载</a></p>

                <div class="colorful">

                </div>
            </section>

            <section class="app hjxd">
                <h3 class="hcenter">沪江小D</h3>
                <p class="hcenter desc">免费多国语言词典</p>
                <p class="hcenter logo"><img src="img/4.png" /></p>
                <p class="hcenter download"><a href="http://mp.weixin.qq.com/mp/redirect?url=http://dd.myapp.com/16891/B8C21057292E2A43FDD8AC8799F5260E.apk?fsname=com%2Ehujiang%2Edict%5F1%2E7%2E4%5F25.apk">免费下载</a></p>

                <div class="colorful">

                </div>
            </section>
        </div>
        </div>
    </article>
    <script type="text/javascript" src="/app/zt/apps/js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="/app/zt/apps/js/iscroll.js"></script>
    <script type="text/javascript" src="/app/zt/apps/js/index.js"></script>
    <script type="text/javascript">
    
    </script>
    <uc:Count runat="server"  ID="BtCount"/>
    
</body>
</html>
