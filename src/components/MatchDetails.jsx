// import React from "react";

export default function MatchDetails({ match }) {
    // Null check
    if (!match || !match.matches || !match.matches.match) {
        return <div>Match information not available.</div>;
    }

    const matchData = match.matches.match;
    const home = matchData.localteam?.name || "N/A";
    const away = matchData.awayteam?.name || "N/A";
    const matchId = matchData.id;

    return (
        <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">
                {home} vs {away}
            </h2>
            <p className="text-sm text-gray-300">Match ID: {matchId}</p>
        </div>
    );
}

