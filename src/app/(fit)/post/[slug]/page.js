import NewsDetails from "@/components/tin-tuc/NewsDetails";

// Hàm lấy tất cả blog đã populate và sắp xếp theo ngày mới nhất
async function getBlogs() {
  const res = await fetch(
    "https://nct.neu.edu.vn/admin/api/blogs?populate=*&sort=eventDate:desc",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Lỗi khi gọi API");

  const data = await res.json();
  return data.data;
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const allBlogs = await getBlogs();
  const currentIndex = allBlogs.findIndex(
    (item) => item.attributes.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  if (currentIndex === -1) return <p>Không tìm thấy bài viết!</p>;

  const dataDetail = allBlogs[currentIndex].attributes;
  const top2Newest = allBlogs
    .filter((item) => item.attributes.slug !== slug)
    .slice(0, 2);
  const next3 = allBlogs.slice(currentIndex + 1, currentIndex + 4);
  const combinedNews = [...top2Newest, ...next3].filter(
    (item, index, self) => index === self.findIndex((i) => i.id === item.id)
  );
  const newsData = combinedNews.slice(0, 5);

  return <NewsDetails dataDetail={dataDetail} newsData={newsData} />;
}
