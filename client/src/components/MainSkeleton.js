import React from 'react'
import logo from '../images/logo.png'
import '../style.css'
import google from '../images/GOOGL.png';
import fb from '../images/FB.png'
import amazon from '../images/AMZN.svg'
import { Link } from 'react-router-dom';
const MainSkeleton = () => {
  return (
    <div className='mainContainer'>
        <header className='header'>
            <Link to={"/"} ><img src={logo} alt="logo" /></Link>
        </header>
        <div className="heroCards">
            <div className='heroCard'>
                <div className='icon'><img src={google} alt="" /></div>
                <div className='price'><p>300</p> <p className='currency'>USD</p></div>
                <div>GOOGL</div>
            </div>
            <div className='heroCard'>
                <div className='icon'><img src={amazon} alt="" /></div>
                <div className='price'><p>100</p> <p className='currency'>USD</p></div>
                <div>AMZN</div>
            </div>
            <div className='heroCard'>
                <div className='icon'><img src={fb} alt="" /></div>
                <div className='price'><p>360</p> <p className='currency'>USD</p></div>
                <div>FB</div>
            </div>
        </div>
    </div>
  )
}

export default MainSkeleton