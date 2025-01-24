interface ProgressProps {
  current: number;
  total: number;
}

const Progress = ({ current, total }: ProgressProps) => {
  const percentage = (current / total) * 100;
  return (
    <label>
      <div>
        <span>{current}</span>/<span>{total}</span>
      </div>
      <progress max={100} value={percentage} />
    </label>
  );
};

export default Progress;
