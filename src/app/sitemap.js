import { checkLocaleSubjects, normalizeSubjectCode } from "@/helpers/curriculumTable";
import axios from "axios";
import { get } from "lodash";

async function fetchData(endpoint, params = {}) {
  const res = await axios.get(`https://courses.neu.edu.vn/backend/api${endpoint}`, { params });
  return res.data;
}

async function getMajors() {
  return fetchData("/curriculum-schools", {
    filters: { slug: { $eq: "truong-cong-nghe" } },
    populate: {
      curriculum_faculties: "*",
      curriculum_majors: "*"
    }
  });
}



async function getSubjects() {
  return fetchData("/curriculum-schools", {
    filters: { slug: { $eq: "truong-cong-nghe" } },
    populate:{
      curriculum_faculties:{
        populate:{
          curriculum_majors:{
            populate:{
              curriculum_curricula:{
                populate:{
                  curriculum_curriculum_subjects:{
                    populate:"curriculum_subject"
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}
async function getPosts(){
  const response = await fetch("https://nct.neu.edu.vn/admin/api/blogs", {
    cache: "no-store", // Đảm bảo dữ liệu luôn cập nhật
  });

  if (!response.ok) {
    throw new Error(`Lỗi khi gọi API: ${response.statusText}`);
  }

  const data = await response.json();
  const posts = data.data || [];
  return posts.map(post => ({
    url: `/post/${post.attributes.slug}`,
    lastModified: new Date(post.attributes.updatedAt).toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
function extractK(input) {
  const match = input.match(/K\d+/);
  return match ? match[0] : null;
}

export default async function sitemap() {
  const baseUrl = "https://nct.neu.edu.vn";
  const staticUrls = [
    "/moi-truong-hoc", "/contact", "/research", "/information", "/smartdoc", "/theses", "/tin-tuc",
    "/topstudent", "/trangchu", "/theses", "/ve-chung-toi", "/youth","/tuyen-sinh","lecturer"
  ];
  // lecturer, post, syllabus, tuyen-sinh
  let majorUrls = [];
let subjectUrls = [];
let lecturerUrls = [];

try {
  const majors = await getMajors();

  if (majors?.data?.length) {
    majorUrls = majors.data.flatMap(school => {
      const majorsList = school.attributes?.curriculum_majors?.data || [];
      return majorsList.map(major => {
        const slug = major.attributes?.slug;
        return slug ? `${baseUrl}/tuyen-sinh/${slug}` : null;
      }).filter(Boolean); // Lọc bỏ giá trị null
    });
  }
} catch (error) {
  console.error("Lỗi khi lấy danh sách chuyên ngành:", error);
}

  const years = ["K67 - 2025", "K66 - 2024", "K63 - 2021"];

  for (const year of years) {
    try {
      const subjectData = await getSubjects();
      if (subjectData?.data?.length) {
        for(const school of subjectData.data){
          const faculties = school.attributes?.curriculum_faculties?.data || [];
          for(const faculty of faculties){
            const majors = faculty.attributes?.curriculum_majors?.data || [];
            for(const major of majors){
              const curricula = major.attributes?.curriculum_curricula?.data || [];
              for(const curriculum of curricula){
                const curriculumSubjects = curriculum.attributes?.curriculum_curriculum_subjects?.data || [];
                for(const subject of curriculumSubjects){
                  const subjectCode = subject?.attributes?.curriculum_subject?.data?.attributes?.subjectCode;
                  const lang = checkLocaleSubjects(subjectCode);
                  subjectUrls.push({
                    url: `https://nct.neu.edu.vn/syllabus/${extractK(year)}/${lang}/${normalizeSubjectCode(subjectCode)}`,
                    lastModified: new Date(subject?.attributes?.updatedAt || Date.now()).toISOString(),
                    changeFrequency: "yearly",
                    priority: 0.8,
                  });
                }
              }
            }
          }
        }
      } else {
        console.warn(`⚠️ No subjects found for year: ${year}`);
      }
    } catch (error) {
      console.error(`❌ Lỗi khi lấy danh sách môn học cho ${year}:`, error);
    }
  }
  const postUrls = await getPosts();
  const allUrls = [...staticUrls, ...majorUrls, ...subjectUrls, ...postUrls];
  return allUrls.map(url => ({
    url: typeof url === "string" ? `${baseUrl}${url}` : url.url,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
