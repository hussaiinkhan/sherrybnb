import React from 'react'
import loading from '../assests/loading.gif'
const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <img className="img-fluid w-[400px] h-[400px]" src={loading} alt='loading'></img>
      </div>
  )
}

export default Loading