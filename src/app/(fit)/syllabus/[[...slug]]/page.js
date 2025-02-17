import { denormalizeSubjectCode } from "@/helpers/curriculumTable";
import Syllabus from "@/components/Syllabus";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params || {};
  const validateParams = denormalizeSubjectCode(slug?.toString().replaceAll(",", "/"));
  const url = `https://fit.neu.edu.vn/codelab/api/doc/${validateParams}`;
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
      canonical: `https://courses.neu.edu.vn/syllabus/${validateParams}`
    }
  };
};

export default async function Page({ params }) {
  const { slug } = await params || {};
  const validateParams = denormalizeSubjectCode(slug?.toString().replaceAll(",", "/"));

  const url = `https://fit.neu.edu.vn/codelab/api/doc/${validateParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    return <div>Course not found</div>;
  }

  const dataResponse = await response.json()

  return <Syllabus dataResponse={dataResponse} />;
}
