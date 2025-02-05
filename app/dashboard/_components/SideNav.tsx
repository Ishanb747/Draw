import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import SideNavtop, { PROJECT } from './SideNavtop'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavbot from './SideNavbot';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';
import Image from "next/image";

function SideNav() {
    const {user}:any = useKindeBrowserClient();
    const [activeProject, setactiveProject ] = useState<PROJECT>();
    const convex = useConvex();
    const {fileList_, setFileList_}  = useContext(FileListContext)

    useEffect(() => {
      activeProject&&getFiles();

    }, [activeProject])

    const createFile = useMutation(api.files.createFile);



    const menuList = [
      {
        id:1,
        name: 'getting started',
        icon: Flag,
        path: ''
      },
      {
        id:2,
        name: 'Github',
        icon: Github,
        path: ''
      },
      {
        id:3,
        name: 'Archive',
        icon: Archive,
        path: ''
      }
    ]

    const onFileCreate = (fileName: string) => {
      createFile(
        {
          fileName:fileName,
          projectID: activeProject?._id,
          createdBy: user?.email,
          archive: false,
          document: '',
          whiteboard: ''
        }).then(resp => {
          if(resp){
            getFiles();
            toast('File created succesfully')
          }
        }, (e) => {
          toast('Some error occured please try again!')
        })
      }

      const getFiles = async() => {
        const result = await convex.query(api.files.getFiles, {projectID : activeProject?._id});
        setFileList_(result);
        console.log(result);
      
      }

  
  return (
    <div className='bg-white h-screen fixed w-64 border-r p-6 flex flex-col'>

      <div className='flex-1'>
      <SideNavtop user = {user}  setactiveProjectInfo= {(activeProject:PROJECT) => setactiveProject(activeProject)}/>


      </div>
      
      <div>
      <SideNavbot onFileCreate={onFileCreate}/>
      </div>
    </div>


  )
}

export default SideNav
