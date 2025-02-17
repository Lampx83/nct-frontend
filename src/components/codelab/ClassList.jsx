import { SiGoogleclassroom } from "react-icons/si";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../firebase";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import Table from "react-bootstrap/Table";

export default function ClassList({ chap, room, users, setUsers }) {
  useEffect(() => {
    const db = getDatabase(app);
    const link = chap ? `/chap${chap}` : "";
    const userPath = `/labs/${room.docID.replace(/\./g, "")}/${
      room.roomID
    }${link}/users`;
    const userRef = ref(db, userPath);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const res = [];
        for (const [uid, info] of Object.entries(data)) {
          res.push({
            uid: uid,
            name: info.name,
            step: info.step,
            timestamp: info.timestamp,
            isRaise: info.isRaise,
          });
        }
        res.sort((a, b) => {
          if (a.isRaise && !b.isRaise) return -1;
          if (!a.isRaise && b.isRaise) return 1;
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setUsers(res);
      } else {
        setUsers([]);
      }
    });

    return () => {
      setUsers([]);
      unsubscribe();
    };
  }, [room, chap]);

  return (
    <>
      <OverlayTrigger
        placement={"bottom-end"}
        trigger={"click"}
        overlay={
          <Popover style={{ minWidth: 300 }}>
            <Popover.Body style={{ minWidth: 300 }}>
              <Table hover className={"m-0"}>
                <tbody style={{ fontSize: 18 }}>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className={"p-1"}>{user.name}</td>
                      {user?.isRaise && (
                        <td className={"p-1 text-end"}>
                          <span className={"badge"}>✋</span>
                        </td>
                      )}
                      <td colSpan={user.isRaise ? '' : 2}
                          className={"p-1 text-end"}>{user.step > 0 ? `Slide ${!!chap ? user.step - 1 : user.step}` : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Popover.Body>
          </Popover>
        }
      >
        <button className="btn btn-primary hide-expand ms-2 me-2">
          <div className={"d-flex gap-2 align-items-center"}>
            <SiGoogleclassroom />
            <span>Lớp học</span>
            <div>
              <span className={"badge badge-secondary bg-secondary"}>
                {users.length || 0}
              </span>
            </div>
          </div>
        </button>
      </OverlayTrigger>
    </>
  );
}
