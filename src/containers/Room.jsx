// import React, { useState, useEffect } from "react";
// import config from '../config.js';
// import { useParams } from "react-router-dom";
// import $ from "jquery";
// import * as firebaseui from "firebaseui";
// import app from "../firebase.js";
// import firebase_legacy from "../firebase_legacy.js";
// import { onAuthStateChanged, getAuth } from "firebase/auth";
// // import "firebase/compat/database";
// // import "firebase/compat/firestore";
// // import "firebaseui/dist/firebaseui.css";
// // import "../css/login-register.css";
// import ReportModal from "../components/codelab/ReportModal.jsx";
// import WheelModal from "../components/codelab/WheelModal.jsx";
// import OnlineCollapse from "../components/codelab/OnlineCollapse.jsx";
// import NotifyToast from "../components/codelab/NotifyToast.jsx";
// import Bubble from "../components/codelab/Bubble.jsx";
// import RoomTopButton from "../components/codelab/RoomTopButton.jsx";
// import RoomConfig from "../components/codelab/ConfigModal.jsx";

function Room() {
  // const [docID, setDocID] = useState(false);
  // const [reportModal, setreportModal] = useState(false);
  // const [wheelModal, setwheelModal] = useState(false);
  // const [configModal, setconfigModal] = useState(false);
  // const [user, setUser] = useState(null);
  // const showReportModal = () => {
  //   setreportModal(true);
  // };
  // const hideReportModal = () => {
  //   setreportModal(false);
  // };
  // const showWheelModal = () => {
  //   let selected = $("input[name=listSelect]:checked").val();
  //   if (selected === "name" || selected === "email") {
  //     // firebase
  //     //   .firestore()
  //     //   .collection("rooms")
  //     //   .doc(roomId)
  //     //   .get()
  //     //   .then((doc) => {
  //     //     if (doc.exists) {
  //     //       var segments = [];
  //     //       let obj = doc.data();
  //     //       var ks;
  //     //       if (selected === "name") ks = obj.memberList_name.split(/\r?\n/);
  //     //       if (selected === "email") ks = obj.memberList_email.split(/\r?\n/);
  //     //       $.each(ks, function (k) {
  //     //         segments.push(ks[k]);
  //     //       });
  //     //       wheel.segments = segments;
  //     //       wheel.init();
  //     //       wheel.update();
  //     //       setTimeout(function () {
  //     //         window.scrollTo(0, 1);
  //     //       }, 0);
  //     //       setShowModal(true);
  //     //     }
  //     //   });
  //   } else {
  //     // var segments = [];
  //     // for (let uid in online_list) {
  //     //   segments.push(online_list[uid].name);
  //     // }
  //     // wheel.segments = segments;
  //     // wheel.init();
  //     // wheel.update();
  //     // setTimeout(function () {
  //     //   window.scrollTo(0, 1);
  //     // }, 0);
  //     setwheelModal(true);
  //   }
  // };
  // const hideWheelModal = () => {
  //   setwheelModal(false);
  // };
  // const showConfigModal = () => {
  //   setconfigModal(true);
  // };
  // const hideConfigModal = () => {
  //   setconfigModal(false);
  // };
  // const { roomId } = useParams();
  // const [data, setData] = useState(null);
  // var refUsers;
  // var raiseHand = false;
  // var currentDocID;
  // var teacher = false;
  // var online_list;
  // var unsubscribe;
  // var curRoom;
  // var currentUser;
  // var TOAST_ENTER_ROOM = 1;
  // var TOAST_LEAVE_ROOM = 2;
  // var TOAST_RAISE_HAND = 3;
  // var TOAST_CHAT_ROOM = 4;
  // var HAND_UP = 1;
  // var HAND_DOWN = 0;
  // var ROOM_TEST = "tO683y";
  // var LAB_TEST = "1bj-DXVSTiHlnxKLn7gWyRxoQjKV6fH5EzMIemZhRmbE";
  // var oldStep = -1;
  // var oldTime = 0;
  // let progress = 0;
  // let mapAllAnswers = new Map(); //QuizID, MapAnswer
  // let mapAllUsers = new Map();
  //
  // useEffect(() => {
  //   const libraryPaths = ["/js/prettify.js", "/js/codelab-elements.js"];
  //   libraryPaths.forEach((path) => {
  //     const script = document.createElement("script");
  //     script.src = path;
  //     script.async = true;
  //     document.body.appendChild(script);
  //   });
  //
  //   return () => {
  //     libraryPaths.forEach((path) => {
  //       const script = document.querySelector(`script[src="${path}"]`);
  //       if (script) {
  //         document.body.removeChild(script);
  //       }
  //     });
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   fetch(`${config.API_BASE_URL}/room/${roomId}`)
  //     .then((response) => response.text())
  //     .then((responseData) => {
  //       setData(responseData); // Cập nhật state với dữ liệu từ API
  //     })
  //     .catch((error) => {
  //       setData(error); // Cập nhật state với dữ liệu từ API
  //     });
  // }, []);
  //
  // useEffect(() => {
  //   if (data) {
  //     const auth = getAuth(app);
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         currentUser = user;
  //         afterLogin(currentUser);
  //         presence(currentUser);
  //         setUser(user);
  //       } else {
  //         afterLogout();
  //       }
  //       $("#login-spinner").addClass("d-none");
  //     });
  //     const ui =
  //       firebaseui.auth.AuthUI.getInstance() ||
  //       new firebaseui.auth.AuthUI(getAuth(app));
  //     ui.start("#firebaseui-auth-container", {
  //       callbacks: {
  //         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
  //           if (authResult.user) {
  //             console.log(authResult.user);
  //           }
  //         },
  //       },
  //       signInFlow: "popup",
  //       signInOptions: [
  //         {
  //           provider: firebase_legacy.auth.EmailAuthProvider.PROVIDER_ID,
  //           requireDisplayName: true,
  //           disableSignUp: {
  //             status: true,
  //           },
  //         },
  //         firebase_legacy.auth.GoogleAuthProvider.PROVIDER_ID,
  //       ],
  //     });
  //
  //     $("#drawer .metadata").remove();
  //     $("#topButton").detach().appendTo("#codelab-title");
  //     $(".steps ol li").click(function (e) {
  //       if (updateStep != null) updateStep($(this).index());
  //     });
  //     $("#btnRaiseHand").click(function () {
  //       raiseHand = $("#btnRaiseHand").hasClass("active");
  //       let curStep = new URL(window.location.href).hash.split("#")[1];
  //       updateStep(Number(curStep)); //Update
  //       if (raiseHand) {
  //         // sendNotify("all", null, TOAST_RAISE_HAND);
  //         firebase_legacy
  //           .firestore()
  //           .collection("rooms")
  //           .doc(roomId)
  //           .collection("logs")
  //           .doc(currentUser.uid)
  //           .collection("hands")
  //           .add({
  //             time: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //             type: HAND_UP,
  //             step: Number(curStep),
  //           });
  //         firebase_legacy
  //           .firestore()
  //           .collection("rooms")
  //           .doc(roomId)
  //           .collection("logs")
  //           .doc(currentUser.uid)
  //           .update({
  //             ["h" + oldStep]:
  //               firebase_legacy.firestore.FieldValue.increment(1),
  //             lastAction:
  //               firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //           });
  //       } else {
  //         firebase_legacy
  //           .firestore()
  //           .collection("rooms")
  //           .doc(roomId)
  //           .collection("logs")
  //           .doc(currentUser.uid)
  //           .collection("hands")
  //           .add({
  //             time: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //             type: HAND_DOWN,
  //             step: Number(curStep),
  //           });
  //       }
  //     });
  //     $(".steps ol li a").append(
  //       "<span className='badge badge-secondary bg-secondary my-badge invisible' onmouseover='hoverDiv(this,1)' onmouseout='hoverDiv(this,0)'>0</span>"
  //     );
  //     $("#btnLogin").hide();
  //     $("#next-step").click(function () {
  //       let curStep = new URL(window.location.href).hash.split("#")[1];
  //       updateStep(Number(curStep));
  //     });
  //     $("#previous-step").click(function () {
  //       let curStep = new URL(window.location.href).hash.split("#")[1];
  //       updateStep(Number(curStep));
  //     });
  //     $("#switch-fullscreen").click(function (e) {
  //       if ($("#switch-showdetail").is(":checked")) {
  //         $(".report-detail").removeClass("d-none");
  //       } else {
  //         $(".report-detail").addClass("d-none");
  //       }
  //     });
  //     $("#switch-fullscreen").click(function (e) {
  //       if ($("#switch-fullscreen").is(":checked")) {
  //         $("#reportModalDialog").addClass("modal-fullscreen");
  //       } else {
  //         $("#reportModalDialog").removeClass("modal-fullscreen");
  //       }
  //     });
  //     $(document).on("keydown", function (e) {
  //       if (e.keyCode === 37 || e.keyCode === 39) {
  //         // let curStep = new URL(window.location.href).hash.split("#")[1];
  //         // updateStep(Number(curStep))
  //         // e.preventDefault()
  //         // e.stopPropagation();
  //       }
  //     });
  //     $("google-codelab-step .instructions").prepend(
  //       "<div className='extend-start'></div>"
  //     );
  //     $("google-codelab-step .instructions").append(
  //       "<div className='extend-end'></div>"
  //     );
  //     modifyLab();
  //     $("input[type=radio][name=listSelect]").change(function () {
  //       showWheelModal(true);
  //     });
  //   }
  // }, [data]);
  //
  // return (
  //   <div>
  //     <div
  //       className="mainlab slide"
  //       dangerouslySetInnerHTML={{ __html: data }}
  //     />
  //     <RoomTopButton
  //       docID={docID}
  //       showReportModal={showReportModal}
  //       showWheelModal={showWheelModal}
  //       showConfigModal={showConfigModal}
  //     />
  //     <Bubble />
  //     <NotifyToast />
  //     <OnlineCollapse currentUser={user} roomId={roomId} />
  //     <WheelModal show={wheelModal} onHide={hideWheelModal} />
  //     <ReportModal show={reportModal} onHide={hideReportModal} />
  //     <RoomConfig show={configModal} onHide={hideConfigModal} />
  //   </div>
  // );
  //
  // function updateStep(step) {
  //   //Up to Realtime database
  //   if (!isNaN(step) && refUsers != null) {
  //     let newTime = Math.floor(Date.now() / 1000);
  //     let duration = newTime - oldTime;
  //
  //     if (duration > 15 && duration < 1800) {
  //       firebase_legacy
  //         .firestore()
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("logs")
  //         .doc(currentUser.uid)
  //         .collection("steps")
  //         .add({
  //           time: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //           enter: step,
  //           leave: oldStep,
  //           duration: duration,
  //         });
  //
  //       firebase_legacy
  //         .firestore()
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("logs")
  //         .doc(currentUser.uid)
  //         .update({
  //           ["s" + oldStep]:
  //             firebase_legacy.firestore.FieldValue.increment(duration),
  //           lastAction: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //         });
  //     }
  //
  //     if (currentUser != null) {
  //       let change = {};
  //       change[currentUser.uid] = {
  //         step: step,
  //         time: firebase_legacy.database.ServerValue.TIMESTAMP,
  //         name: getUserName(),
  //         photo: currentUser.photoURL,
  //       };
  //
  //       if (raiseHand) {
  //         change[currentUser.uid].isRaise = true;
  //       }
  //       refUsers.update(change);
  //     }
  //     oldStep = step;
  //     oldTime = Math.floor(Date.now() / 1000);
  //   }
  // }
  // function realtime(user) {
  //   //Check realtime
  //   $("#main").show();
  //   $("#drawer").show();
  //   refUsers = firebase_legacy
  //     .database()
  //     .ref("/labs/" + currentDocID + "/" + roomId + "/users");
  //   refUsers.on("value", (snapshot) => {
  //     //Khi có bất kỳ sự thay đổi trong labs/docID_ABC/room_123/users
  //     const data = snapshot.val();
  //     let count = [];
  //     let totalUser = 0;
  //     $("#usersChat").empty();
  //     online_list = data;
  //     for (let uid in data) {
  //       let step = data[uid].step;
  //       if (count[step] == undefined) count[step] = { count: 0, user: "" };
  //       count[step].count++;
  //       count[step].user = count[step].user + data[uid].name + "<br>";
  //       totalUser++;
  //       if (teacher) {
  //         //For Teacher only
  //         $("[id^=" + uid + "]").removeClass("yellow");
  //         if (data[uid].isRaise) {
  //           $("#" + uid + "_" + step).addClass("yellow");
  //         }
  //       }
  //
  //       //Add to chat room
  //       let avatar =
  //         "<img src='" +
  //         data[uid].photo +
  //         "' alt='user' width='40' height='40'  className='rounded-circle'>";
  //       if (data[uid].photo !== undefined) {
  //         avatar =
  //           "<img src='" +
  //           data[uid].photo +
  //           "' alt='user' width='40' height='40'  className='rounded-circle'>";
  //       } else {
  //         avatar =
  //           "<img src='/images/user.svg' alt='user' width='40' height='40'  className='rounded-circle'>";
  //       }
  //       $("#usersChat").append(
  //         "<a id='chat" +
  //           uid +
  //           "' href='#' onClick='showChat(this,\"" +
  //           uid +
  //           "\")' className='px-2 list-group-item list-group-item-action rounded-0 media uchat'>" +
  //           avatar +
  //           "<div className='media-body'>" +
  //           data[uid].name +
  //           "</div></a>"
  //       );
  //
  //       //Update in Chat room
  //       if (data[uid].isRaise) {
  //         $("#chat" + uid).addClass("yellow");
  //       } else {
  //         $("#chat" + uid).removeClass("yellow");
  //       }
  //     }
  //
  //     for (let i = 1; i <= getNumberOfSteps(); i++) {
  //       if (count[i - 1] == undefined) {
  //         $("li:nth-child(" + i + ") > a > span.badge").addClass("invisible");
  //       } else {
  //         $("li:nth-child(" + i + ") > a > span.badge").removeClass(
  //           "invisible"
  //         );
  //         $("li:nth-child(" + i + ") > a > span.badge").text(
  //           count[i - 1].count
  //         );
  //         $("li:nth-child(" + i + ") > a > span.badge").attr(
  //           "user",
  //           count[i - 1].user
  //         );
  //       }
  //     }
  //
  //     $("#numOnline").text(totalUser);
  //   });
  //
  //   updateStep(getSelectedStep());
  //   //Listen to Notification
  //
  //   // refUsers = firebase.database().ref('/labs/' + currentDocID + '/' + roomId + '/users');
  //
  //   //OnDisconnect
  //   let leave = {};
  //   leave[currentUser.uid] = null;
  //   refUsers.onDisconnect().update(leave);
  //
  //   let leave_notify = {
  //     uid: currentUser.uid,
  //     uname: getUserName(),
  //     time: firebase_legacy.database.ServerValue.TIMESTAMP,
  //     type: TOAST_LEAVE_ROOM,
  //   };
  //
  //   firebase_legacy
  //     .database()
  //     .ref("/labs/" + currentDocID + "/" + roomId + "/notifies/all")
  //     .onDisconnect()
  //     .update(leave_notify);
  //   let enter_notify = {
  //     uid: currentUser.uid,
  //     uname: getUserName(),
  //     time: firebase_legacy.database.ServerValue.TIMESTAMP,
  //     type: TOAST_ENTER_ROOM,
  //   };
  //   firebase_legacy
  //     .database()
  //     .ref("/labs/" + currentDocID + "/" + roomId + "/notifies/all")
  //     .onDisconnect()
  //     .set(enter_notify);
  //
  //   let enter = {};
  //   let curStep = new URL(window.location.href).hash.split("#")[1];
  //   if (!curStep) curStep = -1;
  //
  //   enter[user.uid] = {
  //     step: curStep,
  //     time: firebase_legacy.database.ServerValue.TIMESTAMP,
  //     name: getUserName(),
  //     photo: user.photoURL,
  //   };
  //
  //   firebase_legacy
  //     .database()
  //     .ref(".info/connected")
  //     .on("value", function (snapshot) {
  //       if (snapshot.val() == false) {
  //         //When user if offline
  //         return;
  //       }
  //       refUsers
  //         .onDisconnect()
  //         .update(leave)
  //         .then(function () {
  //           refUsers.update(enter);
  //         });
  //
  //       firebase_legacy
  //         .database()
  //         .ref("/labs/" + currentDocID + "/" + roomId + "/notifies/all")
  //         .onDisconnect()
  //         .set(leave_notify)
  //         .then(function () {
  //           firebase_legacy
  //             .database()
  //             .ref("/labs/" + currentDocID + "/" + roomId + "/notifies/all")
  //             .set(enter_notify);
  //         });
  //     });
  // }
  // function getNumberOfSteps() {
  //   let steps = $(".steps ol li");
  //   return steps.length;
  // }
  // function getUserName() {
  //   if (currentUser.newName) return currentUser.newName;
  //   else return currentUser.displayName;
  // }
  // function getSelectedStep() {
  //   const radioButtons = $(".steps ol li");
  //   for (const element of radioButtons) {
  //     if (element.hasAttribute("selected")) {
  //       return radioButtons.index(element);
  //     }
  //   }
  // }
  // function showToast(data) {
  //   $("#toast-container").removeClass("d-none");
  //   if (data.type === TOAST_ENTER_ROOM) {
  //     $("#toast-body").text("Vào phòng");
  //     $("#toast-title").text(data.uname);
  //   } else if (data.type === TOAST_LEAVE_ROOM) {
  //     $("#toast-body").text("Rời phòng");
  //     $("#toast-title").text(data.uname);
  //   } else if (data.type === TOAST_RAISE_HAND) {
  //     $("#toast-body").text("Giơ tay");
  //     $("#toast-title").text(data.uname);
  //   } else if (data.type === TOAST_CHAT_ROOM) {
  //     $("#toast-body").text(data.message);
  //     $("#toast-title").text(data.uname);
  //   }
  //   // new bootstrap.Toast(document.getElementById('liveToast')).show()
  //   $("#liveToast").on("hidden.bs.toast", function () {
  //     $("#toast-container").addClass("d-none");
  //   });
  // }
  // function modifyLab() {
  //   $(".slide aside").on("click", function (ev) {
  //     // let me = ev.currentTarget;
  //     // $(me).
  //     $(this).children("p").toggle();
  //     $(this).children("span").toggle();
  //   });
  //   $(".slide .inner > table").wrap("<div className='table-lab'></div>");
  //   $(".slide .inner .table-lab table:has(tr:eq(0):last-child)").addClass(
  //     "table-onerow"
  //   );
  //   $(".slide .inner .table-onerow td").addClass("align-middle");
  //   $(".slide .inner .table-lab table:has(tr:not(:eq(0):last-child))").addClass(
  //     "table table-striped table-bordered"
  //   );
  //   $("span.option-text")
  //     .closest("label.survey-option-wrapper")
  //     .each(function () {
  //       let text = $(this).text();
  //       let input = $(this).find("input");
  //
  //       $(this).replaceWith(
  //         "<div className='form-check'>" +
  //           "  <input className='form-check-input' type='radio' name='" +
  //           input.attr("name") +
  //           "' id='" +
  //           input.attr("id") +
  //           "'>" +
  //           "  <label className='form-check-label' for='" +
  //           input.attr("id") +
  //           "'>" +
  //           text +
  //           "  </label> <span className='user-answer-choice'></span>" +
  //           "</div>"
  //       );
  //     });
  //
  //   $(
  //     'label.form-check-label:contains("Code"),label.form-check-label:contains("Mã nguồn")'
  //   )
  //     .closest(".survey-question-options")
  //     .replaceWith(
  //       "" +
  //         "<div className='container-code'>" +
  //         "    <textarea rows='10' className='textarea-code'></textarea>       " +
  //         "    <a href='#' className='btn btn-danger d-none btn-upload-code btn-right-corner'>Lưu</a>" +
  //         "</div><div className='user-answer-code'></div>"
  //     );
  //
  //   $(
  //     'label.form-check-label:contains("Text"),label.form-check-label:contains("Văn bản")'
  //   )
  //     .closest(".survey-question-options")
  //     .replaceWith(
  //       "" +
  //         "<div className='container-code'>" +
  //         "    <textarea rows='10' className='textarea-text'></textarea>       " +
  //         "    <a href='#' className='btn btn-danger d-none btn-upload-code btn-right-corner'>Lưu</a>" +
  //         "</div></div><div className='user-answer-code'></div>"
  //     );
  //
  //   $(
  //     'label.form-check-label:contains("File"),label.form-check-label:contains("Files")'
  //   )
  //     .closest(".survey-question-options")
  //     .replaceWith(
  //       "" +
  //         "<div className='container-code'>" +
  //         "    <form method='post' enctype='multipart/form-data'>" +
  //         "       <input type='file' name='files' multiple>       " +
  //         "       <a href='#' className='btn btn-danger btn_upload_file btn-right-corner'>Lưu</a>" +
  //         "       <div className='msg flex-grow-1'></div>" +
  //         "   </form>" +
  //         "</div><div className='user-answer-file'></div>"
  //     );
  //
  //   //Youtube
  //   $("p:contains('https://www.youtube.com/watch?v=')").each(function () {
  //     let url = new URL($(this).text());
  //     $(this).html(
  //       '<div className="youtube-container"><iframe src="https://www.youtube.com/embed/' +
  //         url.searchParams.get("v") +
  //         '" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreenclassName="video"></iframe>'
  //     );
  //   });
  //
  //   $(".slide .warning").hide();
  //
  //   $("p:contains('https://codepen')").each(function () {
  //     let url = new URL($(this).text());
  //     let arr = url.pathname.split("/");
  //
  //     $(this).html(
  //       '<pclassName="codepen" data-height="600" data-default-tab="html,result" data-slug-hash="' +
  //         arr[arr.length - 1] +
  //         '" data-preview="true" data-editable="true"\n' +
  //         '   style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">\n' +
  //         "</p>"
  //     );
  //   });
  //
  //   addCopyButtons(navigator.clipboard);
  //   $(".contentInput").text("");
  //   $(".msg").html("");
  //   $('span.option-text:contains("File")')
  //     .closest("label.survey-option-wrapper")
  //     .html("");
  //   $(".survey-option-wrapper").append(
  //     "<span className='user-answer-choice'></span>"
  //   );
  //   $(".form-check-input").on("click", function (ev) {
  //     //Quiz
  //     let me = ev.currentTarget;
  //     let survey_id = $(me).closest("google-codelab-survey").attr("survey-id");
  //     let choice = $(me)
  //       .closest(".survey-question-options")
  //       .find(".form-check-input")
  //       .index($(me));
  //     if (curRoom.allow_submit)
  //       firebase_legacy
  //         .firestore()
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("surveys")
  //         .doc(survey_id)
  //         .collection("answers")
  //         .doc(currentUser.uid)
  //         .set({
  //           uname: getUserName(),
  //           time: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //           choice: choice,
  //         });
  //     $("header script").remove();
  //     updateAnswer(survey_id);
  //   });
  //
  //   $(".btn-upload-code").on("click", function (ev) {
  //     //Submit code
  //     let me = ev.currentTarget;
  //     $(me).addClass("d-none");
  //     let survey_id = $(me).closest("google-codelab-survey").attr("survey-id");
  //     let content = $(me)
  //       .closest("google-codelab-survey")
  //       .find("textarea")
  //       .val();
  //
  //     firebase_legacy
  //       .firestore()
  //       .collection("rooms")
  //       .doc(roomId)
  //       .collection("surveys")
  //       .doc(survey_id)
  //       .collection("answers")
  //       .doc(currentUser.uid)
  //       .set({
  //         uname: getUserName(),
  //         time: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //         content: content,
  //       })
  //       .then(function () {
  //         $(me).removeClass("d-none");
  //         $(me).removeClass("btn-danger");
  //         $(me).addClass("btn-success");
  //       });
  //
  //     updateAnswer(survey_id);
  //     return true;
  //   });
  //
  //   $(".btn_upload_file").on("click", function (ev) {
  //     //Upload file
  //     let me = $(ev.currentTarget);
  //     $(me).addClass("d-none");
  //     let survey_id = $(me).closest("google-codelab-survey").attr("survey-id");
  //     let form = me.closest("form");
  //     let msg = form.find(".msg").first();
  //     $(".upload-spinner").removeClass("d-none");
  //     $(".upload-form").addClass("d-none");
  //     $(".btn_upload").addClass("d-none");
  //     let formData = new FormData(form[0]);
  //     formData.append("userID", currentUser.uid);
  //     formData.append("uname", getUserName());
  //     formData.append("survey_id", survey_id);
  //     formData.append("room", roomId);
  //
  //     $.ajax({
  //       url: "/upload",
  //       type: "post",
  //       data: formData,
  //       contentType: false,
  //       processData: false,
  //       success: function (response) {
  //         $(".upload-spinner").addClass("d-none");
  //         form.removeClass("d-none");
  //         msg.html(response);
  //         form.trigger("reset");
  //         me.removeClass("d-none");
  //         updateAnswer(survey_id);
  //       },
  //       error: function () {
  //         msg.html("Có lỗi xảy ra!");
  //         $(".upload-spinner").addClass("d-none");
  //         form.removeClass("d-none");
  //         form.trigger("reset");
  //         me.removeClass("d-none");
  //       },
  //     });
  //   });
  //   //Ngau nhien
  // }
  // function addCopyButtons(clipboard) {
  //   document
  //     .querySelectorAll(".slide pre > code")
  //     .forEach(function (codeBlock) {
  //       let pre = codeBlock.parentNode;
  //       $(pre).wrap("<div className='block-code'></div>");
  //       let button = document.createElement("a");
  //       button.className = "btn btn-success btn-right-corner";
  //       button.innerText = "Copy";
  //       button.addEventListener("click", function () {
  //         clipboard.writeText(codeBlock.textContent).then(
  //           function () {
  //             button.blur();
  //             button.innerText = "Copied!";
  //             setTimeout(function () {
  //               button.innerText = "Copy";
  //             }, 2e3);
  //           },
  //           function (error) {
  //             button.innerText = "Error";
  //             console.error(error);
  //           }
  //         );
  //       });
  //       $(pre).before(button);
  //     });
  // }
  // function updateAnswer(survey_id) {
  //   firebase_legacy
  //     .firestore()
  //     .collection("rooms")
  //     .doc(roomId)
  //     .collection("surveys")
  //     .doc(survey_id)
  //     .set(
  //       {
  //         //Lưu vào array
  //         answers: firebase_legacy.firestore.FieldValue.arrayUnion(
  //           currentUser.uid + " - " + getUserName()
  //         ),
  //       },
  //       { merge: true }
  //     );
  // }
  // function enterRoom(user) {
  //   firebase_legacy
  //     .firestore()
  //     .collection("rooms")
  //     .doc(roomId)
  //     .get()
  //     .then((doc) => {
  //       //Đọc thông tin để bắt đầu vào phòng học
  //       if (doc.exists) {
  //         curRoom = doc.data();
  //         currentDocID = curRoom.docID;
  //         setDocID(currentDocID);
  //         $("#main").show();
  //         $("#drawer").show();
  //         $(".room").removeClass("d-none");
  //         if (
  //           curRoom.userID === user.uid ||
  //           hashCode(user.email) == "-448897477"
  //         ) {
  //           //Teacher or Lampx
  //           $(".teacher").removeClass("d-none");
  //           teacher = true;
  //           $(".slide .warning").show();
  //           $(".survey-question-wrapper h4").append(
  //             " <a href='#' className='show-result' onClick='showQuizResult(this)'>Kết quả</a>"
  //           );
  //         } else {
  //           $(".slide .warning").remove();
  //           if (!curRoom.allow_submit) {
  //             $(".survey-question-wrapper .form-check-input").prop(
  //               "disabled",
  //               true
  //             );
  //           }
  //         }
  //
  //         $("#btnSubmit").removeClass("d-none");
  //         $("#btnRaiseHand").removeClass("d-none");
  //         realtime(user); //Gia nhập phòng realtime
  //       }
  //     });
  //
  //   //Ghi log vao firestore
  //   firebase_legacy
  //     .firestore()
  //     .collection("rooms")
  //     .doc(roomId)
  //     .collection("logs")
  //     .doc(currentUser.uid)
  //     .set(
  //       {
  //         lastEnter: firebase_legacy.firestore.FieldValue.serverTimestamp(),
  //         userName: getUserName(),
  //         email: user.email,
  //       },
  //       { merge: true }
  //     );
  //
  //   //Load cac bài tập đã nộp
  //   $("google-codelab-survey").each(function () {
  //     let text_area = $(this).find("textarea");
  //     let survey_id = $(this).attr("survey-id");
  //     let ref = firebase_legacy
  //       .firestore()
  //       .collection("rooms")
  //       .doc(roomId)
  //       .collection("surveys")
  //       .doc(survey_id)
  //       .collection("answers")
  //       .doc(currentUser.uid);
  //
  //     ref.get().then((doc) => {
  //       if (doc.exists) {
  //         let obj = doc.data();
  //         if (obj.choice != null) {
  //           //Cau hoi trac nghiem Quiz
  //           $(this)
  //             .find(".form-check-input")
  //             .eq(obj.choice)
  //             .prop("checked", true);
  //         } else if (obj.content != null) {
  //           //Cau hoi dai
  //           text_area.val(decodeHtml(obj.content));
  //           text_area.next().addClass("btn-success");
  //           text_area.next().removeClass("btn-danger");
  //         } else if (obj.fileNames != null) {
  //           //File da nop
  //           let url = "";
  //           for (let i = 0; i < obj.fileNames.length; i++) {
  //             url =
  //               url +
  //               "<a className='text-primary' href = '" +
  //               obj.fileLinks[i] +
  //               "' >" +
  //               obj.fileNames[i] +
  //               "</a ><br>";
  //           }
  //           $(".msg").html("<p></p><b>File đã nộp</b>: <br>" + url);
  //         }
  //       }
  //       text_area.next().removeClass("d-none");
  //     });
  //   });
  //
  //   //$('.steps ol li').shuffle();
  //   //   $('#steps google-codelab-step').shuffle();
  // }
  // function afterLogin(user) {
  //   $(".user").removeClass("d-none");
  //   $(".guest").addClass("d-none");
  //   // $("#modal-login").modal("hide");
  //   $("#name").html(
  //     "<span id='name-current' className='align-self-center  fs-5'>...</span><input id='name-edit' className='d-none'/><a id='name-button' className='ms-2 d-none' href='#' onClick='editName()'>Sửa tên</a>"
  //   );
  //   $("#email").text(user.email);
  //   $("#phone").text(user.phoneNumber);
  //   if (user.photoURL) {
  //     $(".avatar").attr("src", user.photoURL);
  //   } else {
  //     $(".avatar").attr("src", "/images/user.svg");
  //   }
  //
  //   firebase_legacy
  //     .firestore()
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .get()
  //     .then((doc) => {
  //       let obj = doc.data();
  //       if (obj && obj.newName) {
  //         $("#name-current").text(obj.newName);
  //         currentUser.newName = obj.newName;
  //       } else $("#name-current").text(user.displayName);
  //       $("#name-button").removeClass("d-none");
  //
  //       //Tai thong tin xong thi moi cho vao phong
  //       $("#profileName").text(user.displayName);
  //       $("#profileEmail").text(user.email);
  //       if (hashCode(user.email) == "-448897477") {
  //         $(".lpx").removeClass("d-none");
  //       }
  //       enterRoom(user);
  //     });
  // }
  // function getDocID() {
  //   if (window.location.pathname.endsWith("lab.html")) return LAB_TEST; //Bài Jquery
  //   // return (new URL(window.location.href)).searchParams.get('room')
  //   let arr = new URL(window.location.href).pathname.split("/");
  //   return arr[arr.length - 1];
  // }
  // function hashCode(s) {
  //   return s.split("").reduce(function (a, b) {
  //     a = (a << 5) - a + b.charCodeAt(0);
  //     return a & a;
  //   }, 0);
  // }
  // function decodeHtml(html) {
  //   var txt = document.createElement("textarea");
  //   txt.innerHTML = html;
  //   return txt.value;
  // }
  // function enterLab(user) {
  //   $("#main").show();
  //   $("#drawer").show();
  //
  //   firebase_legacy
  //     .firestore()
  //     .collection("labs")
  //     .doc(getDocID())
  //     .get()
  //     .then((doc) => {
  //       //Đọc thông tin để bắt đầu vào phòng Lab chung
  //       if (doc.exists) {
  //         let obj = doc.data();
  //         currentDocID = obj.docID;
  //         if (
  //           obj.userID === user.uid ||
  //           hashCode(user.email) === "-448897477"
  //         ) {
  //           //Teacher
  //           $("#btnUpdate").removeClass("d-none");
  //         } else {
  //           $(".slide .warning").remove();
  //         }
  //       }
  //     });
  // }
  // function presence(user) {
  //   let uid = user.uid;
  //   let userStatusDatabaseRef = firebase_legacy
  //     .database()
  //     .ref("/status/" + uid);
  //   let isOfflineForDatabase = {
  //     state: "offline",
  //     last_changed: firebase_legacy.database.ServerValue.TIMESTAMP,
  //     uname: getUserName(),
  //   };
  //   let isOnlineForDatabase = {
  //     state: "online",
  //     last_changed: firebase_legacy.database.ServerValue.TIMESTAMP,
  //     uname: getUserName(),
  //   };
  //   firebase_legacy
  //     .database()
  //     .ref(".info/connected")
  //     .on("value", function (snapshot) {
  //       if (snapshot.val() == false) return;
  //       userStatusDatabaseRef
  //         .onDisconnect()
  //         .set(isOfflineForDatabase)
  //         .then(function () {
  //           userStatusDatabaseRef.set(isOnlineForDatabase);
  //         });
  //     });
  // }
  // function afterLogout() {
  //   const ui =
  //     firebaseui.auth.AuthUI.getInstance() ||
  //     new firebaseui.auth.AuthUI(getAuth(app));
  //   ui.start("#firebaseui-auth-container", {
  //     callbacks: {
  //       signInSuccessWithAuthResult: function (authResult, redirectUrl) {
  //         if (authResult.user) {
  //           console.log(authResult.user);
  //         }
  //       },
  //       uiShown: function () {},
  //     },
  //     signInFlow: "popup",
  //     signInOptions: [
  //       {
  //         provider: firebase_legacy.auth.EmailAuthProvider.PROVIDER_ID,
  //         requireDisplayName: true,
  //         disableSignUp: {
  //           status: true,
  //         },
  //       },
  //       firebase_legacy.auth.GoogleAuthProvider.PROVIDER_ID,
  //     ],
  //   });
  //   $(".user").addClass("d-none");
  //   $(".guest").removeClass("d-none");
  //   if (currentUser != null) {
  //     var userStatusDatabaseRef = firebase_legacy
  //       .database()
  //       .ref("/status/" + currentUser.uid);
  //     var isOfflineForDatabase = {
  //       state: "offline",
  //       last_changed: firebase_legacy.database.ServerValue.TIMESTAMP,
  //     };
  //     userStatusDatabaseRef.set(isOfflineForDatabase);
  //     logoutRoom();
  //   }
  // }
  // function logoutRoom() {
  //   let leave = {};
  //   leave[currentUser.uid] = null;
  //   refUsers.update(leave);
  //   //Ra khoi phong
  //   //sendNotify("all", null, TOAST_LEAVE_ROOM);
  //   $("#main").hide();
  //   $("#drawer").hide();
  //   $(".room").addClass("d-none");
  //   // if (refUsers) refUsers.off();
  //   // if (refChat) refChat.off();
  // }
  // function getAllAnswers(roomid, questionid, size) {
  //   let docRef = firebase_legacy
  //     .firestore()
  //     .collection("rooms")
  //     .doc(roomid)
  //     .collection("surveys")
  //     .doc(questionid)
  //     .collection("answers");
  //   docRef.get().then((querySnapshot) => {
  //     let answers = [];
  //     querySnapshot.forEach((doc) => {
  //       answers.push({ userid: doc.id, choice: doc.data() });
  //     });
  //     mapAllAnswers.set(questionid, answers);
  //     $("#get-mark").html(++progress);
  //     if (progress === size) {
  //       $("#get-mark").removeClass("d-none");
  //       showResult();
  //     }
  //   });
  // }
  // function showResult() {
  //   //Lấy ra đáp án
  //   let dapan = new Map();
  //   mapAllAnswers.forEach((value, key, map) => {
  //     value.forEach((item) => {
  //       if (item.userid === user.uid) {
  //         dapan.set(key, item.choice.choice);
  //       }
  //       mapAllUsers.set(item.userid, { correct: 0, wrong: 0 });
  //     });
  //   });
  //
  //   //Chấm điểm cho từng người
  //   mapAllAnswers.forEach((value, key, map) => {
  //     //Check từng câu
  //     let traloi = new Map();
  //     value.forEach((item) => {
  //       //Duyệt câu trả lời của toàn bộ mọi người
  //       if (item.choice.choice == dapan.get(key)) {
  //         //Cong diem cho nguoi nay
  //         mapAllUsers.get(item.userid).correct++;
  //       } else {
  //         mapAllUsers.get(item.userid).wrong++;
  //       }
  //     });
  //   });
  //   mapAllUsers.forEach((value, key, map) => {
  //     $("tr#" + key + " td:nth-child(4)").html(value.correct);
  //   });
  //
  //   $("#get-mark").html("Chấm điểm");
  // }
}
export default Room;
