"use client"
import { ChevronDown, LayoutGrid, LogOutIcon, Settings, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export interface PROJECT{
    createdBy: String,
    Project: String,
    _id: String
}

function SideNavtop({user, setactiveProjectInfo}:any) {
    const menu = [
        {
            id: 1,
            name: 'Create project',
            path: '/teams/create',
            icon: Users
        },
        {
            id:2,
            name: 'Settings',
            path: '/',
            icon: Settings
        }
    ]

    const [projectList, setprojectList] = useState<PROJECT[]>();

    const [activeProject, setactiveProject] = useState<PROJECT | undefined>();



    const convex = useConvex();

    useEffect(() => {
      activeProject&&setactiveProjectInfo(activeProject)

    }, [activeProject])

    useEffect(() => {
        user&&getProjectList();
    }, [user])


    const getProjectList = async() => {
        const result = await convex.query(api.teams.getProject, {email:user?.email})
        setprojectList(result);
        setactiveProject(result[0]);
    }
    const router = useRouter();

    const OnMenuClick = (item:any)=> {
        if(item.path){

            router.push(item.path);

        }

    }

  return (

    <div>
            <Popover>
      <PopoverTrigger>
        {" "}
        <div className="flex items-center gap-3 hover:bg-slate-200 rounded-lg p-2 cursor-pointer ">
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M23.336 27H8.664A3.668 3.668 0 0 1 5 23.336V8.664A3.668 3.668 0 0 1 8.664 5h14.672A3.668 3.668 0 0 1 27 8.664v14.672A3.668 3.668 0 0 1 23.336 27zM8.664 7C7.746 7 7 7.746 7 8.664v14.672C7 24.254 7.746 25 8.664 25h14.672c.918 0 1.664-.746 1.664-1.664V8.664C25 7.746 24.254 7 23.336 7H8.664z" />
          </svg>

          <h2 className="flex gap-2 items-center font-bold text-[17px]">
          {activeProject?.Project || "No Project Selected"}

          </h2>

          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-6 p-4">

        <div>
            {projectList?.map((projectList,index) => (
                <h2 className= {`p-2 hover:bg-gray-100  rounded-lg mb-2 ml-1 cursor-pointer ${activeProject?._id == projectList._id && 'bg-gray-100 '}`} key={index} onClick={() => setactiveProject(projectList)}>{projectList.Project}</h2>
            ))}
        </div>

        <hr className="my-2 border-gray-400" />

        <div>
                {menu.map((item) => (
        <h2 key={item.id} className="flex gap-3 items-center p-2 hover:bg-gray-100 rounded-md text-sm" onClick={() => OnMenuClick(item)}>
            <item.icon className="h-4 w-4" /> {item.name}
        </h2>
        ))}

            <LogoutLink>
            <h2 className="flex gap-3 items-center p-2  hover:bg-gray-100 rounded-md text-sm"> <LogOutIcon className="h-4 w-4"/> Logout </h2>
            </LogoutLink>
            
        </div>

        <hr className="my-2 border-gray-400" />

        {user&& <div className="mt-3 flex gap-3">

             <Image src = {user.picture} alt = 'user' width = {30} height = {30} className="rounded-full"/>

             <h2 className="font-bold text-[14px]">{user?.given_name} {user?.family_name}</h2>

        </div>
            
        }


      </PopoverContent>
    </Popover>

    {/* All file button */}
    <Button variant = 'outline' className = 'w-full justify-start gap-2 font-bold mt-8 bg-gray-200'>
        <LayoutGrid className="h-5 w-5"/>
        All Files
    </Button>

    </div>
  );
}

export default SideNavtop;
