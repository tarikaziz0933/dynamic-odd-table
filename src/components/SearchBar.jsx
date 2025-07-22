


export default function SearchBar({ searchTerm, setSearchTerm, inputRef }) {
    return (
        <input
            ref={inputRef}
            type="text"
            className="w-full p-3 rounded bg-[#1f2a63] placeholder-gray-400"
            placeholder="Search by Match ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}
