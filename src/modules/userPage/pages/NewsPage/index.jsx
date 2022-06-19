import { CalendarOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import img_1 from "../../../../assets/img/news/img-1.png";
import img_2 from "../../../../assets/img/news/img-2.png";
import img_3 from "../../../../assets/img/news/img-3.jpg";
import img_4 from "../../../../assets/img/news/img-4.jpg";
import img_5 from "../../../../assets/img/news/img-5.jpg";
import img_6 from "../../../../assets/img/news/img-6.jpg";
import img_7 from "../../../../assets/img/news/img-7.jpg";
import img_8 from "../../../../assets/img/news/img-8.png";
import img_9 from "../../../../assets/img/news/img-9.jpg";

const NewsPage = () => {
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
    {
      src: img_4,
      content: "LÀM GÌ THÌ LÀM, CÀ PHÊ CÁI ĐÃ CÙNG HIGHLANDS COFFEE!",
      date: "11/03/2022, 11:44",
    },
    {
      src: img_5,
      content: "HIGHLANDS COFFEE CHÍNH THỨC RA MẮT ỨNG DỤNG DI ĐỘNG 'MỚI'",
      date: "23/11/2021, 20:49",
    },
    {
      src: img_6,
      content: "“TRÀ ĐI RỒI TÍNH” CÙNG TRÀ SEN VÀNG TỪ HIGHLANDS COFFEE",
      date: "21/01/2022, 18:27",
    },
    {
      src: img_7,
      content: "HIGHLANDS CẬP NHẬT GIÁ BÁN THEO CHÍNH SÁCH THUẾ GTGT MỚI",
      date: "01/11/2021, 11:44",
    },
    {
      src: img_8,
      content: "ĐIỀU KHOẢN VÀ ĐIỀU KIỆN ÁP DỤNG CỦA ỨNG DỤNG HIGHLANDS COFFEE",
      date: "18/10/2021, 22:14",
    },
    {
      src: img_9,
      content: "BÁNH TRUNG THU HIGHLANDS COFFEE - Sẻ chia tinh túy Đất Việt",
      date: "04/08/2021, 17:02",
    },
  ];
  return (
    <div className="info-page">
      <div className="info-title">TIN TỨC</div>
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
      <div className="see-more">
        <div className="see-more__btn">XEM THÊM</div>
      </div>
    </div>
  );
};

export default NewsPage;
