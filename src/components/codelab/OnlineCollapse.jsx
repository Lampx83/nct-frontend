import React, { useEffect } from "react";
import $ from "jquery";
import firebase from "../../firebase_legacy";

function OnlineCollapse({ roomId, currentUser }) {
  let firstEnterRoom = true;
  var sendTo;
  var refChat;
  var currentDocID = "1emWRBd5seFmpgXWpHK934AroSMaJb3KBr-UqPRoyl-U";
  var chatroom;
  var TOAST_CHAT_ROOM = 4;

  useEffect(() => {
    if (currentUser) {
      let first = true;
      $("#btnRoom").click(function () {
        if (firstEnterRoom) {
          showChat($("#chat0"), "all");
          firstEnterRoom = false;
        }
      });
      $("#txtMessage").keypress(function (e) {
        if (e.which == 13) {
          sendMessage();
          return false; //<---- Add this line
        }
      });
      firebase
        .database()
        .ref("/notifies/" + currentUser.uid)
        .on("value", (snapshot) => {
          if (!first) {
            const data = snapshot.val();
            if (
              !$("#collapse-online").hasClass("show") ||
              ($("#collapse-online").hasClass("show") && sendTo !== data.uid)
            ) {
              // showToast(data);
            }
          }
          first = false;
        });

      let firstAll = true; //Nghe toàn bộ sự kiện gửi đến phòng
      firebase
        .database()
        .ref("/labs/" + currentDocID + "/" + roomId + "/notifies/all")
        .on("value", (snapshot) => {
          if (!firstAll) {
            if (
              !$("#collapse-online").hasClass("show") ||
              ($("#collapse-online").hasClass("show") && sendTo !== "all")
            ) {
              const data = snapshot.val();
              // showToast(data);
            }
          }
          firstAll = false;
        });
    }
  }, [currentUser]);
  return (
    <div
      className="collapse container row rounded-lg overflow-hidden shadow"
      id="collapse-online"
      aria-expanded="true"
    >
      <div className="col-4 px-0 chat-leftside">
        <div className="messages-box">
          <div className="list-group rounded-0">
            <a
              onClick='showChat(this,"all")'
              className="px-2 list-group-item list-group-item-action active text-white rounded-0 media uchat"
              id="chat0"
            >
              <img
                src="../images/people-fill.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body">Tất cả</div>
            </a>
            <div id="usersChat"></div>
          </div>
        </div>
      </div>
      <div className="col-8 px-0 main-chat">
        <div className="px-2 pt-2 chat-box bg-white" id="chatMessages"></div>
        <div className="bg-light input-group">
          <input
            id="txtMessage"
            type="text"
            autocomplete="off"
            placeholder="Type a message"
            aria-describedby="button-addon2"
            className="form-control rounded-0 border-0 bg-light"
          />
          <div className="input-group-append">
            <button
              id="button-addon2"
              className="btn btn-link"
              onClick="sendMessage()"
            >
              <img
                width="30px"
                height="30px"
                src="../static/images/send-button.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function showChat(me, uid) {
    sendTo = uid;
    if (refChat != null) refChat.off();
    $("#chatMessages").empty();
    if (uid === "all") {
      refChat = firebase
        .database()
        .ref("/labs/" + currentDocID + "/" + roomId + "/chats/all/");
      chatroom = uid;
    } else {
      if (uid > currentUser.uid) chatroom = uid + "-" + currentUser.uid;
      else chatroom = currentUser.uid + "-" + uid;
      refChat = firebase.database().ref("/chats/" + chatroom); //Private chat
    }
    refChat.on("child_added", (data) => {
      showMessage(data.val());
    });
    $(".uchat").removeClass("active text-white");
    $(me).addClass("active text-white");
  }
  function showMessage(data) {
    if (currentUser.uid === data.uid) {
      $("#chatMessages").append(
        "<div className='ml-auto d-flex justify-content-end'><div className='pt-2 chat-body'><div className='bg-primary rounded-pill py-2 px-3  text-white text-small'>" +
        data.message +
        "</div><span className='text-muted d-flex justify-content-end chat-time'>" +
        time_ago(data.time) +
        "</span></div></div>\n"
      );
    } else {
      var avatar;
      if (data.photo !== undefined) {
        avatar =
          "<img src='" +
          data.photo +
          "' alt='user' width='40' height='40'  className='rounded-circle'>";
      } else {
        avatar =
          "<img src='/images/user.svg' alt='user' width='40' height='40'  className='rounded-circle'>";
      }
      $("#chatMessages").append(
        "<div className='media w-75 '>" +
        avatar +
        "<div className='media-body ms-1'><div className='bg-light rounded-pill py-2 px-3'><span className='text-small mb-0 text-muted'>" +
        data.message +
        "</span></div><p className='text-muted chat-time'>" +
        time_ago(data.time) +
        "</p></div></div>"
      );
    }
    let objDiv = document.getElementById("chatMessages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  function time_ago(time1) {
    let time = new Date(time1);
    var TimeAgo = (function () {
      var self = {};
      // Public Methods
      self.locales = {
        prefix: "",
        sufix: "",
        seconds: "just now",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
      };

      self.inWords = function (timeAgo) {
        var seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
          separator = this.locales.separator || " ",
          words = this.locales.prefix + separator,
          interval = 0,
          intervals = {
            day: seconds / 86400,
            hour: seconds / 3600,
            minute: seconds / 60,
          };

        var distance = this.locales.seconds;

        for (var key in intervals) {
          interval = Math.floor(intervals[key]);

          if (interval > 1) {
            distance = this.locales[key + "s"];
            break;
          } else if (interval === 1) {
            distance = this.locales[key];
            break;
          }
        }

        distance = distance.replace(/%d/i, interval);
        words += distance + separator + this.locales.sufix;

        return words.trim();
      };

      return self;
    })();
    return TimeAgo.inWords(time.getTime());
  }
  function sendMessage() {
    if ($("#txtMessage").val().trim() !== "") {
      let change = {};
      change[refChat.push().key] = {
        uid: currentUser.uid,
        name: getUserName(),
        photo: currentUser.photoURL,
        time: firebase.database.ServerValue.TIMESTAMP,
        message: $("#txtMessage").val(),
      };
      refChat.update(change);
      sendNotify(sendTo, $("#txtMessage").val(), TOAST_CHAT_ROOM);
      $("#txtMessage").val("");
      //REMOVE OLD CHAT
      const MAX_COUNT = 99; //Keep 100 recent
      refChat.once("value", function (snapshot) {
        if (snapshot.numChildren() > MAX_COUNT) {
          let childCount = 0;
          let updates = {};
          snapshot.forEach(function (child) {
            if (++childCount < snapshot.numChildren() - MAX_COUNT) {
              updates[child.key] = null;
            }
          });
          refChat.update(updates);
        }
      });
    }
  }

  function getUserName() {
    if (currentUser.newName) return currentUser.newName;
    else return currentUser.displayName;
  }
  function sendNotify(sendTo, message, type) {
    let ref;
    if (sendTo === "all") {
      ref = firebase
        .database()
        .ref("/labs/" + currentDocID + "/" + { roomId } + "/notifies/all");
    } else {
      ref = firebase.database().ref("/notifies/" + sendTo);
    }
    ref.set({
      uid: currentUser.uid,
      uname: getUserName(),
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      type: type,
    });
  }
}

export default OnlineCollapse;
