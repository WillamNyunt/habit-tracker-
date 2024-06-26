import React from "react";
import TrackDay from "@/components/trackDay";


interface PageProps {
  params: {
    date: string;
  };
}

const TrackDatePage = ({ params }: PageProps) => {
  const { date } = params;
  return (
    <>
      <TrackDay date={date} />
    </>
  );
};

export default TrackDatePage;
