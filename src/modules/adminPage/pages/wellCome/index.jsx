import React from 'react';
import './styles.scss';
import logo from '../../../../assets/img/logo-wellcome.png';

const WellCome = () => {
  return (
    <div className="wellcome-page">
      <div className="wellcome-page__box">
        <div className="img">
          <img src={logo} alt="" />
        </div>
        <div className="content">HI BOSS!</div>
      </div>
    </div>
  )
}

export default WellCome;