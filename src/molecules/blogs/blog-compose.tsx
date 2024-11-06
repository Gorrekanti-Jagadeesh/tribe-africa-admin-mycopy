// RichTextEditorQuill.js
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditorQuill = ({ className }: { className: string }) => {
  const [content, setContent] = useState('');

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="text-2xl">Write a BLOG</h2>
      <ReactQuill value={content} onChange={setContent} />
    </div>
  );
};

export default RichTextEditorQuill;
