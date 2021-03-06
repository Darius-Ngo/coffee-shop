import { Button, Result } from "antd";
import React, { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  return (
    <div
      className="container-not-found-page"
      style={{ marginTop: "7rem", marginBottom: "2rem" }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, không tìm thấy trang này."
        extra={<Button type="#fa541c">Quay lại</Button>}
      />
    </div>
  );
};

export default NotFoundPage;
