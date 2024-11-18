import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  title: string;
  image: string;
  description: string;
  date: string;
  time: string;
  location: string;
  country: string;
  website: string;
  phone: string;
  whatsapp: string;
  amount: string;
};

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register('title', { required: 'Title is required' })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Image URL</label>
        <input {...register('image', { required: 'Image URL is required' })} />
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register('description', { required: 'Description is required' })} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Date</label>
        <input type="date" {...register('date', { required: 'Date is required' })} />
        {errors.date && <p>{errors.date.message}</p>}
      </div>

      <div>
        <label>Time</label>
        <input type="time" {...register('time', { required: 'Time is required' })} />
        {errors.time && <p>{errors.time.message}</p>}
      </div>

      <div>
        <label>Location</label>
        <input {...register('location', { required: 'Location is required' })} />
        {errors.location && <p>{errors.location.message}</p>}
      </div>

      <div>
        <label>Country</label>
        <input {...register('country', { required: 'Country is required' })} />
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div>
        <label>Website</label>
        <input
          type="url"
          {...register('website', {
            required: 'Website is required',
            pattern: {
              value: /^(https?:\/\/)?([\w.-]+)+[\w-]+(\/[\w-]*)*\/?$/,
              message: 'Enter a valid URL',
            },
          })}
        />
        {errors.website && <p>{errors.website.message}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\d{10,15}$/,
              message: 'Phone number should be 10-15 digits',
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <label>WhatsApp</label>
        <input
          type="tel"
          {...register('whatsapp', {
            required: 'WhatsApp number is required',
            pattern: {
              value: /^\d{10,15}$/,
              message: 'WhatsApp number should be 10-15 digits',
            },
          })}
        />
        {errors.whatsapp && <p>{errors.whatsapp.message}</p>}
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          {...register('amount', {
            required: 'Amount is required',
            min: {
              value: 0,
              message: 'Amount cannot be negative',
            },
          })}
        />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;
