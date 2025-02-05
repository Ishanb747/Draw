import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
function SideNavbot({onFileCreate}:any) {
    const [fileInput, setFileInput] = useState('');
    const [open, setOpen] = useState(false);
    
    
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

    const handleCreateFile = () => {
        if (fileInput && fileInput.length > 3) {
            onFileCreate(fileInput);
            setFileInput('');
            setOpen(false);  // Close the dialog programmatically
        }
    }

    return (
        <div>
            {menuList.map((menu,index) => (
                <h2 key={index} className='flex hover:bg-gray-100 rounded-md cursor-pointer p-1 gap-2 px-1 text-[14px]'>
                    <menu.icon className='h-5 w-5'/> {menu.name}
                </h2>
            ))}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='w-full' asChild>
                    <Button className='w-full justify-start mt-4'>New File</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New File!</DialogTitle>
                        <DialogDescription>
                            <Input 
                                placeholder="Write a file name" 
                                className='mt-3'
                                value={fileInput}
                                onChange={(e) => setFileInput(e.target.value)}
                            />
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                        <Button 
                            type="button" 
                            variant="secondary" 
                            className='bg-black hover:bg-black w-full text-white'
                            onClick={handleCreateFile}
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SideNavbot