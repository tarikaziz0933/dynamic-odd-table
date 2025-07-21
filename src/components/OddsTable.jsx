import CollapsibleOdds from "./CollapsibleOdds";

export default function OddsTable({ match }) {
    if (!match || !match.matches || !match.matches.match) {
        return <div>No odds data available.</div>;
    }

    const odds = match.matches.match.odds?.type || [];

    if (odds.length === 0) return <div>No odds data available.</div>;

    // Helper: Render a table based on odds object
    const renderTable = (bookmakerOdds) => {
        if (!Array.isArray(bookmakerOdds)) return null;

        return bookmakerOdds.map((bookmaker, idx) => {
            const { name, odd } = bookmaker;

            // Handle case: odds in array (standard)
            if (Array.isArray(odd)) {
                return (
                    <table key={idx} className="min-w-full mb-4 bg-[#1a2456] text-white border border-gray-700 text-sm">
                        <thead>
                            <tr className="bg-[#1f2a63]">
                                {odd.map((o, i) => (
                                    <th key={i} className="p-2 border border-gray-700 text-yellow-300">
                                        {o.name || o.handicap || o.type || `Option ${i + 1}`}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {odd.map((o, i) => (
                                    <td key={i} className="border border-gray-700 px-3 py-2 text-center">
                                        {o.value ?? "-"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                );
            }

            // Handle case: odds in object (e.g., Over/Under structure)
            if (typeof odd === "object" && odd !== null) {
                const keys = Object.keys(odd); // e.g., Over, Under
                const subKeys = Object.keys(odd[keys[0]]); // e.g., 1.5, 2

                return (
                    <table key={idx} className="min-w-full mb-4 bg-[#1a2456] text-white border border-gray-700 text-sm">
                        <thead>
                            <tr className="bg-[#1f2a63]">
                                <th className="p-2 border border-gray-700 text-yellow-300">Line</th>
                                {keys.map((k) => (
                                    <th key={k} className="p-2 border border-gray-700 text-yellow-300">{k}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {subKeys.map((sub, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-700 px-3 py-2 text-center text-gray-300">{sub}</td>
                                    {keys.map((k) => (
                                        <td key={k} className="border border-gray-700 px-3 py-2 text-center text-yellow-400">
                                            {odd[k][sub] ?? "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            }

            return null;
        });
    };

    return (
        <>
            {odds.map((oddType, i) => (
                <CollapsibleOdds key={i} title={oddType.value}>
                    <div className="overflow-x-auto">
                        {renderTable(oddType.bookmaker)}
                    </div>
                </CollapsibleOdds>
            ))}
        </>
    );
}
