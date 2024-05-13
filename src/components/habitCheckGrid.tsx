"use client";
import { Card } from "./card";
import Link from "next/link";

interface HabitCheckGridProps {
    habits: any[];
}

const HabitCheckGrid: React.FC<HabitCheckGridProps> = ({habits}) => {
  return <>
    {habits.map((habit: any) => (
        <p>{habit.name}</p>
    ))}
  </>;
};

export default HabitCheckGrid;
