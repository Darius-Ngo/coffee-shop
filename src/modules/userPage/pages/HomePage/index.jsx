import { CalendarOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "../../components/slider";
import img_1 from "../../../../assets/img/congdong/img-1.png";
import img_2 from "../../../../assets/img/congdong/img-2.jpg";
import img_3 from "../../../../assets/img/congdong/img-3.jpg";

const HomePage = () => {
  const listNews = [
    {
      src: img_1,
      content: "“MỆT CỠ NÀO CŨNG MƯỢT” CÙNG PHIN SỮA ĐÁ TỪ HIGHLANDS COFFEE",
      date: "07/04/2022, 17:07",
    },
    {
      src: img_2,
      content:
        "LỊCH HOẠT ĐỘNG TẾT NGUYÊN ĐÁN 2022 CỦA HIGHLANDS COFFEE TRÊN TOÀN QUỐC",
      date: "26/01/2022, 15:15",
    },
    {
      src: img_3,
      content:
        "ƯU ĐÃI KHI THANH TOÁN BẰNG MASTERCARD® CONTACTLESS TẠI HIGHLANDS COFFEE",
      date: "23/03/2022, 13:14",
    },
  ];
  return (
    <div className="container" style={{backgroundColor: '#fbedd7'}}>
      <Slider />
      <div className="info-page" >
        <div className="info-title">CỘNG ĐỒNG</div>
        <div className="info-row">
          {listNews.map((item, i) => (
            <div className="info-card" key={i}>
              <Link to="/menu">
                <div className="info-img">
                  <img src={item.src} alt="" />
                </div>
                <div className="info-content">{item.content}</div>
              </Link>
              <div className="info-date">
                <CalendarOutlined />
                <div className="info-date__content">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
