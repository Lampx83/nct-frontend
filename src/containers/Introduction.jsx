"use client";
import React, { useEffect } from "react";
import useFetch from "../utils/fetch";
import config from "../utils/config";
import PageHeader from "../components/IntroInfo/PageHeader";
import IntroContent from "../components/IntroInfo/IntroContent";

import DetailSection from "../components/IntroInfo/DetailSection";
// import Spinner from "./Spinner";

export default function Introduction() {
  useEffect(() => {
    document.title = "Giới thiệu | Khoa Công nghệ thông tin";
  }, []);
  const {
    data: infoData,
    error,
    loading,
  } = useFetch(`${config.API_URL}/api/info-page?populate=*`);

  if (loading) return null;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const {
    generalIntroduction,
    missions,
    functions,
    visions,
    additionalInfo,
    thumbnail,
  } = infoData.data.attributes;

  return (
    <>
      <PageHeader
        title="Giới thiệu Khoa Công nghệ thông tin"
        backgroundImage="/images/background-1.png"
      />

      <IntroContent
        generalIntroduction={generalIntroduction}
        thumbnail={thumbnail.data.attributes.url}
      />
  
      <DetailSection
        missions={missions}
        functions={functions}
        visions={visions}
        additionalInfo={additionalInfo}
      />
    </>
  );
}
