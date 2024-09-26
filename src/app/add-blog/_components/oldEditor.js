import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import ImageTool from "@editorjs/image";

const Editor = ({ setEditorData, editorData }) => {
  const ejInstance = useRef();

  const initEditor = async () => {
    const editor = new EditorJS({
      readOnly: false,
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        const content = await editor.saver.save();
        setEditorData(content);
      },
      tools: {
        header: Header,
        underline: Underline,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await actionCreateVehicleImageUploads(formData);

                // no error status
                if (res && res.url && !("statusCode" in res)) {
                  return {
                    success: 1,
                    file: {
                      url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${res.url}`,
                    },
                  };
                }
              },
            },
          },
        },
      },
      // Handle potential initial data
      data: editorData,
      placeholder: "Let`s write an awesome article!",
    });

    // Restore data from editorData if available on initial render
    // if (editorData) {
    //   try {
    //     await editor.restore(editorData);
    //   } catch (error) {
    //     console.error('Error restoring editor data:', error);
    //   }
    // }
  };

  useEffect(() => {
    if (ejInstance.current !== null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <>
      <div className="">
        <div id="editorjs"></div>
      </div>
    </>
  );
};

export default Editor;
