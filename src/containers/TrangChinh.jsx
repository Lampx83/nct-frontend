"use client"
import { Portfolio } from "../components/trangchinh/anh";
import { News } from "../components/trangchinh/tintuc";
import { Intro } from "../components/trangchinh/intro";
import { Events } from "../components/trangchinh/sukien";
import  Video  from "../components/trangchinh/video";

export default function TrangChinh() { 

  return (
    <>
        <Video/>
        <Intro/>
        <News/>
        <Events/>
        <Portfolio />
    </>
  );
}