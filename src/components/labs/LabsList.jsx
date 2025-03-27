"use client"
import Link from "next/link"
import config from "@/utils/config";

export default function LabsList({labs}) {
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {labs.map((lab) => (
          <div key={lab.id} className="col">
            <Link href={`/phong-nghien-cuu/${lab.id}`} className="d-flex align-items-center border rounded-lg shadow-sm bg-white p-3 text-decoration-none text-dark h-100">
              <img 
                src={`${config.API_URL}${lab.attributes.images.data[0]?.attributes.url}`} 
                alt={lab.attributes.name} 
                className="img-fluid rounded me-3" 
                style={{ width: "65px", height: "65px", objectFit: "cover" }}
              />
              <h3 
                className="h3 mb-0"
                onMouseEnter={(e) => (e.target.style.color = "#0087C1")}
                onMouseLeave={(e) => (e.target.style.color = "black")}    
            >{lab.attributes.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    )
}
