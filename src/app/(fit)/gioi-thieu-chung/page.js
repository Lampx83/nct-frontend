import Overview from "@/containers/Overview";


async function getOverview() {
    const res = await fetch ('https://nct.neu.edu.vn/admin/api/introduction?populate=deep,3', {
        cache: "no-cache"
    });
    const data = await res.json();

    return data.data.attributes.content;
    
}


export default async function Page() {
    const dataOverview = await getOverview();
    return (
       <div> <Overview dataOverview = {dataOverview}/></div>
    );
}
