import { denormalizeSubjectCode } from "@/helpers/curriculumTable";
import { ChakraProvider } from "@chakra-ui/react";
import TeacherStats from "@/components/codelab/Statistic";
import theme from "@/theme";

export default async function Page({ params }) {
  const { slug } = (await params) || {};
  const validateParams = denormalizeSubjectCode(
    slug?.toString().replaceAll(",", "/")
  );

  const url = `https://fit.neu.edu.vn/codelab/api/room/${validateParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    return <div>Not found</div>;
  }

  const dataResponse = await response.json();

  return <ChakraProvider theme={theme}><TeacherStats /></ChakraProvider>;
}
