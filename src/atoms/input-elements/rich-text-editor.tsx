import React, { useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface RichTextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  name: string; // field name
  error?: string; // error message
  remove?: string[];
  onContentChange: (content: string) => void;
  props?: React.HTMLAttributes<HTMLSelectElement>;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  className,
  label,
  placeholder = 'Enter content',
  name,
  error,
  remove = ['color', 'font', 'background', 'code-block'],
  onContentChange,
  ...props
}) => {
  const [text, setText] = useState<string>('');

  const handleChange = (content: string) => {
    const cleanContent = content.replace(/<p>/g, '').replace(/<\/p>/g, ''); // Example cleaning
    setText(cleanContent);
    onContentChange(cleanContent);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="font-semibold">{label}</label>}
      <Editor
        value={text}
        onTextChange={(e: EditorTextChangeEvent) => handleChange(e.htmlValue || '')}
        onLoad={() => {
          remove.forEach((className) => {
            const elements = document.querySelectorAll(`.ql-${className}`);
            elements.forEach((element) => element.remove());
          });
        }}
        placeholder={placeholder}
        className="h-72"
        {...props}
      />
      {error && <span className="text-red-500 text-xs">{error}*</span>}
    </div>
  );
};
