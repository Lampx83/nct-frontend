import { useMemo } from "react";
import axios from "axios";
import NewsPage from "@/components/news/NewsPage";
import config from "@/utils/config";

async function getData(slug, page) {
  const response = await axios.get(
    `${config.API_URL}/api/blog-categories?filters[slug][$eq]=${slug}`
  );

  const categoryId = null;
  const authorSlug = null;
  const pageSize = 5;

  const recentNewsParams = {
    populate: "*",
    pagination: { page, pageSize },
    ...(categoryId && {
      filters: { blog_category: { id: { $eq: categoryId } } },
    }),
    ...(authorSlug && {
      filters: { createdBy: { id: { $eq: authorSlug.split("-").pop() } } },
    }),
    sort: ["eventDate:desc", "createdAt:desc"],
  };
  // Gọi API lấy dữ liệu bài viết gần đây
  const recentNewsResponse = await axios.get(`${config.API_URL}/api/blogs`, {
    params: recentNewsParams,
  });
  const recentNewsData = recentNewsResponse.data;

  const categoryTitle = "Tin tức";
  const authorName = null;
  const response3 = await axios.get(
    `${config.API_URL}/api/blog-categories?populate=blogs`
  );

  const categories = response3.data.data;
  const recentNews = recentNewsData ? recentNewsData.data : [];
  const totalPages = recentNewsData
    ? recentNewsData.meta.pagination.pageCount
    : 1;

  return { categoryTitle, authorName, categories, recentNews, totalPages }; // Trả về dữ liệu cần thiết
}

export default async function Page({ params, searchParams }) {
  const page = searchParams.page || 1;

  const { categoryTitle, authorName, categories, recentNews, totalPages } =
    await getData(params.slug, page);
  return (
    <NewsPage
      categoryTitle={categoryTitle}
      authorName={authorName}
      categories={categories}
      recentNews={recentNews}
      totalPages={totalPages}
      page={page}
      slug={params.slug}
    />
  );
}
