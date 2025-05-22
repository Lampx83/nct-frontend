import Tuyensinh from "@/containers/tuyensinh";
async function getBlogs() {
    const response = await fetch(
      `https://nct-frontend-liard.vercel.app/admin/api/blogs?populate=*&sort=createdAt:desc&filters[blog_category][id][$eq]=6`,
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

export default async function NewsPage() {
  const { newsData, allNews } = await getBlogs();

  return (
    <div>
      <Tuyensinh newsData={newsData} allNews={allNews} />
    </div>
  );
}
