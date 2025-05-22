"use client"
import Link from "next/link"
import config from "@/utils/config";

export default function LabsList({ labs }) {
  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
      {labs.map((lab) => (
        <div key={lab.id} className="col">
          <Link
            href={`/phong-nghien-cuu/${lab.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="border rounded shadow-sm bg-white p-3 h-100 text-center d-flex flex-column align-items-center justify-content-center">
              <img
                src={`${config.API_URL}${lab.attributes.images.data[0]?.attributes.url}`}
                alt={lab.attributes.name}
                className="img-fluid mb-2"
                style={{
                  width: "65px",
                  height: "65px",
                  objectFit: "cover"
                }}
              />
              <h5
                className="m-0 text-break fw-bold "
                style={{
                  color: "#660000",
                  fontSize: "1.5rem"
                }}
                onMouseEnter={(e) => (e.target.style.color = "#0087C1")}
                onMouseLeave={(e) => (e.target.style.color = "#660000")}
              >
                {lab.attributes.name}
              </h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
