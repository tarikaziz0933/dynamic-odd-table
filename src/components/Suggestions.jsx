import React from "react";

export default function Suggestions({ suggestions, onSelectMatch }) {
    return (
        <ul className="bg-white text-black rounded shadow-md absolute w-full z-10">
            {suggestions.map((item, index) => {
                const match = item.matches?.match || {};
                const matchId = match?.id || "";
                const away = match?.awayteam?.name || "";
                const home = match?.localteam?.name || "";

                return (
                    <li
                        key={`${matchId}-${index}`} // ✅ unique key
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
