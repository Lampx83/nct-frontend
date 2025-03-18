"use client";
import config from "@/utils/config";
import { motion } from "framer-motion";

const LearningEnviroment = ({ LearnEnvi, imageArray }) => {
    console.log(LearnEnvi);
    console.log(imageArray);

    const imageVariants = {
        initial: {
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const containerStyle = {
        width: "100%",
        height: "400px",
        overflow: "hidden",
        borderRadius: "20px",
        margin: "10px 5px",
        position: "relative",
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    return (
        <>
            <div style={{ position: "relative", textAlign: "center", overflow: "hidden" }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                ></div>
                <img
                    src="/images/230327_HoithaoTCDL_02-1.jpg"
                    alt="Banner Tin tức"
                    style={{
                        width: "100%",
                        maxHeight: "600px",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>
            <div className="container py-5">
                <div dangerouslySetInnerHTML={{ __html: LearnEnvi }}></div>
                {imageArray?.map((item, index) => (
                    index % 3 === 0 && (
                        <div className="row" key={index}>
                            <div className="col-md-6">
                                <div style={containerStyle}>
                                    <motion.img
                                        variants={imageVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        src={`${config.API_URL}${imageArray[index].attributes.url}`}
                                        alt={`Image ${index}`}
                                        style={imageStyle}
                                    />
                                </div>
                            </div>
                            {imageArray[index + 1] && (
                                <div className="col-md-6">
                                    <div style={containerStyle}>
                                        <motion.img
                                            variants={imageVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            src={`${config.API_URL}${imageArray[index + 1].attributes.url}`}
                                            alt={`Image ${index + 1}`}
                                            style={imageStyle}
                                        />
                                    </div>
                                </div>
                            )}
                            {imageArray[index + 2] && (
                                <div className="col-md-12">
                                    <div style={containerStyle}>
                                        <motion.img
                                            variants={imageVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            src={`${config.API_URL}${imageArray[index + 2].attributes.url}`}
                                            alt={`Image ${index + 2}`}
                                            style={imageStyle}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )).filter(Boolean)}
            </div>
        </>
    );
};

export default LearningEnviroment;