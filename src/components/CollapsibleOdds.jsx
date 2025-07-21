import React, { useState } from "react";

export default function CollapsibleOdds({ title, children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-[#121a3a] mb-3 rounded shadow">
            <div
                className="cursor-pointer px-4 py-3 text-white font-semibold border-b border-gray-700 flex justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
}
