"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '@/app/dashboard/_components/FileList'
import Canvas from '../_components/canvas'
import { use } from 'react'

interface WorkspaceProps {
  params: Promise<{
    fileid: string;
  }>;
}

function Workspace({ params }: WorkspaceProps) {
    const [triggerSave, setTriggerSave] = useState(false)
    const [fileData, setFileData] = useState<FILE | any>(null)
    const convex = useConvex()

    const unwrappedParams = use(params);

    useEffect(() => {
        if (unwrappedParams?.fileid) {
            getFileData();
        }
    }, [unwrappedParams?.fileid]);

    const getFileData = async () => {
        try {
            if (!unwrappedParams?.fileid) return;
            const result = await convex.query(api.files.getFileById, {
                // @ts-ignore
                _id: unwrappedParams.fileid
            });
            setFileData(result);
        } catch (error) {
            console.error('Error fetching file data:', error);
        }
    }

    const handleSave = async (fileId: string) => {
        if (!fileId) return;
        console.log('Save triggered with fileId:', fileId);
        setTriggerSave((prev) => !prev);
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-hidden">
            <WorkspaceHeader 
                onSave={handleSave}
                fileId={unwrappedParams?.fileid}
                fileName={fileData?.fileName}
            />
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
                <div className="h-full overflow-y-auto">
                    <Editor 
                        onSaveTrigger={triggerSave}
                        fileId={unwrappedParams?.fileid}
                        fileData={fileData}
                    />
                </div>
                <div className="h-full relative">
                    <Canvas 
                        onSaveTrigger={triggerSave}
                        fileId={unwrappedParams?.fileid}
                        fileData={fileData}
                    />
                </div>
            </div>
        </div>
    )
}

export default Workspace
