import Tintuc from "@/components/news/Tintuc";

async function getBlogs(page) {
    const pageSize = 6; // Số bài đăng trên mỗi trang
    const response = await fetch(
      `https://nct-frontend-liard.vercel.app/admin/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    const data = await response.json();
    
    return {
      newsData: data.data,
      totalPages: data.meta.pagination.pageCount // Tổng số trang
    };
}

export default async function NewsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1; // Chuyển page về kiểu số nguyên
  const { newsData, totalPages } = await getBlogs(page);

  return (
    <div>
      <Tintuc
        newsData={newsData}
        totalPages={totalPages}
        page={page}
      />
    </div>
  );
}
