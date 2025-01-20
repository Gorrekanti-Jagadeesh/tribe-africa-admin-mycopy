import { useState } from 'react';
import sanityClient from '../../sanityClient';
import { RichTextEditor } from '../../atoms/input-elements/rich-text-editor';
import Button from '../../atoms/custom-button/button';
import { ImageDragAndDrop } from '../../atoms/input-elements/drag-and-drop';
import { countImagesInRichText, processContent, splitRichText } from '../../utils/sanity';
import { uploadImage } from '../../api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateId } from '@/utils/common';
import { Countries } from '@/data';
import { Loading } from '@/atoms/common/loading';

interface BlogComposeProps {
  className: string;
}

// maximum number of images in the blog content
const MAX_IMAGES = 3;
// Split the rich text into text and tags
let splitContent: string[];

type FormData = {
  title: string;
  author: string;
  content: string;
  email: string;
  phone: string;
  country: string;
  description: string;
  image: File;
};

const BlogCompose: React.FC<BlogComposeProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  // Handle changes in the rich text editor content
  const handleContentChange = (content: string): void => setEditorContent(content);

  // Handle changes in blog placeholder image in drag-and-drop component
  const handleFileSelect = (file: File | null): void => setSelectedFile(file);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Handle image uploads
      setLoader(true);
      // Count images in rich text content
      if (countImagesInRichText(editorContent) > MAX_IMAGES) {
        alert(`Can only have up to ${MAX_IMAGES} images`);
        return;
      }

      splitContent = splitRichText(editorContent);
      const headerPhotoUrl = await uploadImage(selectedFile);

      if (splitContent.length < 15) {
        alert('Please add more content to the blog.');
        return;
      }
      const content = await processContent(splitContent);

      // Submit to Sanity
      await sanityClient.create({
        _type: 'blog', // Sanity schema type
        _id: `drafts.${generateId()}`, // Unique ID
        ...data,
        content,
        image: {
          _type: 'image',
          asset: { _ref: headerPhotoUrl._id },
        },
      });

      alert('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
      setLoader(false);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="text-2xl">Write a BLOG</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label>Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'Location is required' })}
                  placeholder="Blog title"
                  className="border p-2 rounded-lg outline-none"
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label>Author Name</label>
                <input
                  type="text"
                  {...register('author', { required: 'Author Name is required' })}
                  placeholder="Blog Author Name"
                  className="border p-2 rounded-lg outline-none"
                />
                {errors.author && <span className="text-red-500">{errors.author.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Email ID</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email ID required' })}
                  placeholder="Email ID"
                  className="border p-2 rounded-lg outline-none"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Contact Number</label>
                <input
                  type="text"
                  {...register('phone', { required: 'Phone is required' })}
                  placeholder="Contact Number"
                  className="border p-2 rounded-lg outline-none"
                />
                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label>Blog Image</label>
                <ImageDragAndDrop onFileSelect={handleFileSelect} placeholder="Upload your Blog Header Photo" />
                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Country</label>
                <select
                  {...register('country', { required: 'Event Category is required' })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Country</option>
                  {Countries.map((country) => (
                    <option key={country.label} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                {errors.country && <span className="text-red-500">{errors.country.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Blog description</label>
                <textarea
                  {...register('description', { required: 'Blog Description is required' })}
                  name="description"
                  rows={4}
                  placeholder="Enter short Blog description"
                  className="border p-2 rounded-lg outline-none"
                ></textarea>
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label>Blog Content</label>
                <RichTextEditor onContentChange={handleContentChange} placeholder="Enter Blog Content" />
                {errors.content && <span className="text-red-500">{errors.content.message}</span>}
              </div>
            </div>
            <Button className="float-right my-4 px-4" type="submit">
              Submit
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default BlogCompose;
