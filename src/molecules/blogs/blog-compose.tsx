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
import UnderlineHeading from '@/atoms/heading/underline-heading';
import CustomInput from '@/atoms/input-elements/custom-input';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';

interface BlogComposeProps {
  className: string;
}

// maximum number of images in the blog content
const MAX_IMAGES = 3;
// Split the rich text into text and tags
let splitContent: string[];

const wordCount = [
  { label: '500–800 words', value: '500–800 words' },
  { label: '1,000–1,500 words', value: '1,000–1,500 words' },
  { label: '1,500+ words', value: '1,500+ words' },
];

type BlogFormData = {
  author: string;
  email: string;
  website: string;
  bio: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  otherSocialMedia: string;
  country: string;
  authorPhoto: File;
  title: string;
  blogType: string;
  wordCount: string;
  coverPhoto: File;
  description: string;
  content: string;
  confirmDetails: boolean;
  agreeToFeature: boolean;
  rightsToContent: boolean;
};

const categories = [
  { title: 'Business Article', value: 'Business' },
  { title: 'Travel & Leisure Article', value: 'Travel & Leisure' },
  {
    title: 'Environment & Sustainability Article',
    value: 'Environment & Sustainability',
  },
];

const BlogCompose: React.FC<BlogComposeProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>();

  const [loader, setLoader] = useState<boolean>(false);

  const onFileSelect = (file: File, type: 'author' | 'cover') => {
    if (type === 'author') {
      setValue('authorPhoto', file);
    } else if (type === 'cover') {
      setValue('coverPhoto', file);
    }
  };

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
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

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <UnderlineHeading borderWidth="w-1/4" className="text-2xl">
        Blog Submission Form
      </UnderlineHeading>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[80vh]">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  About You
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <CustomInput
                  {...register('author', { required: 'Please Provide Your Full Name*' })}
                  placeholder="Enter Author Name"
                  error={errors.author}
                />
                <CustomInput
                  {...register('email', { required: 'Please Provide Valid Email' })}
                  placeholder="Enter Author Role"
                  error={errors.email}
                />
                <CustomInput
                  {...register('website')}
                  placeholder="Enter Webiste/Portfolio"
                  error={errors.website}
                  type="url"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Author Bio
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <textarea
                  {...register('bio', { required: 'Please Provide Author Bio' })}
                  rows={4}
                  placeholder="Tell us a little about yourself, your experiences, and what inspires your writing."
                  className={`p-2 text-sm block flex-grow bg-transparent w-1/2 border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-400 ${errors.bio ? 'border-red-500 ' : 'border-gray-400 '}`}
                ></textarea>
                {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Social media Links (Add atleast one)
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <CustomInput
                  {...register('instagram')}
                  placeholder="Instagram Profile"
                  error={errors.instagram}
                  required={false}
                  type="url"
                />
                <CustomInput
                  {...register('twitter')}
                  placeholder="Twitter Profile"
                  error={errors.twitter}
                  required={false}
                  type="url"
                />
                <CustomInput
                  {...register('linkedin')}
                  placeholder="Linkedin Profile"
                  error={errors.linkedin}
                  required={false}
                  type="url"
                />
                <CustomInput
                  {...register('otherSocialMedia')}
                  placeholder="Other Social Media link"
                  error={errors.otherSocialMedia}
                  required={false}
                  type="url"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Upload Your Author Photo
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <ImageDragAndDrop
                  {...register('authorPhoto', { required: 'Please Provide Author Photo' })}
                  onFileSelect={(file) => onFileSelect(file, 'author')}
                  placeholder="Upload your Blog Poster/Banner"
                />
                {errors.authorPhoto && <span className="text-red-500 text-xs">{errors.authorPhoto.message}</span>}
              </div>

              <h3 className="font-semibold text-xl">
                Your Article Submission
                <span className="text-red-500 text-sm">*</span>
              </h3>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Proposed Title of Your Blog Post<span className="text-red-500 text-sm">*</span>
                  <span className="font-normal text-sm">
                    (Make sure your title is engaging and accurately represents the essence of your story)
                  </span>
                </h3>
                <CustomInput
                  {...register('title', { required: 'Blog Title is required' })}
                  placeholder="Blog Title"
                  error={errors.title}
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('country', { required: 'Country of the blog is required' })}
                  placeholder="Select Country"
                  options={Countries}
                  label="Country"
                  error={errors.country}
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('blogType', { required: 'Blog Type is required' })}
                  placeholder="Select Article Type"
                  options={Countries}
                  label="Article Type"
                  error={errors.blogType}
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('wordCount', { required: 'Word Count is required' })}
                  placeholder="Select Word Count range"
                  options={wordCount}
                  label="Word Count (approxiamte):"
                  error={errors.wordCount}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Short Summary of Your Article (2–3 sentences):
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <textarea
                  {...register('description', { required: 'Please Provide Short summary of the blog' })}
                  rows={5}
                  placeholder="Provide a brief overview of your article’s content and key message."
                  className={`p-2 text-sm block flex-grow bg-transparent w-1/2 border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-400 ${errors.bio ? 'border-red-500 ' : 'border-gray-400 '}`}
                ></textarea>
                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <RichTextEditor
                  label="Blog Content"
                  placeholder="In 500-2500 characters, Provide the Content for the blog along with corresponding Images with captions"
                  {...register('content', {
                    required: 'Blog Content is required',
                    minLength: {
                      value: 500,
                      message: 'Description must be at least 500 characters',
                    },
                    maxLength: {
                      value: 2500,
                      message: 'Description must not exceed 2500 characters',
                    },
                  })}
                  height={200}
                  onContentChange={(content) => setValue('content', content)}
                  error={errors.content?.message}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Upload Blog Poster or Banner
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <ImageDragAndDrop
                  {...register('coverPhoto', { required: 'Please Provide Blog Poster/Banner' })}
                  onFileSelect={(file) => onFileSelect(file, 'cover')}
                  placeholder="Upload your Blog Poster/Banner"
                />
                {errors.coverPhoto && <span className="text-red-500 text-xs">{errors.coverPhoto.message}</span>}
              </div>

              <h3 className="font-semibold text-lg">Agreement & Confirmation</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('confirmDetails', {
                      required: 'You must confirm that all blog details are accurate.',
                    })}
                    className="h-4 w-4 rounded border-gray-400"
                  />
                  I confirm this article is original work and has not been published elsewhere.
                </label>
                {errors.confirmDetails && <span className="text-red-500 text-xs">{errors.confirmDetails.message}</span>}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('agreeToFeature', {
                      required: 'You must agree that your blog may be featured.',
                    })}
                    className="h-4 w-4 rounded border-gray-400"
                  />
                  I agree to minor edits for grammar, clarity, and formatting.
                </label>
                {errors.agreeToFeature && <span className="text-red-500 text-xs">{errors.agreeToFeature.message}</span>}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('rightsToContent', {
                      required: 'You must confirm you have the rights to share all content.',
                    })}
                    className="h-4 w-4 rounded border-gray-400"
                  />
                  I retain the copyright to my work but grant permission to publish it on this blog.
                </label>
                {errors.rightsToContent && (
                  <span className="text-red-500 text-xs">{errors.rightsToContent.message}</span>
                )}
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
