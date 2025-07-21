import ResultTwo from "./ResultTwo";

export default function ResultOne({ count }: { count?: number }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold">Result One: { count }</h2>
      <ResultTwo count={count} />
    </div>
  );
}