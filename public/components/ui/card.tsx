

const Card : React.FC<{children : React.ReactNode}> = ({children}) => {
    return (
        <div className='w-full flex bg-slate-300'>
            {children}
        </div>
    )
}