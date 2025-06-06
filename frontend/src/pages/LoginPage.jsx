import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleGoogleLogin, login, userLogin } from '../lib/api.js'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
export default function LoginPage() {

  const [form, setForm] = useState({email: '', password: ''});
  const queryClient = useQueryClient();

  const{mutate: loginData} = useMutation({
    mutationFn: handleGoogleLogin,
    onSuccess: (data) => {
      googleLogin(data);
    }
  });

  const {mutate: userLoginData} = useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser']);
      toast.success('Login successful');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const {mutate: googleLogin} = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser']);
      toast.success('Login successful');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
  
  const handleGoogleLogins = async() => {
    loginData();
  }

  const handleLogin = () =>{
    userLoginData(form);
  }
  
  return (
    <>
      <div className='max-w-[1200px]  mx-2.5  lg:mx-auto min-h-screen flex justify-center items-center font-Poppins '>
        <div className='flex w-full gap-4 '>
          <div className='flex flex-col items-center justify-center w-full gap-4 lg:w-1/2'>
            <form className='w-full space-y-5 lg:w-3/4 '>
              <h1 className='text-lg font-semibold'> Welcome back!</h1>
              <p>Enter your Credentials to access your account</p>
              
              {/* Email */}
              <div>
                <label className="w-full border input validator rounded-xl ">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input type="email" placeholder="mail@site.com" required onChange={(e) => setForm({...form, email: e.target.value})} value={form.email} />
                </label>
                <div className="hidden validator-hint">Enter valid email address</div>
              </div>
              {/* Password */}
              <div>
                <label className="w-full input rounded-xl ">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                      ></path>
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e)=>{setForm({...form, password: e.target.value})}}
                    value={form.password}
                  />
                </label>
              </div>

              <div className="flex flex-col w-full gap-3">
                <div className="grid card rounded-box place-items-center">
                  <button type='button'  className="w-full btn btn-soft btn-primary rounded-2xl" onClick={handleLogin}>Login</button>
                </div>
                <div className="divider">OR</div>
                <div className="grid card rounded-box place-items-center">
                  <button type='button' className="w-full btn btn-soft btn-primary rounded-2xl" onClick={handleGoogleLogins}>Google Sign in</button>
                </div>
              </div>

            </form>
            <div className='flex gap-2.5'>
              <p className='font-light'>Dont have an account?</p>
              <a href="/signup" className='font-semibold link'>Sign up</a>
            </div>
          </div>

          <div className='justify-center hidden w-1/2 lg:flex '>
            <img src="Login.gif" alt="LoginImage"  />
          </div>

        </div>
      </div>

    </>
  )
}
