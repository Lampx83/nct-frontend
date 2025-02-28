// app/posts/[slug]/page.js
import NewsDetails from "@/components/news/NewsDetails";

async function getBlogData(slug) {
  try {
    const response = await fetch("https://nct-frontend-liard.vercel.app/admin/api/blogs", {
      cache: "no-store", // Đảm bảo dữ liệu luôn cập nhật
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi gọi API: ${response.statusText}`);
    }

    const data = await response.json();

    // Tìm bài viết có slug khớp
    const filteredData = data.data.find(
      (item) => item.attributes.slug.trim().toLowerCase() === slug.trim().toLowerCase()
    );

    if (!filteredData) {
      return null;
    }

    return filteredData.attributes;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const newsData = await getBlogData(slug);

  if (!newsData) {
    return <p>Không tìm thấy bài viết!</p>;
  }

  return <NewsDetails newsData={newsData} />;
}
