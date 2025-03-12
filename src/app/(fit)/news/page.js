import Tintuc from "@/components/tin-tuc/Tintuc";

async function getBlogs(page) {
    const response = await fetch(
      `https://nct-frontend-liard.vercel.app/admin/api/blogs?populate=*`
    );
    const data = await response.json();
    
    return {
      newsData: data.data    };
}

export default async function NewsPage() {
  const { newsData } = await getBlogs();

  return (
    <div>
      <Tintuc
        newsData={newsData}
      />
    </div>
  );
}
