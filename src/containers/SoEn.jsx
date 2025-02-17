"use client";
import React, { useEffect, useState } from "react";
import IntroInfo from "../components/soen/IntroInfro.jsx";
import Admission from "../components/soen/Admission.jsx";
import Letsgo from "../components/soen/Letsgo.jsx";
import Service from "../components/soen/Service.jsx";
import Carousel from '../components/soen/Carousel.jsx';
import SEImageGalery from "../components/soen/SEImageGallery.jsx";
import NewsTS from "../components/soen/NewsTS.jsx";
import Enrollment from "../components/soen/Enrollment.jsx";
const SoEn = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        document.title = "Software Engineer | Kỹ nghệ phần mềm";
    }, []);
    return (
        <React.Fragment>
            <div style={{ fontSize: "18px" }}>
                <Carousel />
                <div className="p-3">
                    <IntroInfo />
                </div>
                <Service />
                <Admission />
                <Enrollment/>
                <NewsTS/>
                <SEImageGalery />
                <Letsgo />
            </div>
        </React.Fragment>
    )
}

export default SoEn;

