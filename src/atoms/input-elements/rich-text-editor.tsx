import React, { useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface RichTextEditorProps {
  className?: string;
  onContentChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ className, onContentChange }) => {
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
          document.querySelector('.ql-editor')?.addEventListener('onmousedown', () => {
            return false;
          });

          // Loop through the class names and remove elements of each class
          ['.ql-bold', '.ql-color', '.ql-font', '.ql-background', '.ql-image', '.ql-code-block'].forEach(
            (className) => {
              const elements = document.querySelectorAll(className);
              elements.forEach((element) => {
                element.remove();
              });
            }
          );
        }}
        style={{
          height: '320px',
          padding: '2px',
        }}
      />
    </div>
  );
};
