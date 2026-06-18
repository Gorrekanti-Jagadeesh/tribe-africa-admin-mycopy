import { useEffect, useState } from 'react';
import Button from '@atoms/custom-button/button';
import QNACard from '@atoms/card/qna-card';
import Modal from '@molecules/modal';
import { Auth } from '@molecules/auth';
import { Loading } from '@atoms/common/loading';

import { isLoggedIn, getFormData } from '@utils/common';

import { qna, getDataByEntryType } from '@api/index';

import { QNAProps } from '../../../src/types/index';

export const QNAScreen = () => {
  const [data, setData] = useState<QNAProps[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
  return (
    <div className="max-w-6xl m-auto p-2 md:p-4 space-y-4">
      <div className="flex">
        <h1 className="text-3xl font-bold">Q & A Form</h1>
        <div className="inline-block ms-auto"></div>
        {loggedIn ? (
          <Button className="px-4" onClick={() => setIsOpen(true)}>
            Ask your question
          </Button>
        ) : (
          <Auth />
        )}
      </div>
      {/* <Loading/> */}
      <div className="flex flex-col gap-4">
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} customClasses="bg-white p-4 rounded-lg w-full">
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label>Question</label>
                <input
                  name="title"
                  type="text"
                  className="border rounded-l p-2 outline-none"
                  placeholder="Is Africa safe?"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Description</label>
                <textarea
                  name="content"
                  className="border rounded-l p-2 outline-none"
                  id="description"
                  placeholder="I am planning to visit africa for tour next week, what are the things to keep in mind to ensure my safety?"
                ></textarea>
              </div>
              <Button className="w-fit ms-auto px-4" type="submit" disabled={sending}>
                {sending ? <Loading /> : 'Submit'}
              </Button>
            </form>
          </div>
        </Modal>
        {isLoading ? (
          <Loading />
        ) : (
          data.map((item, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};
