import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation';

function WorkspaceHeader({ onSave, fileId, fileName }:any) {
   const router = useRouter();
  return (
    <div className='flex gap-2 p-3 border-b justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <svg onClick={() => router.push('/dashboard')}
          className="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M23.336 27H8.664A3.668 3.668 0 0 1 5 23.336V8.664A3.668 3.668 0 0 1 8.664 5h14.672A3.668 3.668 0 0 1 27 8.664v14.672A3.668 3.668 0 0 1 23.336 27zM8.664 7C7.746 7 7 7.746 7 8.664v14.672C7 24.254 7.746 25 8.664 25h14.672c.918 0 1.664-.746 1.664-1.664V8.664C25 7.746 24.254 7 23.336 7H8.664z" />
        </svg>
        <h2>{fileName || 'Untitled'}</h2>
      </div>
      
      <div className='flex gap-3'>
        <Button className="h-8 text-[12px] gap-2 bg-blue-500 text-white">
          Share!
        </Button>
        <Button 
          className="h-8 text-[12px] gap-2 bg-black text-white" 
          onClick={() => onSave(fileId)}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader