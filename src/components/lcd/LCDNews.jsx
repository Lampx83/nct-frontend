import React from 'react';
import Link from 'next/link';
import useFetch from '../../utils/fetch';
import config from '../../utils/config';
import moment from 'moment';
import 'moment/locale/vi';

const LCDNews = () => {
  const categoryId = 14;

  const { data: newsData, loading, error } = useFetch(
    `${config.API_URL}/api/blogs`,
    {
      filters: { blog_category: { id: { $eq: categoryId } } },
      sort: ['createdAt:desc'],
      populate: 'thumbnail',
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news</p>;

  moment.locale('vi');

  return (
    <div className="d-flex flex-column gap-4 px-2">
      <div className="categories mb-5">
        <h2 className="fs-2">Tin tức Liên Chi Đoàn</h2>
        <hr className="my-4" />
        <ul
          className="list-unstyled"
          style={{
            maxHeight: '41vh',
            overflowY: 'auto',
          }}
        >
          {newsData?.data?.map((news, index) => {
            const thumbnailUrl = news.attributes.thumbnail?.data?.attributes?.formats?.thumbnail?.url
              ? `${config.API_URL}${news.attributes.thumbnail.data.attributes.formats.thumbnail.url}`
              : '/path/to/default-thumbnail.jpg';

            const day = moment(news.attributes.publishedAt).format('DD');
            const month = moment(news.attributes.publishedAt).format('M'); // Month as number without leading zero
            const year = moment(news.attributes.publishedAt).format('YYYY');

            return (
              <li
                key={index}
                className="mb-3 d-flex align-items-start"
                style={{ gap: '2vh' }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: '70px', height: '70px' }}
                >
                  <img
                    src={thumbnailUrl}
                    alt={news.attributes.title}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <div>
                  <Link href={`/post/${news.attributes.slug}`} className="fw-bold">
                    {news.attributes.title}
                  </Link>
                  <p className="text-muted mb-1" style={{ fontSize: '0.85em' }}>
                    {day} Tháng {month}, {year}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LCDNews;