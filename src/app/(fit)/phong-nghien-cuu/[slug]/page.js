import LabsInfo from "@/components/labs/LabsInfo";
import axios from "axios";
async function getData(id) {
  const res = await axios.get(
    `https://nct-frontend-liard.vercel.app/admin/api/labs?filters[id][$eq]=${id}&populate=*`
  );
  return res.data;
}

export default async function Page({ params }) {
  console.log(params);
  const resData = await getData(params.slug);
  return <LabsInfo lab={resData.data[0]}/>;
}
