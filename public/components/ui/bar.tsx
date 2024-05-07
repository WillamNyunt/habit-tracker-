import React from 'react'

const SlimBar : React.FC<{children : React.ReactNode }> = ({children}) => {
    return (
        <div className='w-full flex bg-slate-300'>
            {children}
        </div>
    )
}

export default SlimBar