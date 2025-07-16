import Visible from "@/containers/Visible";


async function getVisible() {
    const res = await fetch ('https://nct.neu.edu.vn/admin/api/vision-page?populate=deep,3', {
        cache: "no-cache"
    });
    const data = await res.json();

    return data.data.attributes.content;
    
}


export default async function Page() {
    const dataVisible = await getVisible();
    return (
       <div> <Visible dataVisible = {dataVisible}/></div>
    );
}
