import React from 'react'
function layout({children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <div>
        {children}
      <h1 className='text-xl '>Inner Layout Contact</h1>
    </div>
  )
}

export default layout
