import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleGoogleLogin, login } from '../lib/api.js'


export default function Login() {
  const queryClient = useQueryClient();

  const{mutate: loginData, data: user} = useMutation({
    mutationFn: handleGoogleLogin,
    onSuccess: (data) => {
      userLogin(data);
    }
  });

  const {mutate: userLogin} = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['authUser']);
    }
  });
  
  const handleGoogleLogins = async() => {
    loginData();
  }

  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="w-auto h-10 mx-auto"
            />
            <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleGoogleLogins}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-gray-500 text-sm/6">
              Not a member?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
