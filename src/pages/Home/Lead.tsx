import { Link } from "react-router-dom";

const Lead = () => (
  <>
    <h1 className="text-6xl font-semibold leading-snug">Auth</h1>
    <div className="flex gap-14">
      <Link
        to={"/login"}
        className="transition-all rounded-full text-black px-6 py-4 text-xl border border-gray-400 hover:bg-gray-400 focus:outline-none"
        role="button"
      >
        Log in
      </Link>
      <Link
        to={"/signup"}
        className="bg-indigo-600 transition-all rounded-full text-white px-6 py-4 text-xl hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
        role="button"
      >
        Sign up
      </Link>
    </div>
  </>
);

export default Lead;
