"use client";

// Importing the RootState type from the store definition.
import { RootState } from "@/lib/store";
// Importing the useSelector hook from react-redux to access the Redux store's state.
import { useSelector } from "react-redux";
export default function Result() {

  // Using the useSelector hook to extract the counter value from the Redux store's state.
  // The state parameter is typed as RootState, and we access the counter slice's value property.
  const countState = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="mt-4">
      <h1 className="text-center mb-4">Component 2</h1>
      <div className=" bg-yellow-100 flex flex-col items-center border p-10 w-64">
        <h2 className=" text-center py-1 px-4 font-semibold text-gray-600 ">
          Result
        </h2>
        <p className="border py-2 px-4 text-gray-600 font-bold">{countState}</p>
      </div>
    </div>
  );
}