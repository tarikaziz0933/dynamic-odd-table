export default function OddsTable({ match }) {
    if (!match || !match.matches || !match.matches.match) {
        return <div>No odds data available.</div>;
    }

    const matchData = match.matches.match;
    const odds = matchData.odds?.type || [];

    if (odds.length === 0) {
        return <div>No odds data available.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white border border-gray-700">
                <thead>
                    <tr>
                        <th className="border border-gray-700 px-4 py-2">Type</th>
                        {odds[0]?.bookmaker && odds[0].bookmaker.length > 0 &&
                            odds[0].bookmaker.map((bookmaker) =>
                                bookmaker.odd && bookmaker.odd.length > 0
                                    ? bookmaker.odd.map((odd, index) => (
                                        <th key={`${bookmaker.id}-${index}`} className="border border-gray-700 px-4 py-2">
                                            {bookmaker.name} <br /> {odd.name}
                                        </th>
                                    ))
                                    : null
                            )}
                    </tr>
                </thead>
                <tbody>
                    {odds.map((oddType, i) => (
                        <tr key={i}>
                            <td className="border border-gray-700 px-4 py-2">{oddType.value}</td>
                            {oddType.bookmaker && oddType.bookmaker.length > 0 &&
                                oddType.bookmaker.map((bookmaker) =>
                                    bookmaker.odd && bookmaker.odd.length > 0
                                        ? bookmaker.odd.map((odd, index) => (
                                            <td key={`${bookmaker.id}-${index}`} className="border border-gray-700 px-4 py-2">
                                                {odd.value}
                                            </td>
                                        ))
                                        : null
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
