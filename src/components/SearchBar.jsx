export default function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            className="w-full p-3 rounded bg-[#1f2a63] placeholder-gray-400"
            placeholder="Search by Match ID or Name..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
