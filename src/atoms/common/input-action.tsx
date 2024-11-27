import React from 'react';

interface InputActionProps {
  handleSubmit: () => void;
  inputType: string;
  inputPlaceholder: string;
  buttonPlaceholder: string;
}

const InputAction: React.FC<InputActionProps> = ({ handleSubmit, inputType, inputPlaceholder, buttonPlaceholder }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex bg-white w-fit rounded-full m-auto md:m-0 text-gray-900">
        <input
          type={inputType}
          className="bg-transparent rounded-full px-4 py-2 outline-none w-2/3"
          placeholder={inputPlaceholder}
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-full ml-2">
          {buttonPlaceholder}
        </button>
      </div>
    </form>
  );
};

export default InputAction;
