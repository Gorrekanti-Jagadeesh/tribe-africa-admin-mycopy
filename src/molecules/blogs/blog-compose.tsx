import { useState } from 'react';
import sanityClient from '../../sanityClient';
import { RichTextEditor } from '../../atoms/input-elements/rich-text-editor';
import Button from '../../atoms/custom-button/button';
import { ImageDragAndDrop } from '../../atoms/input-elements/drag-and-drop';

import { countImagesInRichText, processContent, splitRichText } from '../../utils/sanity';

import { uploadImage } from '../../api';

interface BlogComposeProps {
  className: string;
}

// maximum number of images in the blog content
const MAX_IMAGES = 3;
// Split the rich text into text and tags
let splitContent: string[];

const BlogCompose: React.FC<BlogComposeProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [descriptionContent, setDescriptionContent] = useState('');

  // Handle changes in the rich text editor content
  const handleContentChange = (content: string): void => setEditorContent(content);
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescriptionContent(event.target.value);
  };

  // Handle changes in blog placeholder image in drag-and-drop component
  const handleFileSelect = (file: File | null): void => setSelectedFile(file);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // console.log("hello")

    if (!selectedFile) {
      alert('Please upload an image before submitting.');
      return;
    }

    // Count images in rich text content
    if (countImagesInRichText(editorContent) > MAX_IMAGES) {
      alert(`Can only have up to ${MAX_IMAGES} images`);
      return;
    }

    splitContent = splitRichText(editorContent);

    if (splitContent.length < 15) {
      alert('Please add more content to the blog.');
      return;
    }

    // Ensure proper typing for the form element
    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    // list of final blocks after processing rich text
    const richTextBlocks = await processContent(splitContent);

    let response;
    try {
      const title = formData.get('title') as string;
      response = await uploadImage(selectedFile);
      const blogData = {
        _type: 'blog',
        title,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: response._id },
        },
        content: richTextBlocks,
        description: descriptionContent,
      };
      const res = await sanityClient.create(blogData);
      alert('submitted successfully');
      console.log(`Blog created with ID: ${res._id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="text-2xl">Write a BLOG</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Blog title"
              className="border p-2 rounded-lg outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blog image</label>
            <ImageDragAndDrop onFileSelect={handleFileSelect} placeholder="Upload a Title Photo" />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blog description</label>
            <textarea
              onChange={handleDescriptionChange}
              name="description"
              rows={4}
              placeholder="Enter short Blog description"
              className="border p-2 rounded-lg outline-none"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label>Blog Content</label>
            <RichTextEditor onContentChange={handleContentChange} placeholder="Enter Blog Content" />
          </div>
        </div>
        <Button className="float-right my-4 px-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BlogCompose;
