import React from 'react';

const UserMenu = ({ user, onLogout, teacher }) => {
    return (<div className="dropdown">
        <div data-bs-toggle="dropdown">
            <img
                id="avatar"
                src="/images/user.svg"
                width="38x"
                height="38x"
                className="user avatar rounded-circle dropdown-toggle"
                alt="user"
            />
            {teacher !== user?.uid && (<span className="text-primary user fw-bold ms-2 d-none d-lg-inline">{user.displayName}</span>)}
        </div>
        <ul
            className="dropdown-menu"
            aria-labelledby="dropdownUser1"
            style={{ right: '110px', maxWidth: '200px' }} // Adjust the style here
        >
            {/*<li>*/}
            {/*    <a className="dropdown-item" href="/mylabs">*/}
            {/*        Quản lý bài học*/}
            {/*    </a>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*    <a className="dropdown-item" href="/myclasses">*/}
            {/*        Quản lý lớp học*/}
            {/*    </a>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*    <a*/}
            {/*        className="dropdown-item"*/}
            {/*        href="/#"*/}
            {/*        data-bs-toggle="modal"*/}
            {/*        data-bs-target="#modal-login"*/}
            {/*    >*/}
            {/*        Tài khoản*/}
            {/*    </a>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*    <hr className="dropdown-divider"/>*/}
            {/*</li>*/}
            <li>
                <a className="dropdown-item" onClick={onLogout}>
                    Đăng xuất
                </a>
            </li>
        </ul>
    </div>);
};

export default UserMenu;
