import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import Button from '@atoms/custom-button/button';
import QNACard from '@atoms/card/qna-card';
import Modal from '@molecules/modal';
import { Auth } from '@molecules/auth';
import { Loading } from '@atoms/common/loading';
import { isLoggedIn, getFormData } from '@utils/common';
import { qna, getDataByEntryType } from '@api/index';
export const QNAScreen = () => {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setIsSending] = useState(false);
  const handleSubmit = (e) => {
    setIsSending(true);
    let req = getFormData(e);
    qna
      .addQuestion({ ...req, level: 'primary' })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setLoggedIn(isLoggedIn());
    getDataByEntryType('qna', 'level == "primary"')
      .then((res) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return _jsxs('div', {
    className: 'max-w-6xl m-auto p-2 md:p-4 space-y-4',
    children: [
      _jsxs('div', {
        className: 'flex',
        children: [
          _jsx('h1', { className: 'text-3xl font-bold', children: 'Q & A Form' }),
          _jsx('div', { className: 'inline-block ms-auto' }),
          loggedIn
            ? _jsx(Button, { className: 'px-4', onClick: () => setIsOpen(true), children: 'Ask your question' })
            : _jsx(Auth, {}),
        ],
      }),
      _jsxs('div', {
        className: 'flex flex-col gap-4',
        children: [
          _jsx(Modal, {
            isOpen: isOpen,
            setIsOpen: setIsOpen,
            customClasses: 'bg-white p-4 rounded-lg w-full',
            children: _jsx('div', {
              children: _jsxs('form', {
                className: 'flex flex-col gap-4',
                onSubmit: handleSubmit,
                children: [
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx('label', { children: 'Question' }),
                      _jsx('input', {
                        name: 'title',
                        type: 'text',
                        className: 'border rounded-l p-2 outline-none',
                        placeholder: 'Is Africa safe?',
                      }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx('label', { children: 'Description' }),
                      _jsx('textarea', {
                        name: 'content',
                        className: 'border rounded-l p-2 outline-none',
                        id: 'description',
                        placeholder:
                          'I am planning to visit africa for tour next week, what are the things to keep in mind to ensure my safety?',
                      }),
                    ],
                  }),
                  _jsx(Button, {
                    className: 'w-fit ms-auto px-4',
                    type: 'submit',
                    disabled: sending,
                    children: sending ? _jsx(Loading, {}) : 'Submit',
                  }),
                ],
              }),
            }),
          }),
          isLoading
            ? _jsx(Loading, {})
            : data.map((item, index) =>
                _jsx(
                  QNACard,
                  {
                    _id: item._id,
                    title: item.title,
                    content: item.content,
                    level: item.level,
                    author: item.author,
                    date: item.date,
                    repliesCount: item.replies_count,
                  },
                  index
                )
              ),
        ],
      }),
    ],
  });
};
