import React, {useEffect} from "react";
import moment from "moment";
import Link from "next/link";
import ExcelExport from "../components/SummaryPosts/ExcelExport";
import slugify from "slugify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function SummaryPosts() {
  const [posts, setPosts] = React.useState([]);
  const month = moment().month() + 1;
  const firstDayOfMonth = moment(new Date()).startOf('month').toDate();
  const lastDayOfMonth = moment(new Date()).endOf('month').toDate();
  
  const [startDate, setStartDate] = React.useState((new Date(firstDayOfMonth)));
  const [endDate, setEndDate] = React.useState(new Date(lastDayOfMonth));

  const processDataExport = (posts) => {
    return (posts??[]).map((post, index) => ({
      "TT": index + 1,
      "Ngày đăng": moment(post?.publishedAt).format("DD/MM/YYYY"),
      "Link bài viết": `https://fit.neu.edu.vn/post/${post.slug}`,
      "Tiêu chí số": "",
      "Số điểm": ""
    }))
  }

  const getFilterString = () => {
    
    return `https://fit.neu.edu.vn/admin/api/blogs?filters[publishedAt][$gte]=${startDate.toISOString()}&filters[publishedAt][$lte]=${endDate.toISOString()}&sort=publishedAt:asc&populate=*`;
  }

  useEffect(() => {
    fetch(getFilterString())
      .then(res => res.json())
      .then(res => {
        const final = (res?.data??[]).map((item, index) => {
          return {
            id: item.id,
            ...item.attributes
          }
        });
        setPosts(final);
      })
  }, [startDate, endDate]);

  return (
    <>
      <div className="container min-vh-100">
        <h2 className="text-center mt-5 mb-3">TỔNG KẾT BÀI ĐĂNG {`${moment(startDate).format("DD/MM/YYYY")} - ${moment(endDate).format("DD/MM/YYYY")}`}</h2>
        <div className={"mb-2 d-flex align-items-center gap-1 justify-content-end"}>
          <label
            htmlFor="month"
            className="form-label text-primary"
            style={{fontWeight: "bold", fontSize: "1.2rem", margin: 0}}
          >
            Từ:
          </label>
          <div style={{maxWidth: "110px"}}>
            <DatePicker
              selected={startDate}
              onChange={date => {
                date = moment(date).startOf('day').toDate();
                setStartDate(date)
              }}
              className="form-control"
              showMonthYearDropdown={false}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>
          <label
            htmlFor="month"
            className="form-label text-primary ms-3"
            style={{fontWeight: "bold", fontSize: "1.2rem", margin: 0}}
          >
            Đến:
          </label>
          <div style={{maxWidth: "110px"}}>
            <DatePicker
              selected={endDate}
              onChange={date => {
                date = moment(date).endOf('day').toDate();
                setEndDate(date)
              }}
              className="form-control"
              showMonthYearDropdown={false}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>
          <ExcelExport data={processDataExport(posts)}
                       fileName={`Tổng kết bài đăng ${moment(startDate).format("DD/MM/YYYY")} - ${moment(endDate).format("DD/MM/YYYY")}`}/>
        </div>
        <table className="table table-striped table-bordered table-hover table-sm"
               style={{borderCollapse: 'collapse', border: '1px solid black'}}>
          <thead>
          <tr className="text-center align-middle"
              style={{backgroundColor: '#f8f9fa', fontWeight: 'bold', border: '1px solid black'}}>
            <th style={{fontWeight: "bold", textAlign: "center", border: '1px solid black'}}>TT</th>
            <th style={{fontWeight: "bold", textAlign: "center", border: '1px solid black'}}>Bài viết</th>
            <th style={{fontWeight: "bold", textAlign: "center", border: '1px solid black'}}>Phân loại</th>
            <th style={{fontWeight: "bold", textAlign: "center", border: '1px solid black'}}>Người đăng</th>
            <th style={{fontWeight: "bold", textAlign: "center", border: '1px solid black'}}>Ngày đăng</th>
          </tr>
          </thead>
          <tbody>
          {posts.length > 0 ? posts?.map((post, index) => {
            return (
              <tr key={post.id} className="text-center align-middle"
                  style={{border: '1px solid black'}}>
                <td style={{border: '1px solid black'}}>{index + 1}</td>
                <td style={{border: '1px solid black'}}>
                  <Link href={`/post/${post.slug}`} target="_blank">{post?.title}</Link>
                </td>
                <td style={{border: '1px solid black'}}>
                  <Link href={`/news/category/${post?.blog_category?.data?.attributes?.slug}`}
                        target="_blank">{post?.blog_category?.data?.attributes?.title}</Link>
                </td>
                <td style={{border: '1px solid black'}}>
                  <Link href={`/news/author/${slugify(`${post?.createdBy?.data?.attributes?.firstname} ${post?.createdBy?.data?.attributes?.lastname} ${post?.createdBy?.data?.id}`, {lower: true, locale: 'vi'})}`}
                        target="_blank">{`${post?.createdBy?.data?.attributes?.firstname} ${post?.createdBy?.data?.attributes?.lastname}`}</Link>
                </td>
                <td
                  style={{border: '1px solid black'}}>{moment(post?.publishedAt).format("DD [tháng] MM YYYY, HH:mm")}</td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={3} className="text-center">Không có bài viết nào</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </>
  );
}