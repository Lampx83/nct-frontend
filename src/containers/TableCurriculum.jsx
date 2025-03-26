"use client";

import { Button, ConfigProvider, Table, Tooltip } from "antd";

import {
  normalizeSubjectCode,
  processSubjectGroups,
  sortAndGroupSubjects,
} from "@/helpers/curriculumTable";
import Link from "next/link";
import { forwardRef, useRef } from "react";

const sharedOnCell = (record) => {
  if (
    record.type === "group" ||
    record.type === "required" ||
    record.type === "optional"
  ) {
    return {
      colSpan: 0,
    };
  }
  return {};
};

const styleCell = (
  record,
  groupColor = "rgba(8,92,167,0.4)",
  typeColor = "rgba(8,92,167,0.2)",
) => {
  const res = {
    style: {},
  };

  if (record.type === "group") {
    res.style = {
      fontWeight: "bold",
      backgroundColor: groupColor,
      color: "var(--bs-light)",
    };
  } else if (record.type === "required" || record.type === "optional") {
    res.style = {
      fontWeight: "bold",
      backgroundColor: typeColor,
      color: "var(--bs-white)",

    };
  }

  return res;
};

const TableCurriculum = forwardRef(
  (
    {
      curriculum,
      loading = false,
      isEmbed = false,
      primaryColor = "#a31b1b",
      secondaryColor = "#a31b1b",
      tertiaryColor = "#a31b1b",
    },
    ref
  ) => {
    const groups = sortAndGroupSubjects(curriculum);
    const data = processSubjectGroups(groups);
    const year = curriculum?.attributes?.year?.split(" - ")[0] || "K67";
    const localeSubjects = curriculum?.localeSubjects || "vi";

    const columns = [
      {
        title: "Số thứ tự",
        dataIndex: "index",
        key: "index",
        onCell: (record) => {
          const res = {
            ...styleCell(record, secondaryColor, tertiaryColor),
            rowSpan: record.rowSpan,
          };
          if (!res?.style) {
            res.style = {};
          }
          res.style.fontWeight = "bold";
          return res;
        },
        className: "text-center",
      },
      {
        title: "Nội dung",
        children: [
          {
            title: "Số thứ tự",
            dataIndex: "indexInGroup",
            key: "indexInGroup",
            onCell: (record) => ({
              ...sharedOnCell(record),
              ...styleCell(record, secondaryColor, tertiaryColor),
            }),
            className: "text-center",
          },
          {
            title: "Tên môn học",
            dataIndex: "name",
            key: "name",
            render: (_, record) => {
              if (
                record.type === "group" ||
                record.type === "required" ||
                record.type === "optional"
              ) {
                return record.name;
              }
              return (
                <Tooltip title={`Chi tiết môn học ${record.name}`}>
                  <Link
                    href={`/syllabus/${year}/${record?.language || localeSubjects}/${normalizeSubjectCode(
                      record.subjectCode
                    )}`}
                    style={{
                      color: "#ddddd",
                      ":hover": {
                        color: "var(--text-primary-blue)",
                      },
                    }}
                    target={isEmbed ? "_blank" : "_self"}
                  >
                    {record.name}
                  </Link>
                </Tooltip>
              );
            },
            onCell: (record) => {
              if (
                record.type === "group" ||
                record.type === "required" ||
                record.type === "optional"
              ) {
                return {
                  colSpan: 2,
                  ...styleCell(record, secondaryColor, tertiaryColor),
                };
              }
              return {};
            },
          },
        ],
      },
      {
        title: "Mã học phần",
        dataIndex: "subjectCode",
        key: "subjectCode",
        className: "text-center",
        onCell: (record) => styleCell(record, secondaryColor, tertiaryColor),
        render: (_, record) => {
          if (
            record.type === "group" ||
            record.type === "required" ||
            record.type === "optional"
          ) {
            return "";
          }

          return (
            <Tooltip title={`Chi tiết môn học ${record.name}`}>
              <Link
                href={`/syllabus/${year}/${record?.language || localeSubjects}/${normalizeSubjectCode(
                  record.subjectCode
                )}`}
                style={{ color: "var(--text--blue)" }}
                target={isEmbed ? "_blank" : "_self"}
              >
                {record.subjectCode}
              </Link>
            </Tooltip>
          );
        },
      },
      {
        title: "Số tín chỉ",
        dataIndex: "credits",
        key: "credits",
        className: "text-center",
        onCell: (record) => styleCell(record, secondaryColor, tertiaryColor),
      },
      {
        title: "Phân bổ học kỳ",
        children: Array.from({ length: 8 }, (_, index) => ({
          title: `${index + 1}`,
          dataIndex: `semester${index + 1}`,
          key: `semester${index + 1}`,
          onCell: (record) => styleCell(record, secondaryColor, tertiaryColor),
          className: "text-center d-none d-md-table-cell",
        })),
        className: "d-none d-md-table-cell",
      },
      {
        title: "Học kỳ",
        dataIndex: "semester",
        key: "semester",
        className: "text-center",
        onCell: (record) => styleCell(record, secondaryColor, tertiaryColor),
      },
    ];

    return (
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: primaryColor,
              headerColor: "var(--bs-white)",
              borderColor: "#dddddd",
            },
          },
        }}
      >
        <div ref={ref} className="table-responsive">
          <Table
            columns={columns}
            dataSource={data}
            bordered={true}
            pagination={false}
            size="middle"
            className="table-responsive"
            loading={loading}
          />
        </div>
      </ConfigProvider>
    );
  }
);

export default TableCurriculum;
