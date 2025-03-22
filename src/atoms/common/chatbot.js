import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import Button from '@atoms/custom-button/button';
import Modal from '@molecules/modal';
import { useState } from 'react';
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  return _jsxs('div', {
    className: 'flex z-10',
    children: [
      _jsxs(Button, {
        className: 'ms-auto rounded-full border border-white flex gap-2 md:rounded-md',
        onClick: () => setIsOpen(true),
        children: [
          _jsx(FontAwesomeIcon, { icon: faMessage, className: 'relative md:top-1 ' }),
          _jsx('span', { className: 'hidden md:block', children: 'Ask me anything!' }),
        ],
      }),
      _jsx(Modal, { isOpen: isOpen, setIsOpen: setIsOpen, children: 'form' }),
    ],
  });
};
export default Chatbot;
