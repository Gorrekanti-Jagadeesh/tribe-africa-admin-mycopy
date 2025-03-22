import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { sanity } from '@/utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Loading } from '@/atoms/common/loading';
import Modal from '@/molecules/modal';
const UserDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('Advertisements');
  const [selectedAd, setSelectedAd] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const tabs = ['Advertisements', 'Events', 'Business', 'Hotels', 'Payments'];
  const email = JSON.parse(Cookies.get('emailUser') || '{}').email;
  const {
    data: userSubmissionsData,
    error: userSubmissionsError,
    isLoading: userSubmissionsLoading,
  } = useQuery({
    queryKey: ['user-submissions-data', email],
    queryFn: () =>
      sanity.GET(`*[_type == "advertisement" && email == "${email}"]{
        _id, 
        adType, 
        status, 
        page, 
        position,
        amount, 
        days,
        countries,
        expiryDate,
        item->{
          _id,
          title  
        }
      }`),
  });
  const sampleData = {
    Advertisements: userSubmissionsData,
    Events: [
      { id: 1, name: 'Event 1', date: '2025-02-10' },
      { id: 2, name: 'Event 2', date: '2025-03-15' },
    ],
    Business: [
      { id: 1, name: 'Business 1', category: 'Retail' },
      { id: 2, name: 'Business 2', category: 'Food' },
    ],
    Hotels: [
      { id: 1, name: 'Hotel 1', location: 'City A' },
      { id: 2, name: 'Hotel 2', location: 'City B' },
    ],
    Payments: [
      { id: 1, amount: '₹1500', status: 'Paid', date: '2025-01-15' },
      { id: 2, amount: '₹2000', status: 'Pending', date: '2025-01-18' },
    ],
  };
  if (userSubmissionsLoading) {
    return _jsx(Loading, {});
  }
  if (userSubmissionsError) {
    return 'Something is wrong';
  }
  const handlePayment = (ad) => {
    setSelectedAd(ad);
    setShowPaymentPopup(true);
  };
  const confirmPayment = async () => {
    try {
      const paymentTime = new Date();
      const expiryDate = new Date(paymentTime); // Clone the date object
      expiryDate.setDate(expiryDate.getDate() + Number(selectedAd.days)); // Ensure it's a number
      // Update Sanity with payment details
      await sanity.PUT(selectedAd._id, {
        status: 'Paid',
        paymentTime: paymentTime.toISOString(),
        expiryDate: expiryDate.toISOString(), // Ensure correct format
      });
      setShowPaymentPopup(false);
      alert('Payment Successful!'); // Optional success message
    } catch (error) {
      console.error('Payment update failed:', error);
      alert('Payment failed. Please try again.');
    }
  };
  return _jsxs('div', {
    className: 'p-6 max-w-6xl m-auto',
    children: [
      _jsx(Link, { to: '/', children: _jsx('h1', { children: '< Back' }) }),
      _jsx('h1', { className: 'text-2xl font-bold', children: 'User Dashboard' }),
      _jsx('div', {
        className: 'flex border-b',
        children: tabs.map((tab) =>
          _jsx(
            'button',
            {
              className: `px-4 py-2 font-medium text-gray-700 ${activeTab === tab ? 'border-b-2 border-violet-500 text-violet-500' : 'hover:text-violet-500'}`,
              onClick: () => setActiveTab(tab),
              children: `Your ${tab}`,
            },
            tab
          )
        ),
      }),
      _jsxs('div', {
        className: 'mt-6',
        children: [
          activeTab === 'Advertisements' &&
            _jsx('div', {
              children: userSubmissionsData.map((ad) =>
                _jsxs(
                  'div',
                  {
                    className: 'p-6 border rounded mb-2 flex justify-between items-center',
                    children: [
                      _jsxs('div', {
                        children: [
                          _jsx('h2', { className: 'text-lg font-semibold', children: ad.item.title }),
                          _jsx('h2', {
                            className: 'text-sm px-5 py-1 bg-blue-300 rounded-full font-semibold w-fit',
                            children: ad.adType,
                          }),
                        ],
                      }),
                      _jsxs('div', {
                        children: [
                          ad.status === 'Pending' &&
                            _jsx('span', {
                              className: 'px-3 py-1 rounded-full text-sm bg-yellow-400 text-gray-600',
                              children: 'Pending',
                            }),
                          ad.status == 'Approved' &&
                            _jsx('button', {
                              className: 'px-3 py-1 rounded bg-orange-500 text-white',
                              onClick: () => handlePayment(ad),
                              children: 'Pay',
                            }),
                          ad.status === 'Paid' &&
                            _jsxs('div', {
                              className: 'flex flex-col items-end',
                              children: [
                                _jsx('p', {
                                  className: 'px-5 py-1 rounded-full text-sm bg-green-600 text-white w-fit',
                                  children: 'Paid',
                                }),
                                _jsxs('p', {
                                  children: [
                                    '(Expires on',
                                    ' ',
                                    new Date(ad.expiryDate).toLocaleString('en-GB', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                      timeZone: 'GMT',
                                      timeZoneName: 'short',
                                    }),
                                    ')',
                                  ],
                                }),
                              ],
                            }),
                          ad.status === 'Rejected' &&
                            _jsx('span', {
                              className: 'px-3 py-1 rounded-full text-sm bg-red-400 text-white',
                              children: 'Rejected',
                            }),
                        ],
                      }),
                    ],
                  },
                  ad._id
                )
              ),
            }),
          _jsx(Modal, {
            isOpen: showPaymentPopup,
            setIsOpen: setShowPaymentPopup,
            children: _jsx('div', {
              className: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50',
              children: _jsxs('div', {
                className: 'bg-white p-6 rounded-lg shadow-lg w-[40%] text-center',
                children: [
                  _jsx('h2', { className: 'text-xl font-semibold mb-4', children: 'Confirm Payment' }),
                  _jsxs('div', {
                    className: 'mb-4 text-left',
                    children: [
                      _jsxs('p', {
                        className: 'text-lg font-medium',
                        children: [
                          '\uD83D\uDCCC ',
                          _jsx('span', { className: 'font-semibold', children: 'Ad Name:' }),
                          ' ',
                          selectedAd?.item?.title,
                        ],
                      }),
                      _jsxs('p', {
                        className: 'text-lg font-medium',
                        children: [
                          '\uD83D\uDCCD ',
                          _jsx('span', { className: 'font-semibold', children: 'Ad Type:' }),
                          ' ',
                          selectedAd?.adType,
                        ],
                      }),
                      _jsxs('p', {
                        className: 'text-lg font-medium',
                        children: [
                          '\uD83D\uDCCD ',
                          _jsx('span', { className: 'font-semibold', children: 'Ad Position:' }),
                          ' ',
                          selectedAd?.position,
                        ],
                      }),
                      _jsxs('p', {
                        className: 'text-lg font-medium',
                        children: [
                          '\uD83D\uDCCD ',
                          _jsx('span', { className: 'font-semibold', children: 'Ad Page:' }),
                          ' ',
                          selectedAd?.page,
                        ],
                      }),
                      _jsxs('p', {
                        className: 'text-lg font-medium',
                        children: [
                          '\uD83D\uDCCD ',
                          _jsx('span', { className: 'font-semibold', children: 'Ad Countries:' }),
                          ' ',
                          selectedAd?.countries.join(', '),
                        ],
                      }),
                      _jsxs('p', {
                        className: 'text-lg font-medium',
                        children: [
                          '\uD83D\uDCC5 ',
                          _jsx('span', { className: 'font-semibold', children: 'Active Days:' }),
                          ' ',
                          selectedAd?.days,
                          ' days',
                        ],
                      }),
                    ],
                  }),
                  _jsxs('p', {
                    className: 'text-lg font-medium mb-4',
                    children: [
                      '\uD83D\uDCB0 ',
                      _jsx('span', { className: 'font-semibold', children: 'Amount:' }),
                      ' ',
                      selectedAd?.amount,
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex justify-center gap-4',
                    children: [
                      _jsx('button', {
                        className: 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600',
                        onClick: confirmPayment,
                        children: 'Pay Now',
                      }),
                      _jsx('button', {
                        className: 'bg-gray-300 px-4 py-2 rounded hover:bg-gray-400',
                        onClick: () => setShowPaymentPopup(false),
                        children: 'Cancel',
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          activeTab === 'Events' &&
            _jsx('div', {
              children: sampleData.Events.map((event) =>
                _jsxs(
                  'div',
                  {
                    className: 'p-4 border rounded mb-2',
                    children: [
                      _jsx('h2', { className: 'text-lg font-semibold', children: event.name }),
                      _jsxs('p', { className: 'text-gray-600', children: ['Date: ', event.date] }),
                    ],
                  },
                  event.id
                )
              ),
            }),
          activeTab === 'Business' &&
            _jsx('div', {
              children: sampleData.Business.map((business) =>
                _jsxs(
                  'div',
                  {
                    className: 'p-4 border rounded mb-2',
                    children: [
                      _jsx('h2', { className: 'text-lg font-semibold', children: business.name }),
                      _jsxs('p', { className: 'text-gray-600', children: ['Category: ', business.category] }),
                    ],
                  },
                  business.id
                )
              ),
            }),
          activeTab === 'Hotels' &&
            _jsx('div', {
              children: sampleData.Hotels.map((hotel) =>
                _jsxs(
                  'div',
                  {
                    className: 'p-4 border rounded mb-2',
                    children: [
                      _jsx('h2', { className: 'text-lg font-semibold', children: hotel.name }),
                      _jsxs('p', { className: 'text-gray-600', children: ['Location: ', hotel.location] }),
                    ],
                  },
                  hotel.id
                )
              ),
            }),
          activeTab === 'Payments' &&
            _jsx('div', {
              children: sampleData.Payments.map((payment) =>
                _jsxs(
                  'div',
                  {
                    className: 'p-4 border rounded mb-2 flex justify-between items-center',
                    children: [
                      _jsxs('div', {
                        children: [
                          _jsxs('h2', { className: 'text-lg font-semibold', children: ['Amount: ', payment.amount] }),
                          _jsxs('p', { className: 'text-gray-600', children: ['Date: ', payment.date] }),
                        ],
                      }),
                      _jsx('span', {
                        className: `px-3 py-1 rounded-full text-sm ${payment.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`,
                        children: payment.status,
                      }),
                    ],
                  },
                  payment.id
                )
              ),
            }),
        ],
      }),
    ],
  });
};
export default UserDashboardScreen;
