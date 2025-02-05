'use client'
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav';
import { FileListContext } from '../_context/FilesListContext';
function DashboardLayout(

    {
        
            children,
          }: Readonly<{
            children: React.ReactNode;
            }>
) {

    const {user }:any = useKindeBrowserClient();
    const router = useRouter();
    const convex = useConvex();

    const [fileList_, setFileList_] = useState();

    useEffect(() => {
        user&&checkTeam();

    }, [user])


    const checkTeam = async() => {

        const result = await convex.query(api.teams.getProject, {email:user?.email})

        if(!result?.length){
            router.push('teams/create')

        }

    }
  return (
    <div>
      <FileListContext.Provider value={{fileList_, setFileList_}}>

          <div className='grid grid-cols-4 h-screen w-screen bg-black'>
      <div className='h-screen w-72 fixed'>
        <SideNav/>
      </div>
      <div className='col-span-4 ml-72'>
      {children}
      </div>
        
    </div>
    </FileListContext.Provider>


    </div>

  )
}

export default DashboardLayout
