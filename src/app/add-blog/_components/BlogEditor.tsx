// 'use client';

// import React, { useRef, useEffect, Dispatch, SetStateAction } from 'react';
// import EditorJS, { OutputData } from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import ImageTool from '@editorjs/image';
// import Underline from '@editorjs/underline';

// interface EditorProps {
//   setEditorData: Dispatch<SetStateAction<OutputData>>;
//   setEditorMounted: Dispatch<SetStateAction<boolean>>;
//   // editorData: OutputData;
//   editorMounted: boolean;
// }

// const BlogEditor = ({
//   setEditorData,
//   editorMounted,
//   setEditorMounted,
// }: EditorProps) => {
//   const ejInstance = useRef<EditorJS | null>(null);
//   // const [isMounted, setIsMounted] = useState(false);

//   // Initialize EditorJS
//   const initEditor = async () => {
//     if (!editorMounted) return; // Ensure it's mounted
//     const editor = new EditorJS({
//       readOnly: false,
//       minHeight: 100,
//       holder: 'editorjs',
//       onReady: () => {
//         ejInstance.current = editor;
//       },
//       autofocus: true,
//       onChange: async () => {
//         const content = await editor.saver.save();
//         setEditorData(content);
//       },
//       tools: {
//         header: Header,
//         underline: Underline,
//         image: {
//           class: ImageTool,
//           config: {
//             uploader: {
//               // Upload by selecting a file
//               async uploadByFile(file: File) {
//                 const formData = new FormData();
//                 formData.append('file', file);
//                 const res = await actionCreateVehicleImageUploads(formData);
//                 // no error status
//                 if (res && res.url && !('statusCode' in res)) {
//                   return {
//                     success: 1,
//                     file: {
//                       url: 'https:',//res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${res.url},
//                     },
//                   };
//                 }
//               },

//               // by url
//               async uploadByUrl(url: string) {
//                 return {
//                   success: 2,
//                   file: {
//                     // url: ${url},
//                     url
//                   },
//                 };
//               },
//             },
//           },
//         },
//       },
//       // data: editorData,
//       placeholder: 'Let’s write an awesome article!',
//     });
//   };

//   // Initialize EditorJS on mount
//   useEffect(() => {
//     setEditorMounted(true);
//     if (ejInstance.current === null && editorMounted) {
//       initEditor();
//     }

//     return () => {
//       if (ejInstance.current) {
//         ejInstance.current.destroy();
//         ejInstance.current = null;
//       }
//     };
//   }, [editorMounted]);

  
//   return <div style={{ fontSize : '15px', fontWeight : '400'}}  id="editorjs"></div>;
// };

// export default BlogEditor;