import React, { useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface RichTextEditorProps {
  className?: string;
  remove?: string[];
  onContentChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  className,
  remove = ['color', 'font', 'background', 'code-block'],
  onContentChange,
}) => {
  const [text, setText] = useState<string>('');

  const handleChange = (content: string) => {
    setText(content);
    onContentChange(content);
  };

  return (
    <div className={className}>
      <Editor
        value={text}
        onTextChange={(e: EditorTextChangeEvent) => handleChange(e.htmlValue ? e.htmlValue : '')}
        onLoad={() => {
          // Loop through the class names and remove elements of each class
          // ['.ql-color', '.ql-font', '.ql-background', '.ql-code-block']
          remove.forEach((className) => {
            const elements = document.querySelectorAll('.ql-' + className);
            elements.forEach((element) => {
              element.remove();
            });
          });
        }}
        style={{
          height: '320px',
          padding: '2px',
        }}
      />
    </div>
  );
};
