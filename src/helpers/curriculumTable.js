import { omit } from "lodash";

const toRoman = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let roman = "";
  for (const [letter, value] of romanNumerals) {
    while (num >= value) {
      roman += letter;
      num -= value;
    }
  }
  return roman;
};

export const convertSemester = (input) => {
  if (input === "N/A") {
    return null;
  }
  // Remove non-numeric characters
  const numericPart = input.replace(/\D/g, ""); // \D matches non-digit characters
  const number = parseInt(numericPart, 10);

  // Convert number to Roman numerals
  return toRoman(number);
};

export function sortAndGroupSubjects(curriculum) {
  const subjects = (curriculum?.attributes?.curriculum_curriculum_subjects?.data || [])
    .filter((subject) => !!subject?.attributes?.curriculum_subject?.data?.attributes)
    .sort((a, b) =>
      a.attributes.knowledgeBlockId - b.attributes.knowledgeBlockId ||
      Number(a.attributes.required) - Number(b.attributes.required) ||
      a.attributes.semester - b.attributes.semester
    );

  const groups = subjects.reduce((acc, subject) => {
    const { knowledgeBlockId, knowledgeBlock, required } = subject.attributes;
    const type = required ? "required" : "optional";

    if (!acc[knowledgeBlockId]) {
      acc[knowledgeBlockId] = {
        id: knowledgeBlockId,
        name: knowledgeBlock,
        required: [],
        optional: [],
      };
    }
    acc[knowledgeBlockId][type].push(subject);
    return acc;
  }, {});

  Object.values(groups).forEach((group) => {
    ["required", "optional"].forEach((type) => {
      group[type].sort((a, b) => a.attributes.semester - b.attributes.semester);
    });
  });

  // Remove groups with IDs 7 and 8 ("GDQP" and "THECHAT")
  return Object.values(omit(groups, ["7", "8"]));
}

export function processSubjectGroups(groups, locale = "vi") {
  let groupIndex = 0;
  let subjectIndex = 0;
  const flatted = [];

  groups.forEach((group) => {
    const requiredCredits = calculateCredits(group.required);
    const optionalCredits = calculateCredits(group.optional);

    flatted.push({
      id: ++groupIndex,
      name: `${groupIndex}. ${group.name}`,
      type: "group",
      key: `group-${groupIndex}`,
      credits: requiredCredits + optionalCredits,
      ...generateSemestersSummary(group),
    });

    if (group.required.length > 0) {
      // flatted.push({
      //   type: "required",
      //   name: locale === "vi" ? `Bắt buộc` : `Required`,
      //   key: `required-${groupIndex}`,
      //   credits: requiredCredits,
      //   ...generateSemestersForType(group.required),
      // });

      group.required.forEach((subject, indexInGroup) => {
        flatted.push(transformSubject(subject, ++subjectIndex, indexInGroup + 1));
      });
    }

    if (group.optional.length > 0) {
      flatted.push({
        type: "optional",
        name: locale === "vi" ? `Tự chọn` : `Optional`,
        key: `optional-${groupIndex}`,
        credits: optionalCredits,
        ...generateSemestersForType(group.optional),
      });

      group.optional.forEach((subject, indexInGroup) => {
        flatted.push(transformSubject(subject, ++subjectIndex, indexInGroup + 1));
      });
    }
  });

  return flatted;
}

function calculateCredits(subjects) {
  return subjects.reduce((total, subject) =>
    total + (subject.attributes.curriculum_subject?.data?.attributes?.credits || 0),
    0
  );
}

function transformSubject(subject, globalIndex, indexInGroup) {
  const { curriculum_subject, ...attributes } = subject.attributes;
  return {
    ...curriculum_subject?.data?.attributes,
    ...omit(attributes, ["curriculum_subject"]),
    index: globalIndex,
    indexInGroup,
    type: "subject",
    key: `subject-${globalIndex}`,
    ...generateSemesters(subject),
    semester: convertSemester(subject.attributes.semester),
  };
}

function generateSemesters(subject) {
  const semesters = Array(8).fill(0);
  const semesterIndex = parseInt(subject.attributes.semester.replace(/\D/g, ""), 10) - 1;
  const credits = subject.attributes.curriculum_subject?.data?.attributes?.credits || 0;
  semesters[semesterIndex] = credits;

  return createSemesterObject(semesters);
}

function generateSemestersForType(subjects) {
  const semesters = Array(8).fill(0);
  subjects.forEach((subject) => {
    const semesterIndex = parseInt(subject.attributes.semester.replace(/\D/g, ""), 10) - 1;
    const credits = subject.attributes.curriculum_subject?.data?.attributes?.credits || 0;
    semesters[semesterIndex] += credits;
  });

  return createSemesterObject(semesters, "type");
}

function generateSemestersSummary(group) {
  const required = generateSemestersForType(group.required);
  const optional = generateSemestersForType(group.optional);

  const semesters = Array.from({ length: 8 }, (_, index) =>
    (required[`semester${index + 1}`] || 0) + (optional[`semester${index + 1}`] || 0)
  );

  return createSemesterObject(semesters, "group");
}

function createSemesterObject(semesters, type = "subject") {
  return Object.fromEntries(
    semesters.map((credits, index) => [`semester${index + 1}`, (credits === 0 ? "" : credits)])
  );
}

export function normalizeSubjectCode(subjectCode) {
  return (encodeURIComponent(subjectCode)).replaceAll(".", "_dot_");
}

export function denormalizeSubjectCode(subjectCode) {
  return decodeURIComponent(subjectCode.replaceAll("_dot_", "."));
}

export function checkLocaleSubjects(code) {
  const prefixes = [
    "EP",
    "EBBA",
    "EPMP",
    "BBAE",
    "EB",
    "EBDB",
    "ESOM"
  ];
  const isEn = prefixes.some((prefix) => code.startsWith(prefix));
  return isEn ? "en" : "vi";
}