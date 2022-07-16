import React from 'react'
import CryptoList from '../components/CryptoList'
import MainSkeleton from '../components/MainSkeleton'

const Home = () => {
  return (
    <div className='home'>
      <MainSkeleton />
      <CryptoList />
    </div>
  )
}

export default Home