import Tuyensinh from "@/containers/tuyensinh";
async function getBlogs() {
    const response = await fetch(
      `https://nct.neu.edu.vn/admin/api/blogs?populate=*&sort=createdAt:desc&filters[blog_category][id][$eq]=6`,
      {
        cache: "no-store"
      }
    );
    const data = await response.json();

    return {
      newsData: data.data, 
      allNews: data.data, 
    };
}
async function getImage() {
    const response = await fetch(
      "https://nct.neu.edu.vn/admin/api/enrollment-page?populate=*",
      {
        cache: "no-store"
      }
    );
    const data = await response.json();

    return  data.data.attributes.thumbnail;
}


export default async function NewsPage() {
  const { newsData, allNews } = await getBlogs();
  const thumbnail = await getImage();

  return (
    <div>
      <Tuyensinh newsData={newsData} allNews={allNews} thumbnail={thumbnail} />
    </div>
  );
}
