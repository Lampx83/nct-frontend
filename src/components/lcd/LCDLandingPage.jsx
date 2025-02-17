"use client"
import { React, useEffect } from "react";
import FacebookPage from "./FacebookPage";
import logo from './imgs/logo.png';
import LCDNews from "./LCDNews";
import LCDDepartments from "./LCDDepartments";
import LCDEvents from "./LCDEvents";
import LCDAchievement from "./LCDAchievement";
import LCDImageGallery from "./LCDImageGallery";
import TikTokEmbed from "./TikTokPage";
import Image from 'next/image';

export default function LCDLandingPage() {
  useEffect(() => {
    document.title = "Liên chi Đoàn | Khoa Công nghệ thông tin";
  }, []);

  return (
    <div className="">
      <header className="bg-primary py-4">
        <div className="container d-flex align-items-center justify-content-between">
          <Image src={logo} width={100} alt="Logo" />
          <h1 className="text-white m-0 fs-1" style={{ fontSize: "1.5rem", textAlign: "center", flex: 1 }}>
            LIÊN CHI ĐOÀN KHOA CÔNG NGHỆ THÔNG TIN
          </h1>
        </div>
      </header>

      <main className="my-5 container">
        <div className="row">
          <div className="col-lg-8">
            <LCDDepartments />
            <LCDEvents />
            <LCDAchievement />
            <LCDImageGallery />
          </div>

          <aside className="col-lg-4 d-flex flex-column gap-4">
            <LCDNews />
            <div className="px-2">
              <h5 className="fs-2">Kênh thông tin</h5>
              <hr className="my-4" />
              <FacebookPage />
              <p className="mb-5"></p>
              <TikTokEmbed
                embedType="video"
                videoId="7427467351307685137"
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}