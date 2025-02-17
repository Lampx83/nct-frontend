"use client";

import { denormalizeSubjectCode } from "@/helpers/curriculumTable";
import { ChakraProvider } from "@chakra-ui/react";
import CodeEditor from "@/components/codelab/EditorSubmitCode";
import theme from "@/theme";

export default function Page() {
  return (
    <ChakraProvider theme={theme}>
      <CodeEditor />
    </ChakraProvider>
  );
}
