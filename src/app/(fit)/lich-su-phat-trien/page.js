import History from "@/containers/History";


async function getHistory() {
    const res = await fetch ('https://nct.neu.edu.vn/admin/api/history-page?populate=deep,3', {
        cache: "no-cache"
    });
    const data = await res.json();

    return data.data.attributes.content;
    
}


export default async function Page() {
    const dataHistory = await getHistory();
    return (
       <div> <History dataHistory = {dataHistory}/></div>
    );
}
