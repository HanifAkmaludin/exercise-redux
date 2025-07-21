export default function ResultTwo({ count }: { count?: number }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold">Result Two: { count }</h2>
    </div>
  );
}