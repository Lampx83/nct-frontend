import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function ReportModal({ show, onHide }) {
  var firstReport = true;
  var table_practice_report;
  var table_raisehand_report;
  var table_submit_report;
  useEffect(() => {

    // table_practice_report = $("#table-practice-report").DataTable({
    //   columnDefs: [{}, { className: "dt-center", targets: "_all" }],
    //   pageLength: 100,
    // });
    // table_raisehand_report = $("#table-raisehand-report").DataTable({
    //   columnDefs: [{}, { className: "dt-center", targets: "_all" }],
    //   pageLength: 100,
    // });
    // table_submit_report = $("#table-submit-report").DataTable({
    //   columnDefs: [{}, { className: "dt-center", targets: "_all" }],
    //   pageLength: 100,
    // });
    // $("#practice-tab").click(function (ev) {
    //   let present = [];
    //   table_practice_report.clear().draw();
    //   $(".spinner-border").removeClass("d-none");
    //   firebase
    //     .firestore()
    //     .collection("rooms")
    //     .doc(getRoomID())
    //     .collection("logs")
    //     .onSnapshot((snapshot) => {
    //       snapshot.docChanges().forEach((change) => {
    //         let doc = change.doc;
    //         let obj = change.doc.data();
    //         let s = "";
    //         if (obj.lastAction != null)
    //           s =
    //             s +
    //             "<td className='font14'>" +
    //             time_ago(obj.lastAction.toDate()) +
    //             "</td>";
    //         else
    //           s =
    //             s +
    //             "<td className='font14'>" +
    //             time_ago(obj.lastEnter.toDate()) +
    //             "</td>";
    //         let step = "";
    //         let totalTime = 0;
    //         for (let i = 0; i < getNumberOfSteps(); i++) {
    //           let time = obj["s" + i];
    //           if (time) {
    //             totalTime = totalTime + time;
    //             if (time > 20 * 60) {
    //               //20 min
    //               step =
    //                 step +
    //                 "<span class ='labStep labStepColor4' id=" +
    //                 doc.id +
    //                 "_" +
    //                 i +
    //                 ">" +
    //                 (i + 1) +
    //                 "</span><span className='report-detail d-none'>" +
    //                 time +
    //                 "s" +
    //                 "</span> ";
    //             } else if (time > 10 * 60) {
    //               //10min
    //               step =
    //                 step +
    //                 "<span class ='labStep labStepColor3' id=" +
    //                 doc.id +
    //                 "_" +
    //                 i +
    //                 ">" +
    //                 (i + 1) +
    //                 "</span><span className='report-detail d-none'>" +
    //                 time +
    //                 "s" +
    //                 "</span> ";
    //             } else if (time > 5 * 60) {
    //               //5 min
    //               step =
    //                 step +
    //                 "<span class ='labStep labStepColor2' id=" +
    //                 doc.id +
    //                 "_" +
    //                 i +
    //                 ">" +
    //                 (i + 1) +
    //                 "</span><span className='report-detail d-none'>" +
    //                 time +
    //                 "s" +
    //                 "</span> ";
    //             } else if (time > 0) {
    //               //15 sec
    //               step =
    //                 step +
    //                 "<span class ='labStep labStepColor1' id=" +
    //                 doc.id +
    //                 "_" +
    //                 i +
    //                 ">" +
    //                 (i + 1) +
    //                 "</span><span className='report-detail d-none'>" +
    //                 time +
    //                 "s" +
    //                 "</span> ";
    //             }
    //           } else {
    //             step =
    //               step +
    //               "<span class ='labStep' id=" +
    //               doc.id +
    //               "_" +
    //               i +
    //               ">" +
    //               (i + 1) +
    //               "</span><span className='report-detail d-none'>0s</span> ";
    //           }
    //         }
    //         let tdThreeDots =
    //           totalTime +
    //           "<a href='#' className='bi bi-three-dots-vertical' data-bs-toggle='dropdown'></a> <div className='dropdown-menu'><a className='dropdown-item' href='#' onClick='deleteUserReport(\"" +
    //           doc.id +
    //           "\")'>Xóa</a> </div>";
    //         if (change.type === "added") {
    //           //Thêm
    //           let firstName = obj.userName.split(" ").slice(0, -1).join(" ");
    //           let lastName = obj.userName.split(" ").slice(-1).join(" ");
    //           table_practice_report.row
    //             .add([firstName, lastName, obj.email, s, step, tdThreeDots])
    //             .draw(false);
    //           table_practice_report.columns.adjust().draw();
    //           present.push(obj.email);
    //         }
    //         if (change.type === "modified") {
    //           //Sửa
    //           // $('#tr-report-' + doc.id).empty()  //Xóa bài đã làm
    //           // $('#tr-report-' + doc.id).html(stInfo)
    //         }
    //       });
    //       $("#table-practice-report").removeClass("d-none");
    //       if ($("#switch-showdetail").is(":checked")) {
    //         $(".report-detail").removeClass("d-none");
    //       } else {
    //         $(".report-detail").addClass("d-none");
    //       }

    //       $(".spinner-border").addClass("d-none");
    //     });

    //   $("#get-attendance").click(function (e) {
    //     //Điểm danh
    //     //Hệ thống sẽ ghi nhận vào lớp
    //     $("#get-attendance").addClass("d-none");
    //     present.sort();
    //     firebase
    //       .firestore()
    //       .collection("rooms")
    //       .doc(getRoomID())
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           let room = doc.data();
    //           let change = {};
    //           change[getRoomID()] = present;
    //           firebase
    //             .firestore()
    //             .collection("classes")
    //             .doc(room.classID)
    //             .update(change)
    //             .then(function () {
    //               $("#get-attendance").removeClass("d-none");
    //             });
    //         }
    //       });
    //   });
    // });

    // $("#raisehand-tab").click(function (ev) {
    //   table_raisehand_report.clear().draw();
    //   $(".spinner-border").removeClass("d-none");
    //   firebase
    //     .firestore()
    //     .collection("rooms")
    //     .doc(getRoomID())
    //     .collection("logs")
    //     .onSnapshot((snapshot) => {
    //       snapshot.docChanges().forEach((change) => {
    //         let doc = change.doc;
    //         let obj = change.doc.data();
    //         let s = "";
    //         if (obj.lastAction != null)
    //           s =
    //             s +
    //             "<td className='font14'>" +
    //             time_ago(obj.lastAction.toDate()) +
    //             "</td>";
    //         else
    //           s =
    //             s +
    //             "<td className='font14'>" +
    //             time_ago(obj.lastEnter.toDate()) +
    //             "</td>";
    //         let step = "";
    //         for (let i = 0; i < getNumberOfSteps(); i++) {
    //           if (obj["h" + i] != null) {
    //             step =
    //               step +
    //               "<span class ='labStep yellow' id=" +
    //               doc.id +
    //               "_" +
    //               i +
    //               ">" +
    //               (i + 1) +
    //               "</span><span className='report-detail d-none'>" +
    //               obj["h" + i] +
    //               "</span> ";
    //           } else {
    //             step =
    //               step +
    //               "<span class ='labStep' id=" +
    //               doc.id +
    //               "_" +
    //               i +
    //               ">" +
    //               (i + 1) +
    //               "</span><span className='report-detail d-none'>0</span> ";
    //           }
    //         }
    //         let tdThreeDots =
    //           "<a href='#' className='bi bi-three-dots-vertical' data-bs-toggle='dropdown'></a> <div className='dropdown-menu'><a className='dropdown-item' href='#' onClick='deleteUserReport(\"" +
    //           doc.id +
    //           "\")'>Xóa</a> </div>";

    //         if (change.type === "added") {
    //           //Thêm
    //           let firstName = obj.userName.split(" ").slice(0, -1).join(" ");
    //           let lastName = obj.userName.split(" ").slice(-1).join(" ");
    //           table_raisehand_report.row
    //             .add([firstName, lastName, obj.email, s, step, tdThreeDots])
    //             .draw(false);
    //           table_raisehand_report.columns.adjust().draw();
    //         }
    //         if (change.type === "modified") {
    //           //Sửa
    //           // $('#tr-report-' + doc.id).empty()  //Xóa bài đã làm
    //           // $('#tr-report-' + doc.id).html(stInfo)
    //         }
    //       });
    //       $("#table-report-raisehand").removeClass("d-none");
    //       if ($("#switch-showdetail").is(":checked")) {
    //         $(".report-detail").removeClass("d-none");
    //       } else {
    //         $(".report-detail").addClass("d-none");
    //       }
    //       $(".spinner-border").addClass("d-none");
    //     });
    // });

    // $("#submit-tab").click(function (ev) {
    //   progress = 0;
    //   table_submit_report.clear().draw();
    //   $(".spinner-border").removeClass("d-none");
    //   $("#table-report-submit").removeClass("d-none");
    //   let map = new Map(); //Map để chứa thông tin từng sinh viên, key của map là ID - tên sv, Values là một mảng
    //   let ex = [];
    //   firebase
    //     .firestore()
    //     .collection("rooms")
    //     .doc(getRoomID())
    //     .collection("surveys")
    //     .onSnapshot((snapshot) => {
    //       //Mỗi lần data surveys thay đổi (khi có ai đó làm 1 câu mới)
    //       snapshot.docChanges().forEach((change) => {
    //         //Duyet tung thay đổi
    //         let doc = change.doc;
    //         if (doc.id.includes("-")) {
    //           let obj = change.doc.data();
    //           if (change.type === "added") {
    //             //Khi có 1 ai đó làm câu nào đó chưa ai làm
    //             ex.push(doc.id); //đưa id câu hỏi vào mảng ex. Mảng ex bằng số lượng câu hỏi.
    //           }
    //           if (change.type === "modified") {
    //             //Nếu có 1 ai đó làm 1 câu mà đã có người làm rồi
    //           }
    //           if (obj.answers != null) {
    //             //Cập nhật Answer cho ngươi này
    //             for (let i = 0; i < obj.answers.length; i++) {
    //               let a = map.get(obj.answers[i]);
    //               if (a == null) {
    //                 a = [doc.id];
    //               } else {
    //                 a.push(doc.id);
    //               }
    //               map.set(obj.answers[i], a); //Đưa câu mảng trả lời vào map
    //             }
    //           }
    //         }
    //       });

    //       ex.sort(function (a, b) {
    //         let a1 = a.split("-");
    //         let b1 = b.split("-");
    //         return a1[a1.length - 1] - b1[b1.length - 1];
    //       });

    //       for (const [key, value] of map) {
    //         let arr = key.split("-");
    //         let id = arr[0].trim(); //ID
    //         let name = arr[1].trim(); //Tên SV
    //         let step = "<span class = 'step'>";
    //         //sắp xếp giá trị mảng theo tăng dần
    //         for (let i = 0; i < ex.length; i++) {
    //           let arr = ex[i].split("-");
    //           if (arr.length > 1) {
    //             let ex_id = arr[arr.length - 1];
    //             if (value.includes(ex[i]))
    //               step =
    //                 step +
    //                 "<span class ='labStep me-1 labStepColor4' id=" +
    //                 id +
    //                 "_" +
    //                 i +
    //                 ">" +
    //                 ex_id +
    //                 "</span>";
    //             else
    //               step =
    //                 step +
    //                 "<span class ='labStep me-1' id=" +
    //                 id +
    //                 "_" +
    //                 i +
    //                 ">" +
    //                 ex_id +
    //                 "</span>";
    //           }
    //         }
    //         let tdThreeDots =
    //           "<td className='text-right align-middle'><a href='#' className='bi bi-three-dots-vertical' data-bs-toggle='dropdown'></a> <div className='dropdown-menu'><a className='dropdown-item' href='#' onClick='deleteUserReport(\"" +
    //           id +
    //           "\")'>Xóa</a> </div></td>";
    //         let firstName = name.split(" ").slice(0, -1).join(" ");
    //         let lastName = name.split(" ").slice(-1).join(" ");
    //         //Thêm dòng hoặc sửa dòng
    //         //Thêm dòng khi người này chưa trả lời câu nào

    //         //Sửa dòng khi người này
    //         if ($("tr#" + id).length) {
    //           //Nếu đã có người này trong báo cáo
    //           $("tr#" + id + " td:nth-child(3)").html(step);
    //         } else {
    //           //Nếu chưa có người này
    //           table_submit_report.row
    //             .add([firstName, lastName, step, "", tdThreeDots])
    //             .node().id = id;
    //           table_submit_report.draw(false);
    //         }
    //         // table_submit_report.columns.adjust().draw();
    //         //$("#tbody-report-submit").append("<tr  id='tr-report-" + id + "'><td className='user-name'>" + name + "</td>" + step + tdThreeDots + "</tr>")
    //       }

    //       if ($("#switch-showdetail").is(":checked")) {
    //         $(".report-detail").removeClass("d-none");
    //       } else {
    //         $(".report-detail").addClass("d-none");
    //       }
    //       $("#submit-spinner").addClass("d-none");
    //     });

    //   $("#get-mark").click(function (e) {
    //     //Chấm điểm
    //     //Lấy bài làm của người chấm
    //     $("#get-mark").addClass("d-none");
    //     progress = 0;
    //     mapAllAnswers = new Map(); //QuizID, MapAnswer
    //     mapAllUsers = new Map();
    //     let answers = map.get(curUser.uid + " - " + curUser.displayName);
    //     answers.forEach((questionid) => {
    //       //Lấy ra từng câu hỏi của người chấm
    //       getAllAnswers(curRoom.roomID, questionid, answers.length); //Truy cập vào thông tin của câu hỏi
    //     });
    //   });
    // });
  });

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Báo cáo</Modal.Title>
        <div className="custom-control custom-switch d-none d-sm-inline">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switch-fullscreen"
            />
            <label className="form-check-label" for="switch-fullscreen">
              Toàn màn hình
            </label>
          </div>
          <input
            type="checkbox"
            className="custom-control-input"
            id="switch-showmember"
          />
          <label className="custom-control-label me-3" for="switch-showmember">
            Hiện DS lớp
          </label>

          <input
            type="checkbox"
            className="custom-control-input"
            id="switch-showdetail"
          />
          <label className="custom-control-label" for="switch-showdetail">
            Hiện chi tiết
          </label>
        </div>
      </Modal.Header>
      <Modal.Body>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="practice-tab"
              data-bs-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="practice"
              aria-selected="false"
            >
              Thực hành
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="raisehand-tab"
              data-bs-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="raisehand"
              aria-selected="true"
            >
              Giơ tay
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="submit-tab"
              data-bs-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="submit"
              aria-selected="false"
            >
              Nộp bài
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane  active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="practice-tab"
          >
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                role="status"
                id="practice-spinner"
              ></div>
            </div>
            <table id="table-practice-report" className="table table-striped">
              <thead>
                <tr>
                  <th>Họ đệm</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Truy cập</th>
                  <th>Bước thực hành</th>
                  <th>Tổng thời gian</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <button id="get-attendance" type="button" className="btn btn-success">
              Điểm danh
            </button>
          </div>

          <div
            className="tab-pane  show  pt-3"
            id="home"
            role="tabpanel"
            aria-labelledby="raisehand-tab"
          >
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                role="status"
                id="raisehand-spinner"
              ></div>
            </div>
            <table id="table-raisehand-report" className="table table-striped">
              <thead>
                <tr>
                  <th>Họ đệm</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Truy cập</th>
                  <th>Giơ tay</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div
            className="tab-pane  pt-3"
            id="contact"
            role="tabpanel"
            aria-labelledby="submit-tab"
          >
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                role="status"
                id="submit-spinner"
              ></div>
            </div>
            <table id="table-submit-report" className="table table-striped">
              <thead>
                <tr>
                  <th>Họ đệm</th>
                  <th>Tên</th>
                  <th>Nộp bài</th>
                  <th>Kết quả</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <button id="get-mark" type="button" className="btn btn-success">
              Chấm điểm
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onHide}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ReportModal;
