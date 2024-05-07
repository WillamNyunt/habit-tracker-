import Link from "next/link"
import classes from './navigation.module.css'

export default function Navigation() {
    return (
        <aside className={classes.aside}>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link href='/'>
                            <p className={classes.logo}>Habit Tracker</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/habits'>
                            <p className={classes['nav-button']}>Habits</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/habits'>
                            <p className={classes['nav-button']}>Track</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/habits'>
                            <p className={classes['nav-button']}>Info</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}