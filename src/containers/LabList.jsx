import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import NavBar from '../components/codelab/NavBar';
import Heroes from '../components/codelab/Heroes';
import Footer from '../components/codelab/Footer';
import Cards from '../components/codelab/Cards';
import LoginModal from "../modals/LoginModal";
import app from "../firebase";
import firebase from "firebase/compat/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function LabList() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter();
    const cardType = router.pathname === '/home' ? 'mydocs' : 'features';

    const handleCloseLogin = () => {
        setShowLogin(false);
    }

    const onShowLogin = () => {
        setShowLogin(true)
    };

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else setUser(null);
            setShowLogin(false)
            setLoading(false);
        });
    }, []);

    return (<>
        <NavBar onShowLogin={onShowLogin} user={user} />
        {router.pathname === '/home' ?
            <Cards type={cardType} user={user} /> :
            <Heroes user={user} onShowLogin={onShowLogin} loading={loading} />}
        <Footer />
        <LoginModal
            show={showLogin}
            user={user}
            handleClose={handleCloseLogin}
            onSignOut={() => {
                firebase.auth().signOut();
            }}
        />
    </>);
}

export default LabList;