import Link from "next/link"
import classes from './navigation.module.css'

export default function Navigation() {
    return (
        <aside className={classes.aside}>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>
                            <p>Habit Tracker</p>
                        </Link>
                    </li>
                    <li>
                        <Link href='/habits'>
                            <p>Habits</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}