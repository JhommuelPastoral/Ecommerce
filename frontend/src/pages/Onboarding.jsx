import useAuthUser from '../hooks/useAuthUser.js'
import { useEffect, useState } from 'react';
import { onboard } from '../lib/api.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export default function onboarding() {
  const {authData} = useAuthUser();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState('');
  useEffect(() => {
    if(!authData) return;
  }, [authData]);

  const {mutate: onboardData, isPending} = useMutation({
    mutationFn: onboard,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser']);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    onboardData({password});
  }

  return (
    <>
      <div className='max-w-[1200px]  mx-2.5  lg:mx-auto min-h-screen flex justify-center items-center font-Poppins '>
        <div className='flex w-full gap-4 '>
          <div className='flex flex-col items-center justify-center w-full gap-4 lg:w-1/2'>
            <form className='w-full space-y-5 lg:w-3/4 ' onSubmit={(e) => handleSubmit(e)}>
              <h1 className='text-lg font-semibold'> Complete Your Profile!</h1>
              {/* Name */}
              <div>
                <input type="text" placeholder="Name" className="w-full input rounded-xl" disabled={authData?.user?.name} value={authData?.user?.name}/>
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
                  <input type="email" placeholder="mail@site.com" required disabled={authData?.user?.email} value={authData?.user?.email}  />
                </label>
                <div className="hidden validator-hint">Enter valid email address</div>
              </div>
              {/* Password */}
              <div className='w-full'>
                <label className="w-full input validator">
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
                    className='w-full rounded-xl'
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
                <p className="hidden validator-hint">
                  Must be more than 6 characters, including
                  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                </p>
              </div>

              <div className="flex ">
                <button className="w-full btn btn-soft btn-primary rounded-2xl" disabled={isPending}>{isPending ? ( <div className='flex items-center gap2.5'> <span className="loading loading-spinner"></span> Onboarding</div> ) : "Submit"} </button>
              </div>

            </form>

          </div>
          {/* Right Side */}
          <div className='justify-center hidden w-1/2 lg:flex '>
            <img src="Done.gif" alt="LoginImage"  />
          </div>

        </div>
      </div>

    </>
  )
}
