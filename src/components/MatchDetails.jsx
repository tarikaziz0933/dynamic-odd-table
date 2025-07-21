export default function MatchDetails({ match }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
                <div className="text-3xl font-semibold">{match.localteam.name}</div>
                <div className="text-yellow-400">({match.localteam.id})</div>
            </div>
            <div className="text-center flex-1">
                <div className="text-xl">{match.time}</div>
                <div className="text-4xl font-bold">{match.date}</div>
            </div>
            <div className="text-center flex-1">
                <div className="text-3xl font-semibold">{match.awayteam.name}</div>
                <div className="text-yellow-400">({match.awayteam.id})</div>
            </div>
        </div>
    );
}
