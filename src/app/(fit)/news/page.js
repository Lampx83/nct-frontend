import Tintuc from "@/components/news/Tintuc";

async function getBlogs(slug) {
    const response = await fetch(
      "https://nct-frontend-liard.vercel.app/admin/api/blogs"
    );
    const data = await response.json();
    console.log(data);
    return {
      newsData: data.data, 
      totalPages: data.meta.pagination.total
  }
}

export default async function NewsPage(params) {
  const slug = params.slug;
  const {newsData, totalPages} = await getBlogs(slug);
  return (
    <div>
      <Tintuc
        newsData ={newsData}
        totalPages = {totalPages}
        slug = {slug}
        />
    </div>
  );
}
