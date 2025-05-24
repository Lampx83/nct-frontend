import Tintuc from "@/components/tin-tuc/Tintuc";

async function getBlogs() {
    const response = await fetch(
      `https://nct.neu.edu.vn/admin/api/blogs?populate=*&sort=eventDate:desc`,
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
async function getImage() {
    const response = await fetch(
      `https://nct.neu.edu.vn/admin/api/news-page?populate=*`,
      {
        cache: "no-store"
      }
    );
    
    const data = await response.json();

    return data.data.attributes.thumbnail;
}

export default async function NewsPage() {
  const { newsData, allNews } = await getBlogs();
  const thumbnail = await getImage();

  return (
    <div>
      <Tintuc newsData={newsData} allNews={allNews} thumbnail={thumbnail}/>
    </div>
  );
}
