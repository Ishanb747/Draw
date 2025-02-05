"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '@/app/dashboard/_components/FileList';

const rawDocument = {
    "time": 1550476186479,
    "blocks": [{
        data: {
            text: "Document Name",
            level: 2
        },
        _id: "123",
        type: 'header'
    }],
    "version": "2.8.1"
}

function Editor({ onSaveTrigger, fileId, fileData}: {onSaveTrigger:any, fileId:any,fileData:FILE}) {
    // @ts-ignore
    const ref = useRef<EditorJS>();
    const updateDocument = useMutation(api.files.updateDocument);
    const [document, setDocument] = useState(rawDocument);

    useEffect(()=>{
        fileData&&initEditor();
    },[fileData])

    useEffect(() => {
        console.log('trigger value', onSaveTrigger)
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger])

    const onSaveDocument=()=>{
        if(ref.current)
        {
          ref.current.save().then((outputData) => {
            console.log('Article data: ', outputData);
            updateDocument({
              _id:fileId,
              document:JSON.stringify(outputData)
            }).then(resp=>{
              
                toast('Document Updated!')
              
            },(e)=>{
              toast("Server Error!")
            })
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        }
      }

    const initEditor = () => {
        const editor = new EditorJS({
            tools: {
                header: {
                    // @ts-ignore
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: "Enter a Header"
                    }
                },
                list: {
                    // @ts-ignore
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                paragraph: {
                    // @ts-ignore
                    class: Paragraph,
                    inlineToolbar: true,
                },
                image: SimpleImage,
            },
            holder: 'editorjs',
            data:fileData?.document?JSON.parse(fileData.document):rawDocument
        });

        ref.current = editor;
    }

    return (
        <div>
            <div id='editorjs' className='ml-20'></div>
        </div>
    )
}

export default Editor