import { User } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { signUp } from '../lib/api.js';

export default function SignupPage() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const queryClient = useQueryClient(); 

  const {mutate: signUpData, isPending} = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser']);
      toast.success('Signup successful');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpData(form);
  }
  

  return (
    <>
      <div className='max-w-[1200px]  mx-2.5  lg:mx-auto min-h-screen flex justify-center items-center font-Poppins '>
        <div className='flex w-full gap-4 '>
          <div className='flex flex-col items-center justify-center w-full gap-4 lg:w-1/2'>
            <form className='w-full space-y-5 lg:w-3/4 ' onSubmit={(e) => handleSubmit(e)}>
              <h1 className='text-lg font-semibold'> Get Started Now</h1>
              
              {/* Full Name */}
              <div className="relative w-full">
                <User className="absolute text-gray-500 -translate-y-1/2 top-1/2 left-3" size={16} />
                <input
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  type="text"
                  placeholder="Full Name"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-xl "
                />
              </div>

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
                  <input type="email" placeholder="mail@site.com" required  onChange={(e) => setForm({...form, email: e.target.value})} value={form.email}/>
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
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    value={form.password}
                  />
                </label>
              </div>

              <div className="flex flex-col w-full gap-3">
                <div className="grid card rounded-box place-items-center">
                  <button className="w-full btn btn-soft btn-primary rounded-2xl" disabled={isPending}> {isPending ? <div className='flex items-center gap-2'> <span className='loading loading-spinner'> </span> Signing Up</div> : 'Sign Up'} </button>
                </div>

              </div>

            </form>
            <div className='flex gap-2.5'>
              <p className='font-light'>Have an account?</p>
              <a href="/login" className='font-semibold link'>Sign In</a>
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
