"use client"
import { Portfolio } from "../components/trangchinh/anh";
import { News } from "../components/trangchinh/tintuc";
import { Intro } from "../components/trangchinh/intro";
import { Events } from "../components/trangchinh/sukien";
import { FaqSection } from "../components/trangchinh/cauhoi";
import VideoBackground from '../components/VideoBackground';
import Service from "@/components/home/Service";
import StatsSection from '../components/trangchinh/fact';
import Khoa from '../components/trangchinh/khoa';
import CustomCarousel from "@/components/home/CustomCarousel";
import SlideInWhenVisible from "@/components/SlideInWhenVisible";

export default function TrangChinh() { 

  return (
    <>
        <VideoBackground/>
        <SlideInWhenVisible direction="up"><Intro/></SlideInWhenVisible>
        <SlideInWhenVisible direction="left"><Khoa/></SlideInWhenVisible>
        {/* <Service/> */}
        <SlideInWhenVisible direction="right"><StatsSection/></SlideInWhenVisible>
        <SlideInWhenVisible direction="down"><News/></SlideInWhenVisible>
        <SlideInWhenVisible direction="up"><Events/></SlideInWhenVisible>
        {/* <FaqSection/> */}
        <SlideInWhenVisible direction="up"><Portfolio /></SlideInWhenVisible>
    </>
  );
}