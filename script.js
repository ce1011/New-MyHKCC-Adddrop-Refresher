// ==UserScript==
// @name         New MyHKCC Add/Drop Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Fuck 0 Vacancy!
// @author       You
// @include					http*://www*.polyu.edu.hk/myhkcc_new/*
// @include					http://127.0.0.1/index.html
// @include                 file:///C:/Users/ce/Desktop/New%20folder/my.HKCC%20Student%20Portal.html
// @grant        none
// @require https://code.jquery.com/jquery-3.4.1.slim.js
// @grant       unsafeWindow
// ==/UserScript==

$(document).ready(function() {
  var refreshTimer;

  var n = 1;

  var subjectName = []
  var vacancy = []

  var toolkit = (window.toolkit = {})

  setTimeout(function() {
    $(
      "<div class='item'<span>ADD/Drop Toolkit</span><div class='menu'><button onclick='Notification.requestPermission()'>Grant Permission for Notification</button><p>Type 'toolkit.startRefresh()' to start automatic refresh</p><p>Type 'toolkit.stopRefresh' to stop refresh</div></div>"
    ).insertBefore(
      "#sidebarPushable > div.pusher.purify_2DCQA > div > div.purify_9yySi > div.purify_13WEs.purify_3eNdw > div > div:nth-child(2)"
    ); // Select top of sidebar and add permission grant at the sidebar
  }, 100);

  toolkit.startRefresh = function() {
    refreshTimer = setInterval(function() {

      document
        .querySelector(
          "body > div:nth-child(7) > div > div:nth-child(3) > button.ui.button.purify_3Vjpt"
        ) // Click refresh
        .click();
      n++;
      toolkit.updateSubjectList();
      if(n % 5 == 0){
        console.log("Refreshed " + n + "times")
      }
      //document.getElementsByName("refresh")[0].click()
    }, 2000);
  };

  toolkit.stopRefresh = function() {
    clearInterval(refreshTimer);
  };

  toolkit.updateSubjectList = function(){
    $("body > div:nth-child(7) > div > div:nth-child(2)")[0].childNodes.forEach(function (subjectNo, i){
        subjectName[i] = subjectNo.children[0].innerText; // Fetch add/drop vacancy data from the vacancy refresh list
        vacancy[i] = subjectNo.children[1].innerText ]
        if(vacancy[i] > 0){

            console.log("%c Subject: " + subjectNo.children[0].innerText + "\nVancancy:" + subjectNo.children[1].innerText, "color: green; font-weight: bold;")
        }
    })
  }
});
