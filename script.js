// ==UserScript==
// @name         New MyHKCC Add/Drop Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Fk the 0 vacancy!
// @author       You
// @include					http*://www*.polyu.edu.hk/myhkcc_new/*
// @include					http://127.0.0.1/my.HKCC%20Student%20Portal.html
// @grant        none
// @require https://code.jquery.com/jquery-3.4.1.slim.js
// @grant       unsafeWindow
// @grant GM_addStyle
// ==/UserScript==

function GM_addStyle (cssStr) {
  var D               = document;
  var newNode         = D.createElement ('style');
  newNode.textContent = cssStr;

  var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
  targ.appendChild (newNode);
}

GM_addStyle(`.uglyBox{  
  right: 50px;
  bottom: 50px;
  position: fixed;
  z-index: 1000;
}
.btn {
  position: relative;

  display: block;
  margin: 30px auto;
  padding: 0;

  overflow: hidden;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  
  background-color: #2ecc71;
  color: #ecf0f1;
  
  transition: background-color .3s;
}

.btn:hover, .btn:focus {
  background-color: #27ae60;
}

.btn > * {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn:before {
  content: "";
  
  position: absolute;
  top: 50%;
  left: 50%;
  
  display: block;
  width: 0;
  padding-top: 0;
    
  border-radius: 100%;
  
  background-color: rgba(236, 240, 241, .3);
  
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.btn:active:before {
  width: 120%;
  padding-top: 120%;
  
  transition: width .2s ease-out, padding-top .2s ease-out;
}

.btn.red {
  background-color: #e74c3c;
}

.btn.red:hover, .btn.red:focus {
  background-color: #c0392b;
}

.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 25%;
  margin: 1rem;
  width: 10%;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`) /*
    Floating Button solution provide by haithamsbui https://gist.github.com/haithamsboui/b47626497b5044e7846eab1906cfc414
    Material Button solution provide by Sébastien JEAN https://codepen.io/sebj54/pen/oxluI Sorry that i cant find the original link of the code
    Material Card solution provide by Florian Kutschera & Samuel Thornton https://medium.com/@Florian/freebie-google-material-design-shadow-helper-2a0501295a2d https://codepen.io/sdthornton/pen/wBZdXq
    */

$(document).ready(function () {
  var refreshTimer;

  var n = 1;

  var subjectName = []
  var vacancy = []
  var notificationStatus = []

  var toolkit = (window.toolkit = {})

  setTimeout(function () {
    /*$(
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
    );*/

      $("body").append(`
      <div class="uglyBox card card-1">
      <div class='item'>
          <H2>Add/Drop Toolkit</H2>
      </div>
      <div class='item'>
          <button class="btn" type="button" onclick='Notification.requestPermission()'><span>Grant Permission for Notification</span></button>
      </div>
      <div class='item'>
          <button id='startButton' class='btn' type="button"><span>Start refresh</span></button>
      </div>
      <div class='item'>
          <button id='stopButton' type="button" class='btn red'><span>Stop refresh</span></button>
      </div>
  </div>`);

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
