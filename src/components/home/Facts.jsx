import { useState, useEffect } from 'react'

function Facts() {
  const [facts, setFacts] = useState([]);
  const fetchFacts = async () => {
    const response = await fetch('https://fit.neu.edu.vn/admin/api/index-page?populate=*');
    const data = await response.json();
    setFacts(data.data.attributes.factBanner);
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  // Mảng các icon tương ứng với từng fact
  const factIcons = [
    "fa-calendar-check",
    "fa-book-bookmark", 
    "fa-users",
    "fa-briefcase"
  ];

  return (
    <div className="container-fluid fact bg-dark my-5 py-5">
      <div className="container">
        <div className="row g-4">
          {facts.map((fact, index) => (
            <div key={fact.id} className="col-6 col-lg-3 text-center wow fadeIn" data-wow-delay={`0.${index * 2 + 1}s`}>
              <i className={`fa ${factIcons[index]} fa-2x text-white mb-3`}></i>
              <h2 className="text-white mb-2" data-toggle="counter-up">{fact.value}</h2>
              <p className="text-white mb-0">{fact.key}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Facts