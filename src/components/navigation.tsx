'use client'
import Link from "next/link"
import classes from './navigation.module.css'
import { usePathname } from 'next/navigation'
import { HiCalendarDays, HiMagnifyingGlassPlus, HiOutlineClipboardDocumentList } from "react-icons/hi2";


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
                            <p className={`${classes['nav-button']}  ${pathname === '/habits' ? classes['active-link'] : ''} flex flex-row items-center gap-2`}><HiOutlineClipboardDocumentList /><span>All habits</span></p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/track'>
                            <p className={`${classes['nav-button']}  ${pathname === '/track' ? classes['active-link'] : ''} flex flex-row items-center gap-2`}><HiMagnifyingGlassPlus /><span>Track</span></p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/view'>
                            <p className={`${classes['nav-button']}  ${pathname === '/view' ? classes['active-link'] : ''} flex flex-row items-center gap-2`}><HiCalendarDays /><span>View</span></p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}