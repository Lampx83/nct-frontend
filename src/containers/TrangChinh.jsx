"use client"
import { Portfolio } from "../components/trangchinh/anh";
import { News } from "../components/trangchinh/tintuc";
import { Intro } from "../components/trangchinh/intro";
import { Events } from "../components/trangchinh/sukien";
import { FaqSection } from "../components/trangchinh/cauhoi";
import VideoBackground from '../components/VideoBackground';
import StatsSection from '../components/trangchinh/fact';
import Khoa from '../components/trangchinh/khoa';

export default function TrangChinh() { 

  return (
    <>
        <VideoBackground/>
        <Intro/>
        <Khoa/>
        <StatsSection/>
        <News/>
        <Events/>
        {/* <FaqSection/> */}
        <Portfolio />
    </>
  );
}