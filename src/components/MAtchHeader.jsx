import React, { useEffect, useState } from "react";

export default function MatchHeader({ match }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(match.startTime || Date.now() + 10000000); // Replace with actual time
        const interval = setInterval(() => {
            const now = new Date();
            const diff = target - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [match]);

    const matchData = match?.matches?.match || {};
    const home = matchData.localteam?.name || "Home";
    const away = matchData.awayteam?.name || "Away";
    const date = matchData.date || "01/09";
    const time = matchData.time || "23:10";

    return (
        <div className="text-center bg-[#1f2a63] p-4 rounded-t-lg mb-4">
            <div className="text-lg mb-2">
                <span>{timeLeft.hours}</span> : <span>{timeLeft.minutes}</span> : <span>{timeLeft.seconds}</span>
                <div className="text-sm text-gray-300">hours &nbsp; minutes &nbsp; seconds</div>
            </div>
            <div className="flex justify-center items-center gap-6 text-xl font-semibold mt-2">
                <span>{home}</span>
                <span className="text-sm text-gray-400">vs</span>
                <span>{away}</span>
            </div>
            <div className="text-md mt-1">{time} &nbsp; {date}</div>
        </div>
    );
}
