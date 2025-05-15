import { denormalizeSubjectCode } from "@/helpers/curriculumTable";
import Syllabus from "@/components/Syllabus";
import { convertKNumber } from "@/constant/versionSyllabus";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params || {};
  const validateParams = denormalizeSubjectCode(slug?.toString().replaceAll(",", "/"));

  const language = validateParams.split("/")[1]; // Giả sử slug là dạng 'K67/vi/LLNL1105'
  const courseCode = validateParams.split("/").slice(-1)[0]; // Lấy mã môn học (phần cuối cùng của URL)
  let KNumber = validateParams.split("/")[0]; // Giả sử slug là dạng 'K67/vi/LLNL1105'
  KNumber = convertKNumber(KNumber);

  const canonicalBaseURL = `https://fit.neu.edu.vn/syllabus/${KNumber}/${language}`;
  const canonicalURL = `${canonicalBaseURL}/${courseCode}`;
  const url = `https://fit.neu.edu.vn/codelab/api/doc/${KNumber}/${language}/${courseCode}`;
  const response = await fetch(url);
  if (!response.ok) {
    return {
      title: "Not Found",
    };
  }
  const dataResponse = await response.json();
  const listContent = dataResponse.data.content;
  const contentDescriptionIndex = listContent.findIndex((item) =>
    item?.paragraph?.elements?.[0]?.textRun?.content
      ?.toLowerCase()
      ?.includes("mô tả học phần")
  );
  const contentDescription =
    listContent[contentDescriptionIndex + 1]?.paragraph?.elements?.[0]?.textRun
      ?.content;
  return {
    title: dataResponse.labName,
    description: contentDescription,
    openGraph: {
      title: dataResponse.labName,
      description: contentDescription,
      images: [
        {
          url: "/LogoNEU.png",
          alt: "NEU Logo",
        },
      ],
    },
    images: [
      {
        url: "/LogoNEU.png",
        alt: "NEU Logo",
      },
    ],
    alternates: {
      canonical: canonicalURL
    }
  };
};

export default async function Page({ params }) {
  const { slug } = await params || {};
  const validateParams = denormalizeSubjectCode(slug?.toString().replaceAll(",", "/"));
  const language = validateParams.split("/")[1]; // Giả sử slug là dạng 'K67/vi/LLNL1105'
  const courseCode = validateParams.split("/").slice(-1)[0]; // Lấy mã môn học (phần cuối cùng của URL)
  let KNumber = validateParams.split("/")[0]; // Giả sử slug là dạng 'K67/vi/LLNL1105'
  KNumber = convertKNumber(KNumber);
  const url = `https://fit.neu.edu.vn/codelab/api/doc/${KNumber}/${language}/${courseCode}`;
  const response = await fetch(url);

  if (!response.ok) {
    return <div>Course not found</div>;
  }

  const dataResponse = await response.json()

  return <Syllabus dataResponse={dataResponse} />;
}
