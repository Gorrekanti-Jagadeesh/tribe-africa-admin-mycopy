import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import demo from '../../assets/branding-bg-dark.png';
import Button from '../custom-button/button';
import { getFormData } from '../../utils/common';
import { qna, getDataByEntryType } from '../../api';
import { Loading } from '../common/loading';
const QNACard = ({ _id, title, content, level, author, date, repliesCount }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setIsSending] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [localRepliesCount, setLocalRepliesCount] = useState(repliesCount);
  let replyLevel = level === 'primary' ? 'secondary' : 'tertiary';
  const getReplies = (id, level) => {
    getDataByEntryType('qna', `level == "${level}" && title == "reply:${id}"`)
      .then((res) => setReplies(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleRepliesToggle = (id) => {
    setShowReplies(!showReplies);
    if (isLoading && !showReplies) {
      getReplies(id, replyLevel);
    } else {
      setIsLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    let req = getFormData(e);
    qna
      .addQuestion({ ...req, level: replyLevel })
      .then(() => {
        setIsLoading(true);
        getReplies(_id, replyLevel);
        setLocalRepliesCount((prevCount) => prevCount + 1);
        setReplyContent('');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSending(false));
  };
  return _jsxs('div', {
    className: 'border rounded-lg shadow-md bg-white space-y-2',
    children: [
      level === 'primary'
        ? _jsxs(_Fragment, {
            children: [
              _jsxs('div', {
                className: 'flex gap-2 p-2 md:p-4',
                children: [
                  _jsx('img', { src: demo, className: 'w-16 h-16 rounded-lg', alt: 'Demo' }),
                  _jsxs('div', {
                    children: [
                      _jsx('h2', { className: 'text-lg font-semibold text-gray-800', children: title }),
                      _jsx('p', { className: 'text-gray-600 mt-1 mb-4 truncate', children: content }),
                    ],
                  }),
                ],
              }),
              _jsxs('div', {
                className: `flex justify-between items-center text-center border-t border-orange-500 p-2 ${showReplies ? 'border-b' : ''}`,
                children: [
                  _jsx('span', { className: 'text-sm w-1/3 px-2', children: `Posted by ${author}` }),
                  '-',
                  _jsx('span', { className: 'text-sm w-1/3 px-2', children: date }),
                  '-',
                  _jsx('span', {
                    className: 'text-sm w-1/3 px-2 hover:underline cursor-pointer',
                    onClick: () => handleRepliesToggle(_id),
                    children: `${localRepliesCount} replies`,
                  }),
                ],
              }),
            ],
          })
        : _jsx(_Fragment, {
            children: _jsxs('div', {
              className: 'border border-black rounded-lg p-2 md:p-4 shadow-sm flex',
              children: [
                _jsx('div', {
                  className: 'mr-2',
                  children: _jsx('img', { src: demo, className: 'w-10 h-10 rounded-full', alt: 'Demo' }),
                }),
                _jsxs('div', {
                  className: 'flex-grow',
                  children: [
                    _jsxs('div', {
                      className: 'flex gap-2 items-center',
                      children: [
                        _jsx('h3', { className: 'font-semibold m-0 text-lg', children: author }),
                        _jsx('span', { className: 'text-gray-500 text-sm', children: date }),
                      ],
                    }),
                    _jsx('p', { className: 'mt-2', children: content }),
                    level === 'secondary' &&
                      _jsxs('div', {
                        className: 'mt-2',
                        children: [
                          _jsx('hr', {}),
                          _jsxs('p', {
                            className: 'text-sm text-orange-500 font-semibold cursor-pointer',
                            onClick: () => handleRepliesToggle(_id),
                            children: [localRepliesCount, ' replies'],
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
          }),
      showReplies &&
        _jsxs('div', {
          className: 'p-2 md:p-4 space-y-2',
          children: [
            _jsx('div', {
              children: _jsx('form', {
                onSubmit: handleSubmit,
                children: _jsxs('div', {
                  className: 'flex gap-2',
                  children: [
                    _jsx('input', {
                      type: 'text',
                      name: 'content',
                      value: replyContent,
                      onChange: (e) => setReplyContent(e.currentTarget.value),
                      className: 'flex-grow border p-2 rounded-lg',
                      placeholder: 'Enter your reply',
                    }),
                    _jsx('input', { type: 'text', name: 'title', defaultValue: `reply:${_id}`, className: 'hidden' }),
                    _jsx(Button, {
                      className: 'px-4',
                      type: 'submit',
                      disabled: sending,
                      children: sending ? _jsx(Loading, {}) : 'Send',
                    }),
                  ],
                }),
              }),
            }),
            isLoading
              ? _jsx(Loading, {})
              : _jsxs(_Fragment, {
                  children: [
                    _jsxs('h3', {
                      className: 'text-lg font-semibold',
                      children: [replies.length, ' Replies to this topic'],
                    }),
                    _jsx('div', {
                      className: 'space-y-2',
                      children: replies.map((item, index) =>
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
                    }),
                  ],
                }),
          ],
        }),
    ],
  });
};
export default QNACard;
