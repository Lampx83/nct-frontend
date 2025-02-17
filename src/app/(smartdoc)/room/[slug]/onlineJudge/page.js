import { denormalizeSubjectCode } from "@/helpers/curriculumTable";
import CreateExam from "@/components/codelab/CreateExam";

export default async function Page({ params }) {
  // const { slug } = (await params) || {};
  // const validateParams = denormalizeSubjectCode(
  //   slug?.toString().replaceAll(",", "/")
  // );

  // const url = `https://fit.neu.edu.vn/codelab/api/room/${validateParams}`;
  // const response = await fetch(url);

  // if (!response.ok) {
  //   return <div>Not found</div>;
  // }

  // const dataResponse = await response.json();

  return <CreateExam />;
}
