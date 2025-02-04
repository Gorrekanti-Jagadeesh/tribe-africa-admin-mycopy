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

  const customToolbar = (
    <div id="custom-toolbar">
      <span className="ql-formats">
        <select className="ql-font">
          <option value="sans-serif" selected>
            Sans Serif
          </option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
      </span>
      <span className="ql-formats">
        <select className="ql-size">
          <option value="small">Small</option>
          <option value="normal" selected>
            Normal
          </option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color"></select>
        <select className="ql-background"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-align" value=""></button>
        <button className="ql-align" value="center"></button>
        <button className="ql-align" value="right"></button>
        <button className="ql-align" value="justify"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <button className="ql-code-block"></button>
      </span>
    </div>
  );

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
        headerTemplate={customToolbar} // Apply custom toolbar
        {...props}
        className={className}
      />
      {error && <span className="text-red-500 text-xs">{error}*</span>}
    </div>
  );
};
