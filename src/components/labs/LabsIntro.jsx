"use client";
export default function LabsIntro({description}) {
    if (!description) return <p>Loading...</p>
    return (
        <div className="row">
            <h1 className="text-xl font-bold my-3 text-center fs-bolder">PHÒNG NGHIÊN CỨU</h1>
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}