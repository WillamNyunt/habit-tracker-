import React from "react";
import { redirect } from "next/navigation";
import TrackDay from "@/components/trackDay";

interface PageProps {
  params: {
    date: string;
  };
}

const TrackDatePage = ({ params }: PageProps) => {
  const { date } = params;
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return redirect("/404");
  }

  return (
    <>
      <TrackDay date={date} />
    </>
  );
};

export default TrackDatePage;
