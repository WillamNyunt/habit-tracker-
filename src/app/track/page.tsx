import React from 'react';
import TrackDay from '@/components/trackDay';

const TrackPage : React.FC<{}> = () => {
    return (
        <>
            <h1>Track habits</h1>
            <TrackDay />
        </>
    )
}

export default TrackPage;