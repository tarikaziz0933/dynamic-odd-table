export default function OddsTable({ match }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600 text-center text-sm">
                <thead className="bg-[#12255e]">
                    <tr>
                        <th className="border border-gray-600 py-2 px-4"></th>
                        {match.type.map((type) => (
                            <th
                                key={type.id}
                                className="border border-gray-600 py-2 px-4"
                                colSpan={type.bookmaker.length}
                            >
                                {type.value}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="border border-gray-600 py-2 px-4">Bookmaker</th>
                        {match.type.map((type) =>
                            type.bookmaker.map((book) => (
                                <th
                                    key={book.id}
                                    className="border border-gray-600 py-2 px-4"
                                >
                                    {book.name}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-600 py-2 px-4 font-semibold">
                            Odds
                        </td>
                        {match.type.map((type) =>
                            type.bookmaker.map((book) => (
                                <td
                                    key={book.id}
                                    className="border border-gray-600 py-2 px-4 text-yellow-400"
                                >
                                    {book.odds ?? "-"}
                                </td>
                            ))
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
