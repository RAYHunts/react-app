import { NavLink } from "react-router";

export function Welcome() {
  return (
    <main className="mt-14">
      <div className=" flex flex-col">
        <ul className="flex flex-col gap-2">
          <li className="hover:underline cursor-pointer bg-green-800 text-white p-2 rounded-md">
            <NavLink to="/products">Go To Products</NavLink>
          </li>
        </ul>
      </div>
    </main>
  );
}
