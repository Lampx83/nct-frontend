import React, { useState } from "react";

import NavBar from "../components/codelab/NavBar";
import RoadMap from "../components/codelab/RoadMap";
import StudentList from "../components/codelab/StudentList";
import Footer from "../components/codelab/Footer";


const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
];

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  // Thêm dữ liệu khác tại đây
];


function MyClasses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <NavBar />
      <RoadMap />
      <StudentList
        data={data}
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Footer />
    </div>
  );
};

export default MyClasses;
