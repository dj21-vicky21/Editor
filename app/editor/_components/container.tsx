import React from 'react'
import Sidebar from './sidebar/sidebar'

function Container() {
  return (
    <section className='w-full flex-1 bg-red-500 flex'>
        <div className='bg-blue-500'>
            <Sidebar />
        </div>
        <div className='bg-green-500 w-full'>
            sd
        </div>
    </section>
  )
}

export default Container