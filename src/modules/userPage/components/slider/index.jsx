import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BASE_URL } from "../../../../core/constant";
import { getListCategoryStart } from "../../redux";
import "./styles.scss";

const Slider = () => {
  SwiperCore.use([Autoplay]);
  const dispatch = useDispatch();
  const {
    status,
    data: { listCategory },
  } = useSelector((state) => state.userPage);

  useEffect(() => {
    dispatch(getListCategoryStart());
  }, []);

  return (
    <div className="wrap-slider">
      <Spin spinning={status === "loading" || !listCategory}>
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
        >
          {listCategory.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => <SliderItem item={item} active={isActive} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </Spin>
    </div>
  );
};

export default Slider;

const SliderItem = (props) => {
  return (
    <div
      className={`slide-item ${props.active ? "active" : ""}`}
      style={{ backgroundImage: `url(${BASE_URL}${props.item.anh})` }}
    >
      <Link to={`/menu/${props.item.id}`}>
        <button className="btn-explore">XEM SẢN PHẨM</button>
      </Link>
    </div>
  );
};
