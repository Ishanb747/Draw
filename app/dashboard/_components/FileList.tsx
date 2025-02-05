import { FileListContext } from '@/app/_context/FilesListContext'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import { Archive, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export interface FILE{
  archive: boolean,
  createdBy: string,
  document:string,
  fileName: string,
  projectID: string,
  whiteBoard: string,
  _id: string,
  _creationTime: number

}
function FileList() {

  const { fileList_, setFileList_ } = useContext(FileListContext);

  const [fileList, setFileList ] = useState<any>();

  const {user}:any = useKindeBrowserClient();

  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  return (
    <div className='mt-6'>

<div className="overflow-x-auto rounded-md mt-10">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-xl justify-center">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      {fileList&&fileList.map((file:FILE,index:number)=> (
        <tr onClick={() => router.push('/workspace/' + file._id)}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY')}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY')}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.picture && (
  <Image src={user.picture} className='rounded-full' alt="user" width={30} height={30} />

)} </td>

    <DropdownMenu>
  <DropdownMenuTrigger> <td className="whitespace-nowrap px-4 py-2 outline-none font-medium text-gray-900"><MoreHorizontal/></td></DropdownMenuTrigger>
  <DropdownMenuContent>

    <DropdownMenuItem className='gap-3'><Archive height={4 } width={4}/>Archive</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

      </tr>

    ))}

    </tbody>
  </table>
</div>

    </div>
  )
}

export default FileList