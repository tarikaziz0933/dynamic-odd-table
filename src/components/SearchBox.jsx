import React from 'react';

const SearchBox = ({ matches, searchTerm, setSearchTerm, onSelectMatch }) => {
    const suggestions = matches.filter(m =>
        m.matchId.includes(searchTerm) || m.matchName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search by Match ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <ul className="suggestions">
                    {suggestions.map(match => (
                        <li key={match.matchId} onClick={() => {
                            onSelectMatch(match);
                            setSearchTerm('');
                        }}>
                            {match.matchId} - {match.matchName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
