import { useState } from 'react';
import sanityClient from '../../sanityClient';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

import { RichTextEditor } from '../../atoms/input-elements/rich-text-editor';

import ImageUploader from '../../atoms/input-elements/drag-and-drop';
import Button from '../../atoms/custom-button/button';
import { UploadBody } from '@sanity/client';

interface BlogComposeProps {
  className: string;
}

const BlogCompose: React.FC<BlogComposeProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  const handleFileSelect = (file: File | null): void => {
    setSelectedFile(file);
  };

  const handleContentChange = (content: string): void => {
    setEditorContent(content);
  };

  // sanity functions
  const schema = Schema.compile({
    name: 'blogContentSchema',
    types: [
      {
        type: 'object',
        name: 'blogContent',
        fields: [
          {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [{ type: 'block' }],
          },
        ],
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please upload an image before submitting.');
      return;
    }

    const formData = new FormData(e.currentTarget);

    async function uploadImage(file: UploadBody) {
      try {
        const imageAsset = await sanityClient.assets.upload('image', file);
        return imageAsset;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    }

    uploadImage(selectedFile)
      .then((res) => {
        return {
          _type: 'blog',
          title: formData.get('title'),
          image: {
            asset: {
              _ref: res._id,
              _type: 'reference',
            },
            _type: 'image',
          },
          content: htmlToBlocks(
            editorContent,
            schema.get('blogContent').fields.find((field: { name: string }) => field.name === 'content').type
          ),
        };
      })
      .then(async (blogData) => {
        console.log(blogData);
        sanityClient.create(blogData).then((res) => console.log(`Blog created at id ${res._id}`));
      });
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
            <ImageUploader onFileSelect={handleFileSelect} />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blog Content</label>
            <RichTextEditor onContentChange={handleContentChange} />
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
