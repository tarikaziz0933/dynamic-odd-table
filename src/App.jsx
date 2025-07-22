import React, { useState, useEffect, useRef } from "react";

import SearchBar from "./components/SearchBar";
import Suggestions from "./components/Suggestions";
import MatchDetails from "./components/MatchDetails";
import OddsTable from "./components/OddsTable";
import MatchHeader from "./components/MatchHeader";

export default function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const inputRef = useRef(null);


  // Load data.json
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.data)) {
          setData(json.data);
        } else {
          console.error("data.json format problem: json.data is not an array.");
        }
      })
      .catch((err) => console.error("Failed to load data.json:", err));
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const filtered = data.filter((item) => {
      const matchData = item.matches?.match;
      const term = searchTerm.toLowerCase();

      // Handle array
      if (Array.isArray(matchData)) {
        return matchData.some((match) => {
          const matchId = match?.id || "";
          const name = `${match?.localteam?.name || ""}${match?.awayteam?.name || ""}`.toLowerCase();
          return matchId.includes(term) || name.includes(term);
        });
      }

      // Handle object
      const matchId = matchData?.id || "";
      const name = `${matchData?.localteam?.name || ""}${matchData?.awayteam?.name || ""}`.toLowerCase();
      return matchId.includes(term) || name.includes(term);
    });


    setSuggestions(filtered);
  }, [searchTerm, data]);

  const onSelectMatch = (item) => {
    const matchData = item.matches?.match;
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setTimeout(() => {
      if (inputRef.current) inputRef.current.blur();
      setSuggestions([]);
    }, 0);

    if (Array.isArray(matchData)) {
      setSelectedMatch({ ...item, matches: { match: matchData[0] } }); // or show all matches if needed
      setSearchTerm(matchData[0]?.id || item.gid || "");
    } else {
      setSelectedMatch(item);
      setSearchTerm(matchData?.id || item.gid || "");
    }

    setSuggestions([]);
  };


  return (
    <div className="min-h-screen bg-[#182142] text-white p-4 font-sans">
      <div className="max-w-xl mx-auto mb-6 ">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          inputRef={inputRef}
        />
        {suggestions.length > 0 && (
          <Suggestions suggestions={suggestions} onSelectMatch={onSelectMatch} />
        )}
      </div>

      {selectedMatch && (
        <div className="max-w-5xl mx-auto bg-[#1f2a63] rounded p-6">
          <MatchHeader match={selectedMatch} />
          <MatchDetails match={selectedMatch} />
          <OddsTable match={selectedMatch} />
        </div>
      )}
    </div>
  );
}
