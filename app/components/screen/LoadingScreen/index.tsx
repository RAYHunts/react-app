import { twMerge } from "tailwind-merge";

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={twMerge("absolute inset-0 flex items-center justify-center z-50 duration-300", isLoading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full transition-all duration-500 ease-in-out pointer-events-none hidden")}>
      <h1 className="text-2xl font-bold text-white">Loading...</h1>
      <div className="absolute inset-0 bg-blue-950 -z-10"></div>
    </div>
  );
}
