import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function JobOpp() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobOpp, setJobOpp] = useState([]);

    useEffect(() => {
        const fetchJobOppData = async () => {
            try {
                const response = await axios.get('https://fit.neu.edu.vn/admin/api/se-landing-page?populate=deep');
                const data = response.data.data.attributes.jobOpportunityBlock; 
                setJobOpp(data);
                // console.log(data);

                AOS.init({
                    duration: 1200,
                    once: true,
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobOppData();
    }, []);

    if (loading) return <p>Loading...</p>;
    const strapiBaseURL = 'https://fit.neu.edu.vn/admin';
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="container my-5">
                <h1 className="text-center">{jobOpp.title}</h1>
                <br />
                <div className="row g-3">
                    {jobOpp.opportunities.map((job, index) => (
                        <div className="col-12 col-md-6 col-lg-3" key={index}>
                            <div data-aos="zoom-in">
                                <img
                                    src={`${strapiBaseURL}${job.thumbnail.data.attributes.formats.thumbnail.url}`} 
                                    alt="JobOpp"
                                    style={{
                                        width: "100%",
                                        border: "2px solid #246499",
                                        borderRadius: "10px",
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                                <p>{job.title}</p> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    
);
}

export default JobOpp;
