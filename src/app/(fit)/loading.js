import { Spin } from "antd"; // Import Spin từ Ant Design

const Loading = () => {
    return (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spin size="large" /> {/* Hiển thị spinner với kích thước lớn */}
        </div>
    );
};

export default Loading;
