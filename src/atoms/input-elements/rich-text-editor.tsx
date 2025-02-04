import React, { useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface RichTextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  error?: string; // error message
  remove?: string[];
  height?: number;
  required?: boolean;
  onContentChange?: (content: string) => void;
  props?: React.HTMLAttributes<HTMLSelectElement>;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  className,
  label,
  placeholder = 'Enter content',
  error,
  remove = ['color', 'font', 'background', 'code-block'],
  onContentChange,
  height = 250,
  required = true,
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
      {label && (
        <label className="font-semibold">
          {label}
          {required && <span className="text-red-500 text-sm">*</span>}
        </label>
      )}
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
        style={{
          height: height,
        }}
        {...props}
        className={className}
      />
      {error && <span className="text-red-500 text-xs">{error}*</span>}
    </div>
  );
};
