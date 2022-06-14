import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import {MdOutlineMail } from 'react-icons/md';
import {FiSend } from 'react-icons/fi';
import React from 'react';
import './styles.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="list-content">
        <div className="list-icon">
          <div className="box-icon"><FaFacebookF/></div>
          <div className="box-icon"><FaYoutube/></div>
          <div className="box-icon"><FaInstagram/></div>
        </div>
        <div className="content mr">© 2018 Highlands Coffee. All rights reserved</div>
        <a className="content-link mr"><FiSend/> Đăng ký nhận tin mới</a>
        <a className="content-link mr"><MdOutlineMail/> coffeeservice@gmail.com.vn</a>
      </div>
    </div>
  )
}

export default Footer