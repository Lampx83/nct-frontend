// File: app/head.js
import Head from "next/head";
export default function HeadComponent() {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="canonical" href="https://fit.neu.edu.vn/" />
    </Head>
  );
}
