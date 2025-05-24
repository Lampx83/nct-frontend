import CurriculumDetail from "@/containers/CurriculumDetail";
import axios from "axios"
import { checkLocaleSubjects } from "@/helpers/curriculumTable";
import { notFound } from "next/navigation";
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const res = await axios.get(`https://courses.neu.edu.vn/backend/api/curriculum-majors`, {
    params: {
      "filters[slug][$eq]": slug,
      "populate[curriculum_curricula][populate][curriculum_curriculum_subjects][populate][curriculum_subject]":
        "*",
    },
  });

  if (res.status !== 200 || !res.data || res.data.length === 0) {
    notFound();
  }

  const data = res.data;
  const [majorData] = data.data;
  const title = majorData.attributes.name;
  const description =
    majorData.attributes?.introduction?.replace(/<p[^>]*>(.*?)<\/p>/, "$1") ||
    "";
  return {
    title: `${title} `,
    description: description,
    images: [
      {
        url: "/LogoNEU.png",
        alt: "NEU Logo",
      },
    ],
    openGraph: {
      title: `${title} `,
      description: description,
      images: [
        {
          url: "/LogoNEU.png",
          alt: "NEU Logo",
        },
      ],
    },
    alternates: {
      canonical: `https://courses.neu.edu.vn/major/${slug}`,
    },
  };
};
async function getBlogs() {
    const response = await fetch(
      `https://nct.neu.edu.vn/admin/api/blogs?populate=*&sort=createdAt:desc&filters[blog_category][id][$eq]=6`,
      {
        cache: "no-store"
      }
    );
    
    const data = await response.json();

    return data.data;
}

function generateCourseStructuredData(major) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: major.title,
    description: major.description,
    provider: {
      "@type": "Organization",
      name: "Đại Học Kinh Tế Quốc Dân",
      sameAs: "https://wwww.neu.edu.vn",
    },
    educationalCredentialAwarded: "Cử nhân",
    timeRequired: "4 năm",
    occupationalCredentialAwarded: major.graduateOutcomes,
    occupationalCategory: major.careerOpportunities,
  };
}

export default async function Page({ params }) {
  try {
      const newsData= await getBlogs();
    const { slug : majorCode } = await params;
    // setInterceptorLocale(locale);
    const res = await axios.get(`https://courses.neu.edu.vn/backend/api/curriculum-majors`, {
      params: {
        "filters[slug][$eq]": majorCode,
        "populate[curriculum_curricula][populate][curriculum_curriculum_subjects][populate][curriculum_subject]":
          "*",
        "populate[curriculum_faculty]": "*",
        "populate[curriculum_school]": "*",
      },
      validateStatus: (status) => status < 500,
    });
    if (res.status !== 200 || !res.data || res.data.data.length === 0) {
      notFound();
    }

    const data = res.data;
    const [majorData] = data.data;
    const major = {
      title: majorData.attributes.name || "",
      majorCode: majorData.attributes.majorCode || "",
      admissionCode: majorData.attributes.admissionCode || "",
      description: majorData.attributes.introduction || "",
      graduateOutcomes: majorData.attributes.graduateOutcomes || "",
      careerOpportunities: majorData.attributes.careerOpportunities || "",
      slug: majorData.attributes.slug || "",
      faculty: majorData?.attributes?.curriculum_faculty?.data
        ? {
          name: majorData?.attributes?.curriculum_faculty?.data?.attributes
            ?.name,
          description:
            majorData.attributes.curriculum_faculty.data?.attributes
              ?.description,
          website:
            majorData.attributes.curriculum_faculty.data?.attributes?.website,
          slug: majorData.attributes.curriculum_faculty.data?.attributes
            ?.slug,
        }
        : null,
      school: majorData?.attributes?.curriculum_school?.data
        ? {
          name: majorData?.attributes?.curriculum_school?.data?.attributes
            ?.name,
          slug: majorData.attributes.curriculum_school.data?.attributes?.slug,
        }
        : null,
      versions:
        majorData.attributes?.curriculum_curricula?.data
          ?.map((curriculum) => ({
            name: curriculum.attributes.name,
            year: curriculum.attributes.year,
            curriculumCode: curriculum.attributes.curriculumCode,
            curriculum: {
              ...curriculum,
              localeSubjects: checkLocaleSubjects(
                majorData.attributes.admissionCode
              ),
            },
          }))
          ?.sort((a, b) => (a.year > b.year ? -1 : 1)) || [],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateCourseStructuredData(major)),
          }}
        />
        <CurriculumDetail major={major}  newsData={newsData} />
      </>
    );
  } catch (error) {
    console.error("Error fetching major:", error);
    notFound();
  }
}