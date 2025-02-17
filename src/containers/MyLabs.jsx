import React from "react";

import NavBar from "../components/codelab/NavBar";
import Cards from "../components/codelab/Cards";
import Footer from "../components/codelab/Footer";

function MyLabs() {

  return (
    <div>
      <NavBar />
      <Cards type="mydocs" />
      <Footer />
    </div>
  );
}

export default MyLabs;
