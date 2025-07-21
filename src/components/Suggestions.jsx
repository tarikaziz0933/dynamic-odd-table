export default function Suggestions({ list, onSelect }) {
    if (!list.length) return null;
    return (
        <ul className="absolute z-10 w-full bg-[#1f2a63] border border-gray-700 rounded mt-1 max-h-48 overflow-auto">
            {list.map((item) => (
                <li
                    key={item.id}
                    className="p-2 hover:bg-[#293575] cursor-pointer"
                    onClick={() => onSelect(item)}
                >
                    {item.name} (ID: {item.id})
                </li>
            ))}
        </ul>
    );
}
