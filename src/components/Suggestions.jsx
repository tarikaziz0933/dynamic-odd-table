import React from "react";

export default function Suggestions({ suggestions, onSelectMatch }) {
    return (
        <ul className="bg-white text-black rounded shadow-md absolute w-full z-10">
            {suggestions.map((item, index) => {
                const matchData = item.matches?.match;

                // If match is an array, show each item
                if (Array.isArray(matchData)) {
                    return matchData.map((match, subIndex) => {
                        const matchId = match?.id || "";
                        const away = match?.awayteam?.name || "";
                        const home = match?.localteam?.name || "";
                        return (
                            <li
                                key={`${matchId}-${index}-${subIndex}`}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() =>
                                    onSelectMatch({ ...item, matches: { match } })
                                }
                            >
                                {matchId} - {home} vs {away}
                            </li>
                        );
                    });
                }

                // If match is a single object
                const match = matchData || {};
                const matchId = match?.id || "";
                const away = match?.awayteam?.name || "";
                const home = match?.localteam?.name || "";

                return (
                    <li
                        key={`${matchId}-${index}`}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => onSelectMatch(item)}
                    >
                        {matchId} - {home} vs {away}
                    </li>
                );
            })}
        </ul>
    );
}
