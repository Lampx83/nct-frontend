import LabsInfo from "@/components/labs/LabsInfo";
import { data } from "@remix-run/router";
import axios from "axios";
async function getData(slug) {
  const res = await axios.get(
    `https://nct.neu.edu.vn/admin/api/labs?filters[slug][$eq]=${slug}&populate=*`
  );
  return res.data;
}
async function getDataActive(slug) {
    const response = await fetch(
      `https://nct.neu.edu.vn/admin/api/blogs?populate=*&sort=createdAt:desc&filters[blog_category][slug][$eq]=${slug}`,
      {
        cache: "no-store"
      }
    );
    const data = await response.json();

    return  data.data;
}


export default async function Page({ params }) {
  console.log(params);
  const resData = await getData(params.slug);
  const dataActive = await getDataActive(params.slug);
  return <LabsInfo lab={resData.data[0]} dataActive={dataActive}/>;
}
