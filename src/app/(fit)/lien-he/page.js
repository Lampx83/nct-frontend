import Getintouch from "@/containers/Getintouch";

async function getGetintouch() {
    const res = await fetch ('https://nct.neu.edu.vn/admin/api/contact-info?populate=deep,3', {
        cache: "no-cache"
    });
    const data = await res.json();

    return data.data.attributes;
    
}


export default async function Page() {
    const dataGetintouch = await getGetintouch();
    return (
       <div> <Getintouch dataGetintouch = {dataGetintouch}/></div>
    );
}
