// app/majors/[slug]/page.js
import axios from 'axios';
import Major from "@/containers/Major";

async function getMajor(slug) {
  const res = await axios.get(`https://fit.neu.edu.vn/admin/api/majors/slug/${slug}`);
  return res.data; // Trả về dữ liệu cần thiết
}

export default async function Page({ params }) {
  const majorData = await getMajor(params.slug);
  return <Major majorData={majorData.data} slug={params.slug} />; 
}
