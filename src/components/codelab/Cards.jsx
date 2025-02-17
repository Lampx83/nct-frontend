import React, { useState, useEffect } from "react";
import config from '../../config.js';

import DocTypeChooseModal from "../../modals/DocTypeChooseModal";


function Cards({ type, user }) {
    const [showDocTypeChooseModal, setShowDocTypeChooseModal] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleShowDocTypeChooseModal = () => {
        setShowDocTypeChooseModal(true)
    };
    const handleCloseDocTypeChooseModal = () => {
        setShowDocTypeChooseModal(false)
    };
    useEffect(() => {
        async function fetchData() {
            try {
                if (type === "features") {
                    var response = await fetch(`${config.API_BASE_URL}/labs/features`);
                    const data = await response.json();
                    setData(data);
                    setIsLoading(false);
                } else {
                    if (user) {
                        let url = `${config.API_BASE_URL}/labs/mylabs/${user.uid}`;
                        response = await fetch(url);
                        const data = await response.json();
                        setData(data);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [user, type]);


    return (<div className="container">
        {isLoading ? (<div className="d-flex justify-content-center mt-5">
            <div
                className="spinner-border spinner-border"
                role="status"
                id="spiner-loading-card"
            ></div>
        </div>) : (<table className={`mt-5 table ${data.length === 0 ? 'table-borderless1' : ''}`}>
            <thead>
                <tr>
                    <th scope="col">Tên tài liệu</th>
                    <th scope="col">Đường dẫn</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (data.map((item) => (<tr key={item.title}>
                    <td>{item.name}</td>
                    <td>
                        <a href={`preview/${item.docID}`}>View</a>
                    </td>
                </tr>))) : (<tr>
                    <td colSpan="2">Không có tài liệu nào</td>
                </tr>)}
            </tbody>
            <caption>
                <button className="btn btn-primary" onClick={handleShowDocTypeChooseModal}>Thêm</button>
            </caption>
        </table>)}

        <DocTypeChooseModal
            show={showDocTypeChooseModal}
            user={user}
            handleClose={handleCloseDocTypeChooseModal}
        />

    </div>);
}

export default Cards;
