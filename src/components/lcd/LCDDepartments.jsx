import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import '../../css/lcd-departments.css';
import placeholderImg from './imgs/placeholder.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LCDDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('Ban Chấp Hành');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const strapiBaseURL = 'https://fit.neu.edu.vn/admin';

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://fit.neu.edu.vn/admin/api/lcd-page?populate=deep');
        const data = response.data.data.attributes.departments;
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const renderMemberCard = (member) => (
    <div className="card text-center border-0">
      <img
        src={
          member.avatar?.data?.attributes?.formats?.thumbnail?.url
            ? `${strapiBaseURL}${member.avatar.data.attributes.formats.thumbnail.url}`
            : placeholderImg
        }
        className="card-img-top rounded-circle mx-auto mt-3"
        alt={member.name}
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{member.name}</h5>
        <p className="card-text text-muted">{member.position}</p>
        <p className="card-text email">{member.email}</p> {/* Apply the 'email' class */}
      </div>
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading departments data.</p>;

  const selectedTeamData = departments.find((team) => team.name === selectedTeam);

  if (!selectedTeamData) return null;

  const mainMembers = selectedTeamData.members.filter(member => member.position !== "CTV");
  const ctvMembers = selectedTeamData.members.filter(member => member.position === "CTV");

  return (
    <div className="container my-5">
      <h2 className="text-center mb-3 fs-1">Cơ Cấu Tổ Chức Liên Chi Đoàn</h2>
      <h3 className="text-center mb-5">Nhiệm kỳ 2024-2027</h3>

      <div className="d-flex flex-wrap justify-content-center mb-4 department-buttons">
        {departments.map((team) => (
          <button
            key={team.id}
            className={`btn ${selectedTeam === team.name ? 'btn-primary' : 'btn-outline-primary'} mx-2 department-button`}
            onClick={() => setSelectedTeam(team.name)}
          >
            {team.name}
          </button>
        ))}
      </div>

      {selectedTeamData && (
        <>
          <div className="text-center mb-4">
            <h3 className="mb-3">{selectedTeamData.name}</h3>
          </div>

          <div className={`row justify-content-center ${mainMembers.length === 2 ? 'two-members-row' : ''}`}>
            {mainMembers.map((member, index) => (
              <div
                key={index}
                className={`${
                  mainMembers.length === 2
                    ? 'col-md-5'
                    : mainMembers.length === 3
                    ? 'col-md-4'
                    : 'col-md-3'
                } mb-4 d-flex justify-content-center`}
              >
                {renderMemberCard(member)}
              </div>
            ))}
          </div>

          {ctvMembers.length > 0 && (
            <div className="ctv-section mt-4">
              <h4 className="text-center mb-4">Cộng Tác Viên</h4>
              {ctvMembers.length > 4 ? (
                <Slider {...sliderSettings}>
                  {ctvMembers.map((member, index) => (
                    <div key={index} className="px-2">
                      {renderMemberCard(member)}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="row justify-content-center">
                  {ctvMembers.map((member, index) => (
                    <div key={index} className="col-md-3 mb-4 d-flex justify-content-center">
                      {renderMemberCard(member)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LCDDepartments;