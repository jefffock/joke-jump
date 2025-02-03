export default function TimestampButton({
  timestamp,
  label,
  handleTimestampClick,
}: {
  timestamp: number;
  label: string;
  handleTimestampClick: (timestamp: number) => void;
}) {
  return (
    <div className="flex m-4">
      <button
        type="button"
        onClick={() => handleTimestampClick(timestamp)}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        {label}
      </button>
    </div>
  );
}
