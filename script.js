// ==UserScript==
// @name         New MyHKCC Add/Drop Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.2a
// @description  Fk the 0 vacancy!
// @author       You
// @include					http*://www*.polyu.edu.hk/myhkcc_new/*
// @include					http://127.0.0.1/index.html
// @grant        none
// @require https://code.jquery.com/jquery-3.4.1.slim.js
// @grant       unsafeWindow
// ==/UserScript==

$(document).ready(function () {
  var refreshTimer;

  var n = 1;

  var subjectName = []
  var vacancy = []
  var notificationStatus = []

  var toolkit = (window.toolkit = {})

  setTimeout(function () {
    $(
      `
      <div class="item"><span>Add/Drop Toolkit</span>
      <div class="menu">
          <div class='item'>
              <button onclick='Notification.requestPermission()'>Grant Permission for Notification</button>
          </div>
          <div class='item'>
              <button id='startButton'>Start refresh</button>
          </div>
          <div class='item'>
              <button id='stopButton'>Stop refresh</button>
          </div>
          <div class='item'>
              <p>Type 'toolkit.startRefresh()' to start automatic refresh</p>
          </div>
          <div class='item'>
              <p>Type 'toolkit.stopRefresh' to stop refresh</p>
          </div>
          <div class='item'>
              <p>Powered By Parco Au-Yeung</p>
          </div>
      </div>
  </div>`
    ).insertBefore(
      "#sidebarPushable > div.pusher.purify_2DCQA > div > div.purify_9yySi > div.purify_13WEs.purify_3eNdw > div > div:nth-child(2)"
    );

      $("#startButton").click(toolkit.startRefresh)
      $("#stopButton").click(toolkit.stopRefresh)

      console.log('%cNew HKCC Add/Drop Refresher ', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
      console.log('%cFuck that 0 vacancy. Inspired by HKTertiary old myHKCC Add/Drop helper.', '  font-size: 20px; color: rgba(0, 0, 0, 1); )');
      console.log(`This is an open source software and it created by Parco Au-Yeung. The code will update in https://gitlab.com/ce1011/new-myhkcc-adddrop-refresher`)
  }, 100);

  toolkit.startRefresh = function () {
    var startNotification = new Notification("Start refresh. Good Luck!")
    console.log("Start Refresh")
    refreshTimer = setInterval(function () {

      document
        .querySelector(
          "body > div:nth-child(7) > div > div:nth-child(3) > button.ui.button.purify_3Vjpt"
        )
        .click();
      n++;
      toolkit.updateSubjectList();
      console.log("Refreshed " + n + "times")
      //document.getElementsByName("refresh")[0].click()
    }, 2000);
  };

  toolkit.stopRefresh = function () {
    var stopNotification = new Notification("Stop refresh.")
    clearInterval(refreshTimer);
  };

  toolkit.updateSubjectList = function () {
    $("body > div:nth-child(7) > div > div:nth-child(2)")[0].childNodes.forEach(function (subjectNo, i) {
      subjectName[i] = subjectNo.children[0].innerText;
      vacancy[i] = subjectNo.children[1].innerText
      if (vacancy[i] > 0) {
        if (notificationStatus[i] != 1) {
          notificationStatus[i] = 1
          showNotification(subjectNo.children[0].innerText)
        }
        console.log("%c Subject: " + subjectNo.children[0].innerText + "\nVancancy:" + subjectNo.children[1].innerText, "color: green; font-weight: bold;")
      }
    })

    function showNotification(subject) {
      var notification = new Notification(subject + " is available. Please stop refresh and submit your add/drop request as fast as possible.")

      notification.onclick = function (event) {
        event.preventDefault()
        toolkit.stopRefresh()
      }
    }


  }
});
