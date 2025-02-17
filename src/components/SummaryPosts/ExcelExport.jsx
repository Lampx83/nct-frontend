import React from 'react';
import { saveAs } from 'file-saver';
import {utils, write} from 'xlsx';

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button className={"btn btn-primary"} onClick={exportToExcel}>Tải file excel</button>
  );
}

export default ExcelExport;