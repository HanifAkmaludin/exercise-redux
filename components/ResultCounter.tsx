import ResultOne from "./ResultOne";

export default function ResultCounter({ count }: { count?: number }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold">Result Counter: { count }</h2>
      <ResultOne count={count} />
    </div>
  );
}