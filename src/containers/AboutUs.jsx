"use client"
import Image from "next/image";

const AboustUs = (AboustUs) =>{
    console.log(AboustUs)
    return(
        <>
        <div style={{ textAlign: "center" }}>
                    <img
                        src="/images/Topbanner.jpg" 
                        
                        alt="Banner Tin tức"
                        style={{ width: "100%",
                            maxHeight: "500px",
                            objectFit: "cover",
                            overlay: "rgba(0,0,0,0.483)",
                            backgroundColor: "rgb(255,255,255)"

                            }}
                    />
                </div>
        </>
    )
}
export default AboustUs