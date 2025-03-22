import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const InputAction = ({ handleSubmit, inputType, inputPlaceholder, buttonPlaceholder }) => {
  return _jsx('form', {
    onSubmit: handleSubmit,
    children: _jsxs('div', {
      className: 'flex bg-white w-fit rounded-full text-gray-900',
      children: [
        _jsx('input', {
          type: inputType,
          className: 'bg-transparent rounded-full px-4 py-2 outline-none w-2/3',
          placeholder: inputPlaceholder,
        }),
        _jsx('button', {
          type: 'submit',
          className: 'bg-orange-500 text-white px-4 py-2 rounded-full ml-2',
          children: buttonPlaceholder,
        }),
      ],
    }),
  });
};
export default InputAction;
