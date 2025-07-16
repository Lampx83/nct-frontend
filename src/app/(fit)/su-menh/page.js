import Mission from "@/containers/Mission";

async function getMisson() {
    const res = await fetch ('https://nct.neu.edu.vn/admin/api/mission-page?populate=deep,3', {
        cache: "no-cache"
    });
    const data = await res.json();

    return data.data.attributes.content;
    
}


export default async function Page() {
    const dataMisson = await getMisson();
    return (
       <div> <Mission dataMisson = {dataMisson}/></div>
    );
}
