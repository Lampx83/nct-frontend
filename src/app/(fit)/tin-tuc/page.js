import Tintuc from "@/components/tin-tuc/Tintuc";

async function getBlogs(page = 1, pageSize = 9) {
  const response = await fetch(
    `https://nct.neu.edu.vn/admin/api/blogs?populate=*&sort=eventDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      cache: "no-store"
    }
  );

  const data = await response.json();

  return {
    newsData: data.data,
    pagination: data.meta.pagination
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

export default async function NewsPage({ searchParams }) {
  const page = parseInt(searchParams?.page || '1'); // ví dụ ?page=2
  const { newsData, pagination } = await getBlogs(page);
  const thumbnail = await getImage();

  return (
    <div>
      <Tintuc newsData={newsData} pagination={pagination} thumbnail={thumbnail} />
    </div>
  );
}