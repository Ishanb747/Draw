import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {
    const {user}:any=useKindeBrowserClient();
  return (
    <div className='flex justify-end w-full gap-2 items-center'>
        <div className='flex gap-2 items-center border rounded-md p-1'>
            <Search className='h-4 w-4 '/>
            <input type='text' placeholder='Search' className='bg-transparent w-full outline-none text-white border-none'/>
        </div>
        <div>
            <Image src={user?.picture} alt='user'
            width={40}
            height={40}
            className='rounded-full'
            />
        </div>

    </div>
  )
}

export default Header