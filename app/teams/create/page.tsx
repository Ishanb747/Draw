"use client";
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { appRouterContext } from 'next/dist/server/route-modules/app-route/shared-modules';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {

  const [ Project, setProject ] = useState('')

  const createProject = useMutation(api.teams.createProject);
  const {user}:any = useKindeBrowserClient();
  const router = useRouter();
  const createnewProject = () => {
    createProject({
      Project: Project,
      CreatedBy: user?.email
    }).then(resp=>{
      console.log(resp);
      if(resp){
        router.push('/dashboard')
        toast('team created succesfully')

      }
    })
  }

  return (
    <div className='flex flex-col items-center bg-black min-h-screen'>
      <div className="flex items-center gap-4 mt-6">
        <svg
          className="w-[4rem] h-[4rem]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
        >
          <path d="M23.336 27H8.664A3.668 3.668 0 0 1 5 23.336V8.664A3.668 3.668 0 0 1 8.664 5h14.672A3.668 3.668 0 0 1 27 8.664v14.672A3.668 3.668 0 0 1 23.336 27zM8.664 7C7.746 7 7 7.746 7 8.664v14.672C7 24.254 7.746 25 8.664 25h14.672c.918 0 1.664-.746 1.664-1.664V8.664C25 7.746 24.254 7 23.336 7H8.664z" />
        </svg>

        <a className="text-4xl font-bold text-white">DRAW</a>
      </div>

      <h2 className='font-bold text-[40px] py-3 mt-4 text-white mr-4 ml-4'>What are we going to call your project?</h2>
      <h2 className='text-gray-500'>You can always change this later from settings.</h2>

      <div className='flex flex-col mt-5 w-full max-w-[40rem] ml-4 mr-4'>
        <label className='text-white text-lg mb-2'>Project name</label>
        <input  className = "w-full h-12  sm:px-4 rounded-md border border-gray-700 bg-transparent placeholder-gray-700 text-white focus:outline-none focus:border-blue-500"type='text'  placeholder='please enter project name' onChange={(e) => setProject(e.target.value)} ></input>
        
      </div>

      <button onClick={createnewProject} className='mt-6 w-full max-w-[40rem] h-12 bg-transparent border border-gray-700 text-white font-bold hover:border-blue-500  rounded-md transition ' disabled= {!(Project&&Project?.length>0)}> Continue</button>
      

    </div>
  );
};

export default Page;
