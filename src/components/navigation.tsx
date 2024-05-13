'use client'
import Link from "next/link"
import classes from './navigation.module.css'
import { usePathname } from 'next/navigation'


export default function Navigation() {
    const pathname = usePathname()

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
                            <p className={`${classes['nav-button']}  ${pathname === '/habits' ? classes['active-link'] : ''}`}>All Habits</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/track'>
                            <p className={`${classes['nav-button']}  ${pathname === '/track' ? classes['active-link'] : ''}`}>Track</p>
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