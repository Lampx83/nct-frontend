import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useFetch from "./fetch";
import config from "./config";
import axios from "axios";

export const useNewsPage = (categorySlug = null, authorSlug = null) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [authorName, setAuthorName] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  moment.locale("vi");

  useEffect(() => {
    if (categorySlug) {
      const fetchCategoryBySlug = async () => {
        try {
          const response = await axios.get(
            `${config.API_URL}/api/blog-categories?filters[slug][$eq]=${categorySlug}`
          )
          if (response.data.data.length > 0) {
            setCategoryId(response.data.data[0].id);
            setCategoryTitle(response.data.data[0].attributes.title);
            setAuthorName(null);
          }
        } catch (e) {
          console.log('Error fetching category:', e)
        }
      }
      fetchCategoryBySlug();
    }
  }, [categorySlug])
  
  const recentNewsParams = useMemo(
    () => ({
      populate: "*",
      pagination: { page, pageSize },
      ...(categoryId && {
        filters: { blog_category: { id: { $eq: categoryId } } },
      }),
      ...(authorSlug && {
        filters: { createdBy: { id: { $eq: authorSlug.split("-").pop() } } }
      }),
      sort: ["eventDate:desc", "createdAt:desc"],
    }),
    [page, pageSize, categoryId, authorSlug]
  );

  const previousNewsParams = useMemo(
    () => ({
      populate: "*",
      pagination: { start: 0, limit: 4 },
      sort: "createdAt:asc",
    }),
    []
  );

  const categoriesParams = useMemo(
    () => ({
      populate: "blogs",
    }),
    []
  );

  const {
    data: recentNewsData,
    error: recentNewsError,
    loading: recentNewsLoading,
  } = useFetch(`${config.API_URL}/api/blogs`, recentNewsParams);

  const {
    data: previousNewsData,
    error: previousNewsError,
    loading: previousNewsLoading,
  } = useFetch(`${config.API_URL}/api/blogs`, previousNewsParams);

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch(`${config.API_URL}/api/blog-categories`, categoriesParams);

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      recentNewsData &&
      newPage <= recentNewsData.meta.pagination.pageCount
    ) {
      setPage(newPage);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.querySelector("input").value;
    navigate(`/search?query=${query}`);
  };

  const loading = recentNewsLoading || previousNewsLoading || categoriesLoading;
  const apiError = recentNewsError || previousNewsError || categoriesError;

  const recentNews = recentNewsData ? recentNewsData.data : [];
  const totalPages = recentNewsData
    ? recentNewsData.meta.pagination.pageCount
    : 1;
  const previousNews = previousNewsData ? previousNewsData.data : [];
  const categories = categoriesData ? categoriesData.data : [];

  const sortedRecentNews = useMemo(() => {
    if (!recentNewsData) return [];

    return [...recentNewsData.data].sort((a, b) => {
      if (a.attributes.pin !== b.attributes.pin) {
        return a.attributes.pin ? -1 : 1;
      }

      // If both posts have the same pin status, sort by eventDate or createdAt
      const dateA = a.attributes.eventDate || a.attributes.createdAt;
      const dateB = b.attributes.eventDate || b.attributes.createdAt;

      return new Date(dateB) - new Date(dateA); // Sort by latest date first
    });
  }, [recentNewsData]);

  useEffect(() => {
    if (recentNewsData?.data?.length > 0 && authorSlug) {
      setAuthorName(`${recentNewsData?.data[0]?.attributes?.createdBy?.data?.attributes?.firstname} ${recentNewsData?.data[0]?.attributes?.createdBy?.data?.attributes?.lastname}`)
      setCategoryTitle(null);
      setCategoryId(null);
    }
  }, [authorSlug, recentNewsData]);

  // Combine all possible errors
  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError]);

  return {
    page,
    totalPages,
    recentNews: sortedRecentNews,
    previousNews,
    categories,
    handlePageChange,
    handleSearchSubmit,
    loading,
    error,
    categoryTitle,
    authorName,
  };
};
