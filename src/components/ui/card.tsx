import classes from './card.module.css';

const Card : React.FC<{children : React.ReactNode, className? : string | null}> = ({children, className}) => {
    return (
        <div className={`${className} ${classes.card} w-full flex bg-white`}>
            {children}
        </div>
    )
}

export default Card;