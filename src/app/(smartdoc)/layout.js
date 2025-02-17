//app/[locale] / (client) / layout.js
import "@/scss/main.scss";
import "@/globals.css";
import "@/css/animate.min.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import HeadComponent from "./head";
import { notFound } from "next/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/utils/analytics";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import { ConfigProvider, Spin } from "antd";

export const metadata = {
  title: {
    absolute: "Khoa Công nghệ thông tin NEU",
    default: "Khoa Công nghệ thông tin NEU",
    template: " %s | Khoa Công nghệ thông tin NEU",
  },
  description:
    "Khoa Công nghệ thông tin NEU, Trường công nghệ,  Đại học Kinh tế Quốc dân (NEU)",
};

// Layout component
export default async function RootLayout({ children, params }) {
  return (
    <html>
      <HeadComponent></HeadComponent>
      <head>

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@600;700&family=Ubuntu:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js"
          integrity="sha512-Rd5Gf5A6chsunOJte+gKWyECMqkG8MgBYD1u80LOOJBfl6ka9CtatRrD4P0P5Q5V/z/ecvOCSYC8tLoWNrCpPg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>

        <Script>new WOW().init();</Script>
      </head>
      <body>
        <Suspense fallback={<Loading />}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#085ca7",
                },
                components: {
                  Table: {
                    headerBg: "#085ca7",
                    headerColor: "var(--bs-white)",
                    borderColor: "#dddddd",
                    fontSize: "1rem",
                  },
                },
              }}
            >
              <RouteChangeTracker />
              <div style={{ minHeight: "50vh" }}>{children}</div>
            </ConfigProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
