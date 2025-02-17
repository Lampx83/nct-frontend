import React, { useEffect } from 'react';

const FacebookPage = () => {
  useEffect(() => {
    // Tạo phần tử chứa SDK
    const fbScript = document.createElement('script');
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = 'anonymous';
    fbScript.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v20.0&appId=410372169325724";
    document.body.appendChild(fbScript);

    // Đảm bảo rằng khi SDK đã được tải, Facebook Page sẽ hiển thị
    fbScript.onload = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };
  }, []);

  return (
    <div>
      <div id="fb-root"></div>
      <div className="fb-page"
        data-href="https://www.facebook.com/lcdkhoacntt.neu"
        data-tabs="timeline"
        data-width="400"
        data-height=""
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="true">
        <blockquote
          cite="https://www.facebook.com/lcdkhoacntt.neu"
          className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/lcdkhoacntt.neu">LCĐ Khoa Công nghệ thông tin - Trường ĐH KTQD</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPage;
