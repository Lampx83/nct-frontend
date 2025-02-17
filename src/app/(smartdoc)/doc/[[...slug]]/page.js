import { denormalizeSubjectCode } from "@/helpers/curriculumTable";
import Document from "@/containers/Document";
import { renderDoc } from "@/utils/codelab";


export default async function Page({ params, searchParams }) {
  const { slug } = (await params) || {};
  const { chap } = (await searchParams) || 0;
  const isRoomInPath = false
  const url = new URL(`https://fit.neu.edu.vn/codelab/api/doc/${slug.join("/")}`);
  url.searchParams.append("chap", chap || 0); // Thêm chap vào URL nếu có
  const response = await fetch(url);
  const dataResponse = await response.json();
  const { steps, contents, listChapter } = renderDoc(dataResponse);

  return (
    <Document
      dataResponse={dataResponse}
      isRoomInPath={true}
      url={url.toString()}
      steps={steps}
      contents={contents}
      listChapter={listChapter}
      chap={parseInt(chap, 0)}
    />
  );
}
