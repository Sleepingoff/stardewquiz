import { Stat } from "../../types";

const StatCard = ({ stats }: { stats: Stat }) => {
  return (
    <div>
      <h2>Your Quiz Stats</h2>
      <p>Total Quiz: {stats.totalQuiz}</p>
      <p>Average Score: {stats.averageScore}</p>
      <p>Best Scores by Category:</p>
      <ul>
        {Object.entries(stats.categoryScores).map(([category, score]) => (
          <li key={category}>
            {category}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatCard;
