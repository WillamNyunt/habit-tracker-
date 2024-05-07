import Image from "next/image";
import classes from './page.module.css';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1 className={classes.header}>Welcome back, William</h1>
    </main>
  );
}
