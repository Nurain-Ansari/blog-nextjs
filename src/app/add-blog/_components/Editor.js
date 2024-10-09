/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import ImageTool from "@editorjs/image";

class MyHeader extends Header {
  /**
   * Return Tool's view
   * @returns {HTMLHeadingElement}
   * @public
   */
  render() {
    const extrawrapper = document.createElement("div");
    extrawrapper.classList.add("content");
    extrawrapper.appendChild(this._element);

    return extrawrapper;
  }
}

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
        header: {
          class: MyHeader,
          config: {
            placeholder: "Enter a header",
            inlineToolbar: true,
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        underline: Underline,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const url = "/api/requestservice/image";
                const res = await api.uploadImages(file, url);
                if (res?.ok) {
                  return {
                    success: 1,
                    file: {
                      // url: 'https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${res.fileName',
                      url: "",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <div className="border border-2 rounded-2 p-2 mb-3"> */}
      <div className="content">
        <div id="editorjs"></div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Editor;
