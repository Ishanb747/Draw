import React, { useCallback, useEffect, useState } from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';

const Canvas = ({ onSaveTrigger, fileId, fileData }: any) => {
  const [editor, setEditor] = useState<any>(null);
  const convex = useConvex();
  // @ts-ignore
  const { query } = useRouter(); // This gives you access to query params

  useEffect(() => {
    if (editor) {
      if (fileData?.whiteboard) {
        try {
          console.log("Loading saved whiteboard data");
          const savedData = JSON.parse(fileData.whiteboard);
          editor.store.loadSnapshot(savedData);
        } catch (e) {
          console.error("Error loading whiteboard data:", e);
        }
      } else {
        console.log("Creating new whiteboard");
        editor.selectAll();

        if (editor.selectedShapeIds && editor.selectedShapeIds.length > 0) {
          editor.deleteShapes(editor.selectedShapeIds);
        }

        editor.selectNone();
      }
    }
  }, [fileData, editor]);

  useEffect(() => {
    const saveWhiteboard = async () => {
      if (!editor || !fileId) return;

      try {
        console.log("Saving whiteboard...");
        const snapshot = editor.store.getSnapshot();
        const snapshotString = JSON.stringify(snapshot);

        await convex.mutation(api.files.updateWhiteboard, {
          _id: fileId,
          whiteboard: snapshotString,
        });

        console.log("Whiteboard saved successfully");
      } catch (e) {
        console.error("Error saving whiteboard:", e);
      }
    };

    if (onSaveTrigger) {
      saveWhiteboard();
    }
  }, [onSaveTrigger, editor, fileId, convex]);
// @ts-ignore
  const handleMount = useCallback((editorInstance) => {
    console.log("TLDraw mounted");
    setEditor(editorInstance);
  }, []);

  return (
    <div className="relative w-full h-full border-l border-gray-200">
      <Tldraw
        onMount={handleMount}
        className="h-full w-full absolute inset-0"
        inferDarkMode={false}
        // @ts-ignore
        darkMode={false}
        showMenu={true}
        showStyles={true}
        showTools={true}
        showZoom={true}
        showPages={true}
      />
    </div>
  );
};

export default Canvas;