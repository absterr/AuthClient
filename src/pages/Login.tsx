import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Log in to Compass
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
              >
                Create a free account
              </Link>
            </p>

            <form className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email to get started"
                      className="entry"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Password{" "}
                    </label>

                    <a
                      href="#"
                      title=""
                      className="text-sm font-medium text-indigo-600 hover:underline hover:text-indigo-700 focus:text-indigo-700"
                    >
                      {" "}
                      Forgot password?{" "}
                    </a>
                  </div>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="entry"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" className="submit__btn">
                    Log in
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3 space-y-3">
              <button type="button" className="google__btn">
                <div className="absolute inset-y-0 left-0 p-4">
                  <svg
                    className="w-6 h-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </div>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
