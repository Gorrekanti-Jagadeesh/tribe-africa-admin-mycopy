import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import Button from '@atoms/custom-button/button';
import Modal from '@molecules/modal';
import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex z-10">
      <Button className="ms-auto" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faMessage} className="relative top-1 mx-2" /> Ask me anything!
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        form
      </Modal>
    </div>
  );
};

export default Chatbot;
