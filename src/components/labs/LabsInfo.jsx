"use client";
import React, { useState } from "react";
const LabsInfo = ({ lab }) => {

  if (!lab) return <div className="mt-5 pt-5">Not found</div>;

  const name = lab.attributes.name;
  const description = lab.attributes.description;

  return (
    <div className="container mt-5 pt-3" style={{textAlign: "justify"}}>
        <h1 className="text-center mt-5"><b>{name}</b></h1>
        <div className="row mt-3 pt-2 mb-2 mx-5">
            <div className="col-12">
                <div style={{ fontSize: "18px"}}>
                    <div
                    className="custom-table"
                    dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .custom-table .table table {
                width: 100%;
            }
            `}</style>
    </div>
  );
};

export default LabsInfo;
