"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Document from "@/containers/Document";
import { renderDoc } from "@/utils/codelab";
import { Spin } from "antd"; 

const Loading = () => {
    return (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spin size="large" /> 
        </div>
    );
};

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params?.slug;
  const chap = searchParams.get("chap"); 

  const [dataResponse, setDataResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const url = new URL(`https://fit.neu.edu.vn/codelab/api/doc/${slug.join("/")}`);
        // const url = new URL(`http://localhost:8015/api/doc/${slug.join("/")}`);
        if (chap) url.searchParams.append("chap", chap);
        const response = await fetch(url);
        const data = await response.json();
        setDataResponse(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [chap, slug]); 

  if (loading) return <Loading></Loading>;

  if (!dataResponse) return <p>Không có dữ liệu</p>;
  console.log(dataResponse)

  const { steps, contents, listChapter } = renderDoc(dataResponse);
  return (
    <Document
      dataResponse={dataResponse}
      isRoomInPath={false}
      url={`https://fit.neu.edu.vn/codelab/api/doc/${slug.join("/")}`}
      steps={steps}
      contents={contents}
      listChapter={listChapter}
      chap={parseInt(chap, 0)}
    />
  );
}
