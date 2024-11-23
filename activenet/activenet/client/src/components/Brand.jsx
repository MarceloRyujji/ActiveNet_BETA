import React from 'react'
import logo from '../assets/Logo.png'
import style from '../styles/Brand.module.css'
import generalStyle from '../styles/GeneralStyles.module.css'

function Brand() {
  return (
    <div className={`${generalStyle.generalCard}  ${style.logoCard}`}>
      <img className={style.logo} src={logo} alt="Activenet Logo" />
      <p className={style.motto}>Empower your fitness journey!</p>
    </div>
  )
}

export default Brand
