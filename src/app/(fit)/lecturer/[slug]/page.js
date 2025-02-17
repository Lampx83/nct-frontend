import LecturerInfo from "@/containers/LecturerInfo";
import axios from "axios";
async function getData(slug) {
  const res = await axios.get(
    `https://fit.neu.edu.vn/admin/api/lecturers?filters[slug][$eq]=${slug}&populate=*`
  );
  return res.data;
}

export default async function Page({ params }) {
  const resData = await getData(params.slug);
  return <LecturerInfo lecturer={resData.data[0]} slug={params.slug} />;
}
