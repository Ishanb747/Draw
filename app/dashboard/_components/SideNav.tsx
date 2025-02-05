import { Archive, ChevronDown, Flag, Github } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import SideNavtop, { PROJECT } from './SideNavtop';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavbot from './SideNavbot';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';
import Image from 'next/image';

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const [activeProject, setActiveProject] = useState<PROJECT | null>(null); // Initialize as null
  const convex = useConvex();
  const { fileList_, setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    if (activeProject) {
      getFiles();
    }
  }, [activeProject]);

  const createFile = useMutation(api.files.createFile);

  const menuList = [
    {
      id: 1,
      name: 'getting started',
      icon: Flag,
      path: '',
    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: '',
    },
    {
      id: 3,
      name: 'Archive',
      icon: Archive,
      path: '',
    },
  ];

  const onFileCreate = (fileName: string) => {
    if (!activeProject?._id) {
      toast('No active project selected');
      return;
    }

    createFile({
      fileName: fileName,
      // @ts-ignore
      projectID: activeProject._id, // Now we know activeProject._id is defined
      createdBy: user?.email || '', // Ensure createdBy is a string
      archive: false,
      document: '',
      whiteboard: '',
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast('File created successfully');
        }
      },
      (e) => {
        toast('Some error occurred, please try again!');
      }
    );
  };

  const getFiles = async () => {
    if (!activeProject?._id) {
      toast('No active project selected');
      return;
    }

    const result = await convex.query(api.files.getFiles, {
      // @ts-ignore
      projectID: activeProject._id, // Now we know activeProject._id is defined
    });
    setFileList_(result);
    console.log(result);
  };

  return (
    <div className="bg-white h-screen fixed w-64 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavtop
          user={user}
          setactiveProjectInfo={(activeProject: PROJECT) => setActiveProject(activeProject)}
        />
      </div>

      <div>
        <SideNavbot onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}

export default SideNav;