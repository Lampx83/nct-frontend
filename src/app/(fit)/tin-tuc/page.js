import Tintuc from "@/components/tin-tuc/Tintuc";

async function getBlogs() {
    const response = await fetch(
      `https://nct-frontend-liard.vercel.app/admin/api/blogs?populate=*`,
      {
        cache: "no-store"
      }
    );
    const data = await response.json();

    return {
      newsData: data.data, 
      allNews: data.data, // allNews chứa danh sách bài viết
    };
}

export default async function NewsPage() {
  const { newsData, allNews } = await getBlogs();

  return (
    <div>
      <Tintuc newsData={newsData} allNews={allNews} />
    </div>
  );
}
