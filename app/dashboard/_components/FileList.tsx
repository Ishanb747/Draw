import { FileListContext } from '@/app/_context/FilesListContext'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import { Archive, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

export interface FILE {
  archive: boolean
  createdBy: string
  document: string
  fileName: string
  projectID: string
  whiteBoard: string
  _id: string
  _creationTime: number
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext)
  const [fileList, setFileList] = useState<any>()
  const { user }: any = useKindeBrowserClient()
  const router = useRouter()

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_)
    }
  }, [fileList_])

  const handleArchive = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click when clicking dropdown
    // Add your archive logic here
    console.log('Archive file:', fileId)
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto rounded-md mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-xl justify-center">
          <thead className="ltr:text-left rtl:text-right bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList && fileList.map((file: FILE, index: number) => (
              <tr 
                key={file._id}
                onClick={() => router.push('/workspace/' + file._id)}
                className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  {moment(file._creationTime).format('DD MMM YYYY')}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  {moment(file._creationTime).format('DD MMM YYYY')}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user?.picture && (
                    <div className="hover:scale-110 transition-transform duration-200">
                      <Image 
                        src={user.picture} 
                        className="rounded-full" 
                        alt="user" 
                        width={30} 
                        height={30} 
                      />
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className="outline-none">
                      <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={(e) => handleArchive(file._id, e)}
                        className="gap-2 cursor-pointer hover:bg-gray-100"
                      >
                        <Archive className="h-4 w-4" />
                        <span>Archive</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileList