// ==UserScript==
// @name         New MyHKCC Add/Drop Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include					http*://www*.polyu.edu.hk/myhkcc_new/*
// @include					http://127.0.0.1/index.html
// @grant        none
// @require https://code.jquery.com/jquery-3.4.1.slim.js
// @grant       unsafeWindow
// ==/UserScript==

$(document).ready(function(){
    var refreshTimer

    var toolkit = window.toolkit = {};

    setTimeout(function() {
            $("<div class='item'<span>ADD/Drop Toolkit</span><div class='menu'><button disable onclick='toolkit.startrefresh()'>Start refresh vacancy list</button><button disable onclick='toolkit.stopRefresh()'>stop refresh vacancy list</button><p>Type 'toolkit.startRefresh()' to start automatic refresh</p><p>Type 'toolkit.stopRefresh' to stop refresh</div></div>").insertBefore("#sidebarPushable > div.pusher.purify_2DCQA > div > div.purify_9yySi > div.purify_13WEs.purify_3eNdw > div > div:nth-child(2)")
    }, 100);

    toolkit.startRefresh = function (){
       refreshTimer = setInterval(function(){
           console.log("ok")
           //document.querySelector("body > button:nth-child(1)").click()
           //document.getElementsByName("refresh")[0].click()
       }, 3000)
    }

    toolkit.stopRefresh = function (){
        clearInterval(refreshTimer)
    }
})