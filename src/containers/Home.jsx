"use client"
import React, { useEffect, useState } from "react";
import Service from "../components/home/Service";
import Carousel from "../components/home/CustomCarousel";
import News from "../components/home/News";
import Facts from "../components/home/Facts";
import Partners from "../components/home/Partners";
import Enrollment from "../components/home/Enrollment";
import TopStudent from "../components/home/TopStudent";
import Gallery from '../components/home/Gallery';
import Video from '../components/home/Video';

export default function Home() {
  const [seoData, setSeoData] = useState(null);
  useEffect(() => {
    async function fetchSeoData() {
      try {

        const response = await fetch("https://fit.neu.edu.vn/admin/api/index-page?populate=*");
        const data = await response.json();

        // Check if data exists and is structured as expected
        if (data?.data?.attributes?.seo) {
          const seo = data.data.attributes.seo;
          const imageUrl = seo.metaImage?.data?.attributes?.url;

          setSeoData({
            title: seo.metaTitle || "Trang chủ | Khoa Công nghệ thông tin",
            description: seo.metaDescription || "Khoa Công nghệ thông tin",
            keywords: seo.keywords || "",
            canonicalURL: seo.canonicalURL || "",
            image: imageUrl ? `https://fit.neu.edu.vn${imageUrl}` : ""  // Ensure full URL
          });
        } else {
          console.warn("SEO data is missing or incorrectly structured.");
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    }

    fetchSeoData();
  }, []);

  if (!seoData) return null;  // Render nothing if seoData is not yet set

  return (
    <>
      <Carousel />
      <Service />
      <Video />
      <News />
      <Facts />
      <Enrollment />
      {/* <TopStudent /> */}
      <Gallery />
      <Partners />
    </>
  );
}