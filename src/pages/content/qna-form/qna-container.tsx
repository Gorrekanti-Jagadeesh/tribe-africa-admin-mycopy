import { QNAScreen } from './qna-screen';

export const QNA = () => {
  return <QNAScreen />;
};

// TODO:
/**
 * 1. Getting user details(user.image and user.name) to show in comment. Currently showing emailID
 * 2. Formatting the date to DD-MM-YYYY
 * 3. Description max characters to show, implement a '...see more' to view complete description
 * 4. Showing questions in the order 'Newest first'
 * 5. Adding pagination/fetch on scroll, for limiting the number of questions.
 */
