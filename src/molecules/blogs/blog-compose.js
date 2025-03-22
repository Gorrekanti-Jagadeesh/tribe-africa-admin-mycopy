import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import sanityClient from '../../sanityClient';
import { RichTextEditor } from '../../atoms/input-elements/rich-text-editor';
import Button from '../../atoms/custom-button/button';
import { ImageDragAndDrop } from '../../atoms/input-elements/drag-and-drop';
import { countImagesInRichText, processContent, splitRichText } from '../../utils/sanity';
import { uploadImage } from '../../api';
import { useForm } from 'react-hook-form';
import { generateId } from '@/utils/common';
import { Countries } from '@/data';
import { Loading } from '@/atoms/common/loading';
import UnderlineHeading from '@/atoms/heading/underline-heading';
import CustomInput from '@/atoms/input-elements/custom-input';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
// maximum number of images in the blog content
const MAX_IMAGES = 3;
// Split the rich text into text and tags
let splitContent;
const wordCount = [
  { label: '500–800 words', value: '500–800 words' },
  { label: '1,000–1,500 words', value: '1,000–1,500 words' },
  { label: '1,500+ words', value: '1,500+ words' },
];
const categories = [
  { label: 'Business Article', value: 'Business' },
  { label: 'Travel & Leisure Article', value: 'Travel & Leisure' },
  {
    label: 'Environment & Sustainability Article',
    value: 'Environment & Sustainability',
  },
];
const BlogCompose = ({ className }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const onFileSelect = (file, type) => {
    if (type === 'author') {
      setValue('authorPhoto', file);
    } else if (type === 'cover') {
      setValue('coverPhoto', file);
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoader(true);
      if (countImagesInRichText(data.content) > MAX_IMAGES) {
        alert(`Can only have up to ${MAX_IMAGES} images`);
        return;
      }
      splitContent = splitRichText(data.content);
      if (splitContent.length < 15) {
        console.log(splitContent, 'iied');
        alert('Please add more content to the blog.');
        return;
      }
      const content = await processContent(splitContent);
      const headerPhotoUrl = await uploadImage(data.coverPhoto);
      const authorPhotoUrl = await uploadImage(data.authorPhoto);
      // Submit to Sanity
      await sanityClient.create({
        _type: 'blog', // Sanity schema type
        _id: `drafts.${generateId()}`, // Unique ID
        ...data,
        content,
        coverPhoto: {
          _type: 'image',
          asset: { _ref: headerPhotoUrl._id },
        },
        authorPhoto: {
          _type: 'image',
          asset: { _ref: authorPhotoUrl._id },
        },
      });
      alert('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    } finally {
      setLoader(false);
    }
  };
  return _jsxs('div', {
    className: `flex flex-col gap-2 ${className}`,
    children: [
      _jsx(UnderlineHeading, { borderWidth: 'w-1/4', className: 'text-2xl', children: 'Blog Submission Form' }),
      _jsx('form', {
        onSubmit: handleSubmit(onSubmit),
        className: 'min-h-[80vh]',
        children: loader
          ? _jsx(Loading, {})
          : _jsxs(_Fragment, {
              children: [
                _jsxs('div', {
                  className: 'flex flex-col gap-4',
                  children: [
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: ['About You', _jsx('span', { className: 'text-red-500 text-sm', children: '*' })],
                        }),
                        _jsx(CustomInput, {
                          ...register('author', { required: 'Please Provide Your Full Name*' }),
                          placeholder: 'Enter Author Name',
                          error: errors.author,
                        }),
                        _jsx(CustomInput, {
                          ...register('email', { required: 'Please Provide Valid Email' }),
                          placeholder: 'Enter Author Role',
                          error: errors.email,
                        }),
                        _jsx(CustomInput, {
                          ...register('website'),
                          placeholder: 'Enter Webiste/Portfolio',
                          error: errors.website,
                          type: 'url',
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: ['Author Bio', _jsx('span', { className: 'text-red-500 text-sm', children: '*' })],
                        }),
                        _jsx('textarea', {
                          ...register('bio', { required: 'Please Provide Author Bio' }),
                          rows: 4,
                          placeholder:
                            'Tell us a little about yourself, your experiences, and what inspires your writing.',
                          className: `p-2 text-sm block flex-grow bg-transparent w-1/2 border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-400 ${errors.bio ? 'border-red-500 ' : 'border-gray-400 '}`,
                        }),
                        errors.bio && _jsx('span', { className: 'text-red-500 text-xs', children: errors.bio.message }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Social media Links (Add atleast one)',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(CustomInput, {
                          ...register('instagram'),
                          placeholder: 'Instagram Profile',
                          error: errors.instagram,
                          required: false,
                          type: 'url',
                        }),
                        _jsx(CustomInput, {
                          ...register('twitter'),
                          placeholder: 'Twitter Profile',
                          error: errors.twitter,
                          required: false,
                          type: 'url',
                        }),
                        _jsx(CustomInput, {
                          ...register('linkedin'),
                          placeholder: 'Linkedin Profile',
                          error: errors.linkedin,
                          required: false,
                          type: 'url',
                        }),
                        _jsx(CustomInput, {
                          ...register('otherSocialMedia'),
                          placeholder: 'Other Social Media link',
                          error: errors.otherSocialMedia,
                          required: false,
                          type: 'url',
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Upload Your Author Photo',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(ImageDragAndDrop, {
                          ...register('authorPhoto', { required: 'Please Provide Author Photo' }),
                          onFileSelect: (file) => onFileSelect(file, 'author'),
                          placeholder: 'Upload your Blog Poster/Banner',
                        }),
                        errors.authorPhoto &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.authorPhoto.message }),
                      ],
                    }),
                    _jsxs('h3', {
                      className: 'font-semibold text-xl',
                      children: [
                        'Your Article Submission',
                        _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Proposed Title of Your Blog Post',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                            _jsx('span', {
                              className: 'font-normal text-sm',
                              children:
                                '(Make sure your title is engaging and accurately represents the essence of your story)',
                            }),
                          ],
                        }),
                        _jsx(CustomInput, {
                          ...register('title', { required: 'Blog Title is required' }),
                          placeholder: 'Blog Title',
                          error: errors.title,
                        }),
                      ],
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomSelect, {
                        ...register('country', { required: 'Country of the blog is required' }),
                        placeholder: 'Select Country',
                        options: Countries,
                        label: 'Country',
                        error: errors.country,
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomSelect, {
                        ...register('blogType', { required: 'Blog Type is required' }),
                        placeholder: 'Select Article Type',
                        options: categories,
                        label: 'Article Type',
                        error: errors.blogType,
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomSelect, {
                        ...register('wordCount', { required: 'Word Count is required' }),
                        placeholder: 'Select Word Count range',
                        options: wordCount,
                        label: 'Word Count (approxiamte):',
                        error: errors.wordCount,
                      }),
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Short Summary of Your Article (2\u20133 sentences):',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx('textarea', {
                          ...register('description', { required: 'Please Provide Short summary of the blog' }),
                          rows: 5,
                          placeholder: 'Provide a brief overview of your article\u2019s content and key message.',
                          className: `p-2 text-sm block flex-grow bg-transparent w-1/2 border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-400 ${errors.bio ? 'border-red-500 ' : 'border-gray-400 '}`,
                        }),
                        errors.description &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.description.message }),
                      ],
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(RichTextEditor, {
                        label: 'Blog Content',
                        placeholder:
                          'In 500-2500 characters, Provide the Content for the blog along with corresponding Images with captions',
                        ...register('content', {
                          required: 'Blog Content is required',
                          minLength: {
                            value: 500,
                            message: 'Description must be at least 500 characters',
                          },
                          maxLength: {
                            value: 2500,
                            message: 'Description must not exceed 2500 characters',
                          },
                        }),
                        height: 200,
                        onContentChange: (content) => setValue('content', content),
                        error: errors.content?.message,
                        required: true,
                      }),
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Upload Blog Poster or Banner',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(ImageDragAndDrop, {
                          ...register('coverPhoto', { required: 'Please Provide Blog Poster/Banner' }),
                          onFileSelect: (file) => onFileSelect(file, 'cover'),
                          placeholder: 'Upload your Blog Poster/Banner',
                        }),
                        errors.coverPhoto &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.coverPhoto.message }),
                      ],
                    }),
                    _jsx('h3', { className: 'font-semibold text-lg', children: 'Agreement & Confirmation' }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'checkbox',
                              ...register('confirmDetails', {
                                required: 'You must confirm that all blog details are accurate.',
                              }),
                              className: 'h-4 w-4 rounded border-gray-400',
                            }),
                            'I confirm this article is original work and has not been published elsewhere.',
                          ],
                        }),
                        errors.confirmDetails &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.confirmDetails.message }),
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'checkbox',
                              ...register('agreeToFeature', {
                                required: 'You must agree that your blog may be featured.',
                              }),
                              className: 'h-4 w-4 rounded border-gray-400',
                            }),
                            'I agree to minor edits for grammar, clarity, and formatting.',
                          ],
                        }),
                        errors.agreeToFeature &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.agreeToFeature.message }),
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'checkbox',
                              ...register('rightsToContent', {
                                required: 'You must confirm you have the rights to share all content.',
                              }),
                              className: 'h-4 w-4 rounded border-gray-400',
                            }),
                            'I retain the copyright to my work but grant permission to publish it on this blog.',
                          ],
                        }),
                        errors.rightsToContent &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.rightsToContent.message }),
                      ],
                    }),
                  ],
                }),
                _jsx(Button, { className: 'float-right my-4 px-4', type: 'submit', children: 'Submit' }),
              ],
            }),
      }),
    ],
  });
};
export default BlogCompose;
