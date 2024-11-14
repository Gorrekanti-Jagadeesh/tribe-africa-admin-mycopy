import React, { useState } from 'react';
import demo from '../../assets/branding-bg-dark.png';
import Button from '../custom-button/button';
import { getFormData } from '../../utils/common';
import { addQuestion, getDataByEntryType } from '../../api';
import { Loading } from '../common/loading';
import { QNAProps } from '../../types';

interface CardProps {
  _id: string;
  title: string;
  content: string;
  level: string;
  author: string;
  date: string;
  repliesCount: string;
}

const QNACard: React.FC<CardProps> = ({ _id, title, content, level, author, date, repliesCount }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<QNAProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setIsSending] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [localRepliesCount, setLocalRepliesCount] = useState(repliesCount);

  let replyLevel = level === 'primary' ? 'secondary' : 'tertiary';

  const getReplies = (id: string, level: string) => {
    getDataByEntryType('qna', `level == "${level}" && title == "reply:${id}"`)
      .then((res) => setReplies(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleRepliesToggle = (id: string) => {
    setShowReplies(!showReplies);
    if (isLoading && !showReplies) {
      getReplies(id, replyLevel);
    } else {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    let req = getFormData(e);
    addQuestion({ ...req, level: replyLevel })
      .then(() => {
        setIsLoading(true);
        getReplies(_id, replyLevel);
        setLocalRepliesCount((prevCount) => prevCount + 1);
        setReplyContent('');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSending(false));
  };

  return (
    <div className="border rounded-lg shadow-md bg-white space-y-2">
      {level === 'primary' ? (
        <>
          <div className="flex gap-2 p-2 md:p-4">
            <img src={demo} className="w-16 h-16 rounded-lg" alt="Demo" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <p className="text-gray-600 mt-1 mb-4 truncate">{content}</p>
            </div>
          </div>
          <div
            className={`flex justify-between items-center text-center border-t border-orange-500 p-2 ${showReplies ? 'border-b' : ''}`}
          >
            <span className="text-sm w-1/3 px-2">{`Posted by ${author}`}</span>-
            <span className="text-sm w-1/3 px-2">{date}</span>-
            <span
              className="text-sm w-1/3 px-2 hover:underline cursor-pointer"
              onClick={() => handleRepliesToggle(_id)}
            >{`${localRepliesCount} replies`}</span>
          </div>
        </>
      ) : (
        <>
          <div className="border border-black rounded-lg p-2 md:p-4 shadow-sm flex">
            <div className="mr-2">
              <img src={demo} className="w-10 h-10 rounded-full" alt="Demo" />
            </div>
            <div className="flex-grow">
              <div className="flex gap-2 items-center">
                <h3 className="font-semibold m-0 text-lg">{author}</h3>
                <span className="text-gray-500 text-sm">{date}</span>
              </div>
              <p className="mt-2">{content}</p>
              {level === 'secondary' && (
                <div className="mt-2">
                  <hr />
                  <p
                    className="text-sm text-orange-500 font-semibold cursor-pointer"
                    onClick={() => handleRepliesToggle(_id)}
                  >
                    {localRepliesCount} replies
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showReplies && (
        <div className="p-2 md:p-4 space-y-2">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="content"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.currentTarget.value)}
                  className="flex-grow border p-2 rounded-lg"
                  placeholder="Enter your reply"
                />
                <input type="text" name="title" defaultValue={`reply:${_id}`} className="hidden" />
                <Button className="px-4" type="submit" disabled={sending}>
                  {sending ? <Loading /> : 'Send'}
                </Button>
              </div>
            </form>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <h3 className="text-lg font-semibold">{replies.length} Replies to this topic</h3>
              <div className="space-y-2">
                {replies.map((item, index) => (
                  <QNACard
                    key={index}
                    _id={item._id}
                    title={item.title}
                    content={item.content}
                    level={item.level}
                    author={item.author}
                    date={item.date}
                    repliesCount={item.replies_count}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QNACard;
