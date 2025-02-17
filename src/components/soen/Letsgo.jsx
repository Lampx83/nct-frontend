import Letsgo1 from "./imgs/Letsgo1.jpg";
import SendForm from "./SendForm";
import Image from "next/image"

function Letsgo() {
    return (
        <>
            <div className="container">
                <h1>HỌC KỸ NGHỆ PHẦN MỀM</h1>
                <h2>Đến Trường Công nghệ Đại Học Kinh Tế Quốc Dân</h2>
                <div className="row">
                    <div className="col-md-8">
                        <Image src={Letsgo1} alt="Lets Go" style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="col-md-4">
                        <SendForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Letsgo;
