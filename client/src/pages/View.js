import React from 'react'
import MainSkeleton from '../components/MainSkeleton'
import SavedData from '../components/SavedData'

const View = () => {
  return (
    <div className='view'>
      <MainSkeleton />
      <SavedData />
    </div>
  )
}

export default View