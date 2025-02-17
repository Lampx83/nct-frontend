import NewsDetails from "@/components/news/NewsDetails";
import axios from "axios";
import config from "@/utils/config";

async function getData(slug) {
  const response1 = await axios.get(
    `${config.API_URL}/api/blogs/slug/${slug}?populate=*`
  );
  const newsData = response1.data.data.attributes
  const categorySlug = newsData.blog_category.data.attributes.slug;

  const response2 = await axios.get(
    `${config.API_URL}/api/blogs?populate=*&filters[blog_category][slug]=${categorySlug}&pagination[start]=0&pagination[limit]=4&sort=createdAt:desc`
  );

  const previousNews = response2.data.data.filter(news => news.attributes.slug !== slug);;

  const response3 = await axios.get(
    `${config.API_URL}/api/blog-categories?populate=blogs`
  );

  const categories = response3.data.data
  return { newsData, previousNews, categories }; // Trả về dữ liệu cần thiết
}
export default async function Page({ params }) {
  const { newsData, previousNews, categories } = await getData(params.slug);
  return (
    <NewsDetails newsData={newsData} previousNews={previousNews} categories={categories} />
  );
}
