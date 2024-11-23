import React from 'react'
import style from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={style.footer}>
      <p>&copy; 2024 ActiveNet. All rights reserved</p>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms-of-service">Terms of Service</a>
      <a href="/contact">Contact</a>
      <a href="/contact">Features</a>
    </footer>
  )
}

export default Footer
