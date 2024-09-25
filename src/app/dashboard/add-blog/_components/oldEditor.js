/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Underline from '@editorjs/underline';
import ImageTool from '@editorjs/image';
import api from '@/lib/api';

const Editor = ({ setEditorData, editorData }) => {
  const ejInstance = useRef();

  const initEditor = async () => {
    const editor = new EditorJS({
      readOnly: false,
      holder: 'editorjs',
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
                const url = '/api/requestservice/image';
                const res = await api.uploadImages(file, url);
                if (res?.ok) {
                  return {
                    success: 1,
                    file: {
                      url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${res.fileName}`,
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
      placeholder: 'Let`s write an awesome article!',
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
      <div className="border border-2 rounded-2 p-2 mb-3">
        <div id="editorjs"></div>
      </div>
    </>
  );
};

export default Editor;
