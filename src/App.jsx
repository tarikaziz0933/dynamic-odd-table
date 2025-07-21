import React, { useState, useEffect } from "react";
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
      const matchId = item.matches?.match?.id || "";
      const gid = item.gid || "";
      const name = item.name?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();

      return matchId.includes(term) || gid.includes(term) || name.includes(term);
    });

    setSuggestions(filtered);
  }, [searchTerm, data]);

  const onSelectMatch = (item) => {
    setSelectedMatch(item);
    setSearchTerm(item.matches?.match?.id || item.gid || "");
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-[#182142] text-white p-4 font-sans">
      <div className="max-w-xl mx-auto mb-6 ">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
