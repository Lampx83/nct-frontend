"use client"
// components/IntroInfo.js
import React, {useEffect} from "react";
import useFetch from "../utils/fetch";
import config from "../utils/config";
// import PageHeader from "../components/IntroInfo/PageHeader";
// import IntroContent from "../components/IntroInfo/IntroContent";
import DetailSection from "../components/IntroInfo/DetailSection";
import Spinner from "../containers/Spinner";
import NewsLab from "../components/edtechlab/NewsLab";
import MembersLab from "../components/edtechlab/MembersLab";
import ScheduleLab from "../components/edtechlab/ScheduleLab";
import OutputLab from "../components/edtechlab/OutputLab";
import IntroLab from "../components/edtechlab/IntroLab";
import RegisterLab from "../components/edtechlab/RegisterLab";
import PresentDoneLab from "../components/edtechlab/PresentDoneLab";

const EdTechLab = () => {
  useEffect(()=>{
    document.title = "Edtech Inovation Lab";
  },[]);
  const {
    data: infoData,
    error,
    loading,
  } = useFetch(`${config.API_URL}/api/edtech-lab?populate=*`);

  if (loading) return <Spinner />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const {
    introduction
  } = infoData.data.attributes;

  return (
    <>
      <IntroLab/>
      {/* <PageHeader /> */}
      {/* <IntroContent
        // generalIntroduction={introduction}
        // thumbnail={imagesLibrary.data.attributes.url}
      /> */}
      <DetailSection
        additionalInfo={introduction}
      />
       <NewsLab/>
     <ScheduleLab/> 
      <PresentDoneLab/>
     <MembersLab/>
      <RegisterLab/>
      <OutputLab/> 
    </>
  );
};

export default EdTechLab;