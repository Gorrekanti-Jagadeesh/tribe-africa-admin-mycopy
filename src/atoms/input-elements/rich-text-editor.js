import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Editor } from 'primereact/editor';
export const RichTextEditor = ({
  className,
  label,
  placeholder = 'Enter content',
  error,
  remove = ['color', 'font', 'background', 'code-block'],
  onContentChange,
  formType, // Receive formType as a prop
  height = 250,
  required = true,
  ...props
}) => {
  const [text, setText] = useState('');
  // Reset editor content when formType changes
  useEffect(() => {
    setText('');
  }, [formType]);
  const handleChange = (content) => {
    const cleanContent = content.replace(/<p>/g, '').replace(/<\/p>/g, ''); // Example cleaning
    setText(cleanContent);
    if (onContentChange) onContentChange(cleanContent);
  };
  const customToolbar = _jsxs('div', {
    id: 'custom-toolbar',
    children: [
      _jsx('span', {
        className: 'ql-formats',
        children: _jsxs('select', {
          className: 'ql-font',
          children: [
            _jsx('option', { value: 'sans-serif', selected: true, children: 'Sans Serif' }),
            _jsx('option', { value: 'serif', children: 'Serif' }),
            _jsx('option', { value: 'monospace', children: 'Monospace' }),
          ],
        }),
      }),
      _jsx('span', {
        className: 'ql-formats',
        children: _jsxs('select', {
          className: 'ql-size',
          children: [
            _jsx('option', { value: 'small', children: 'Small' }),
            _jsx('option', { value: 'normal', selected: true, children: 'Normal' }),
            _jsx('option', { value: 'large', children: 'Large' }),
            _jsx('option', { value: 'huge', children: 'Huge' }),
          ],
        }),
      }),
      _jsxs('span', {
        className: 'ql-formats',
        children: [
          _jsx('button', { className: 'ql-bold' }),
          _jsx('button', { className: 'ql-italic' }),
          _jsx('button', { className: 'ql-underline' }),
        ],
      }),
      _jsxs('span', {
        className: 'ql-formats',
        children: [_jsx('select', { className: 'ql-color' }), _jsx('select', { className: 'ql-background' })],
      }),
      _jsxs('span', {
        className: 'ql-formats',
        children: [
          _jsx('button', { className: 'ql-list', value: 'ordered' }),
          _jsx('button', { className: 'ql-list', value: 'bullet' }),
        ],
      }),
      _jsxs('span', {
        className: 'ql-formats',
        children: [
          _jsx('button', { className: 'ql-align', value: '' }),
          _jsx('button', { className: 'ql-align', value: 'center' }),
          _jsx('button', { className: 'ql-align', value: 'right' }),
          _jsx('button', { className: 'ql-align', value: 'justify' }),
        ],
      }),
      _jsxs('span', {
        className: 'ql-formats',
        children: [
          _jsx('button', { className: 'ql-link' }),
          _jsx('button', { className: 'ql-image' }),
          _jsx('button', { className: 'ql-code-block' }),
        ],
      }),
    ],
  });
  return _jsxs('div', {
    className: `flex flex-col gap-2 ${className} mt-2 mb-4`,
    children: [
      label &&
        _jsxs('label', {
          className: 'font-semibold',
          children: [label, required && _jsx('span', { className: 'text-red-500 text-sm', children: '*' })],
        }),
      _jsx(Editor, {
        value: text,
        onTextChange: (e) => handleChange(e.htmlValue || ''),
        onLoad: () => {
          remove.forEach((className) => {
            const elements = document.querySelectorAll(`.ql-${className}`);
            elements.forEach((element) => element.remove());
          });
        },
        placeholder: placeholder,
        style: {
          height: height,
        },
        headerTemplate: customToolbar,
        ...props,
        className: className,
      }),
      error && _jsxs('span', { className: 'text-red-500 text-xs', children: [error, '*'] }),
    ],
  });
};
