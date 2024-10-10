/* eslint-disable no-case-declarations */

import Image from 'next/image';
import React from 'react';

const EditorOutput = ({ blocks }) => {
  return <div>{convertDataToHtml(blocks)}</div>;
};

export default EditorOutput;

export function convertDataToHtml(value) {
    console.log(value);
  if (Array.isArray(value)) {
    return value.map((block, index) => {
      switch (block.type) {
        case 'header':
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: `<h${block?.data?.level}>${block.data.text}</h${block.data.level}>`,
              }}
            />
          );
        case 'paragraph':
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: <div class="my-4"  style="margin-block: 24px">${block.data.text}</div>,
              }}
            />
          );
        case 'delimiter':
          return <hr key={index} />;
        case 'list':
          return (
            <ul key={index}>
              {block.data.items.map((li, subIndex) => (
                <li key={subIndex}>{li}</li>
              ))}
            </ul>
          );
        case 'image':
          const imageUrl = block.data.file.url;
          const { caption } = block.data;
          return (
            <div
              key={index}
              style={{ height: '400px', width: '100%', position: 'relative' }}
            >
              <Image
                className="w-100"
                fill
                src={imageUrl}
                alt={caption}
                objectFit="cover"
              />
              <p>{caption}</p>
            </div>
          );
        default:
          return null;
      }
    });
  }
  return null;
}