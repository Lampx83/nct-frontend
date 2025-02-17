function filterSubjects(arr1, arr2, matchCondition, excludeGroupName = "Môn Giáo dục thể chất") {
  const arr2Map = new Map(
    arr2.map(item => [
      item?.attributes?.curriculum_subject?.data?.attributes?.subjectCode,
      item,
    ])
  );

  return arr1
    .filter(item1 => {
      const subjectId = item1?.attributes?.curriculum_subject?.data?.attributes?.subjectCode;
      if (!subjectId) return false;

      return arr2Map.has(subjectId) ||
        Array.from(arr2Map.keys()).some(key => matchCondition(key, subjectId));
    })
    .sort((a, b) => {
      const name1 = a?.attributes?.curriculum_subject?.data?.attributes?.name || "";
      const name2 = b?.attributes?.curriculum_subject?.data?.attributes?.name || "";

      return name1.localeCompare(name2);
    });
}

const matchCondition = (code1, code2) => {
  const extractCode = code => code.includes(".") ? code.split(".")[1] : code;
  return extractCode(code1) === extractCode(code2);
};

export function findIntersection(first, second, locale = "vi") {
  const arr1 = first?.attributes?.curriculum_curriculum_subjects?.data || [];
  const arr2 = second?.attributes?.curriculum_curriculum_subjects?.data || [];

  if (!arr1.length || !arr2.length) return [];

  let index = 0;

  return filterSubjects(arr1, arr2, matchCondition).map(item1 => {
    const subjectId = item1?.attributes?.curriculum_subject?.data?.attributes?.subjectCode;
    const matchedItem = arr2.find(item2 =>
      matchCondition(
        item2?.attributes?.curriculum_subject?.data?.attributes?.subjectCode,
        subjectId
      )
    );

    return {
      id: subjectId,
      index: ++index,
      key: `subject-${subjectId}`,
      ...item1?.attributes?.curriculum_subject?.data?.attributes,
      knowledgeBlockSubject1: `${item1?.attributes?.knowledgeBlock || ""}${
        item1?.attributes?.required ? (locale === "vi" ? " (Bắt buộc)" : " (Required)") : ""
      }`,
      knowledgeBlockSubject2: `${matchedItem?.attributes?.knowledgeBlock || ""}${
        matchedItem?.attributes?.required ? (locale === "vi" ? " (Bắt buộc)" : " (Required)") : ""
      }`,
      // subjectCode: subjectId === matchedItem?.attributes?.curriculum_subject?.data?.attributes?.subjectCode
      //   ? subjectId
      //   : `${subjectId}/${matchedItem?.attributes?.curriculum_subject?.data?.attributes?.subjectCode}`,
      subjectCodeFirst: subjectId,
      subjectCodeSecond: matchedItem?.attributes?.curriculum_subject?.data?.attributes?.subjectCode,
    };
  });
}

export function findDifference(first, second, locale = "vi") {
  const arr1 = first?.attributes?.curriculum_curriculum_subjects?.data || [];
  const arr2 = second?.attributes?.curriculum_curriculum_subjects?.data || [];
  if (!arr1.length) return [];

  const arr2Map = new Map(
    arr2.map(item => [
      item?.attributes?.curriculum_subject?.data?.attributes?.subjectCode,
      item,
    ])
  );

  let index = 0;

  return arr1
    .filter(item1 => {
      const subjectId = item1?.attributes?.curriculum_subject?.data?.attributes?.subjectCode;
      if (!subjectId) return false;

      const isExcluded = item1?.attributes?.curriculum_subject?.data?.attributes?.curriculumGroupName ===
        "Môn Giáo dục thể chất";

      const isMatched = arr2Map.has(subjectId) ||
        Array.from(arr2Map.keys()).some(key => matchCondition(key, subjectId));

      return !isMatched && !isExcluded;
    })
    .sort((a, b) => {
      const blockA = a?.attributes?.knowledgeBlock || "";
      const blockB = b?.attributes?.knowledgeBlock || "";

      if (blockA !== blockB) return blockA.localeCompare(blockB);

      const semesterA = a?.attributes?.semester || "";
      const semesterB = b?.attributes?.semester || "";

      return semesterA.localeCompare(semesterB);
    })
    .map(item1 => ({
      id: item1?.attributes?.curriculum_subject?.data?.attributes?.subjectCode,
      index: ++index,
      key: `subject-${item1?.attributes?.curriculum_subject?.data?.attributes?.subjectCode}`,
      ...item1?.attributes?.curriculum_subject?.data?.attributes,
      knowledgeBlock: `${item1?.attributes?.knowledgeBlock || ""}${
        item1?.attributes?.required ? (locale === "vi" ? " (Bắt buộc)" : " (Required)") : ""
      }`,
      semester: item1?.attributes?.semester,
    }));
}

export function getLengthCurriculum(curriculum) {
  const subjects = curriculum?.attributes?.curriculum_curriculum_subjects?.data || [];
  return subjects.filter(item =>
    item?.attributes?.curriculum_subject?.data?.attributes?.curriculumGroupName !== "Môn Giáo dục thể chất" &&
    item?.attributes?.curriculum_subject?.data?.attributes?.subjectCode
  ).length;
}

export function calculateSimilarityAndDifference(first, second, locale = "vi") {
  const intersectionLength = findIntersection(first, second, locale).length;
  const totalLength = getLengthCurriculum(first) + getLengthCurriculum(second) - intersectionLength;

  const similarityPercent = ((intersectionLength / totalLength) * 100).toFixed(0);
  const differencePercent = (100 - similarityPercent).toFixed(0);

  return { similarityPercent, differencePercent };
}