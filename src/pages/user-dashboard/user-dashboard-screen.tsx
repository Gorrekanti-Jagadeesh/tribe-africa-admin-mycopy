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
    return <Loading />;
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

  return (
    <div className="p-6 max-w-6xl m-auto">
      <Link to={'/'}>
        <h1>{'< Back'}</h1>
      </Link>
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-gray-700 ${
              activeTab === tab ? 'border-b-2 border-violet-500 text-violet-500' : 'hover:text-violet-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {`Your ${tab}`}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {activeTab === 'Advertisements' && (
          <div>
            {userSubmissionsData.map((ad) => (
              <div key={ad._id} className="p-6 border rounded mb-2 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{ad.item.title}</h2>
                  <h2 className="text-sm px-5 py-1 bg-blue-300 rounded-full font-semibold w-fit">{ad.adType}</h2>
                </div>

                <div>
                  {ad.status === 'Pending' && (
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-400 text-gray-600">Pending</span>
                  )}

                  {ad.status == 'Approved' && (
                    <button className="px-3 py-1 rounded bg-orange-500 text-white" onClick={() => handlePayment(ad)}>
                      Pay
                    </button>
                  )}

                  {ad.status === 'Paid' && (
                    <div className="flex flex-col items-end">
                      <p className="px-5 py-1 rounded-full text-sm bg-green-600 text-white w-fit">Paid</p>
                      <p>
                        (Expires on{' '}
                        {new Date(ad.expiryDate).toLocaleString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          timeZone: 'GMT',
                          timeZoneName: 'short',
                        })}
                        )
                      </p>
                    </div>
                  )}

                  {ad.status === 'Rejected' && (
                    <span className="px-3 py-1 rounded-full text-sm bg-red-400 text-white">Rejected</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={showPaymentPopup} setIsOpen={setShowPaymentPopup}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] text-center">
              <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>

              {/* Ad Details */}
              <div className="mb-4 text-left">
                <p className="text-lg font-medium">
                  📌 <span className="font-semibold">Ad Name:</span> {selectedAd?.item?.title}
                </p>
                <p className="text-lg font-medium">
                  📍 <span className="font-semibold">Ad Type:</span> {selectedAd?.adType}
                </p>
                <p className="text-lg font-medium">
                  📍 <span className="font-semibold">Ad Position:</span> {selectedAd?.position}
                </p>
                <p className="text-lg font-medium">
                  📍 <span className="font-semibold">Ad Page:</span> {selectedAd?.page}
                </p>
                <p className="text-lg font-medium">
                  📍 <span className="font-semibold">Ad Countries:</span> {selectedAd?.countries.join(', ')}
                </p>
                <p className="text-lg font-medium">
                  📅 <span className="font-semibold">Active Days:</span> {selectedAd?.days} days
                </p>
              </div>

              {/* Payment Amount */}
              <p className="text-lg font-medium mb-4">
                💰 <span className="font-semibold">Amount:</span> {selectedAd?.amount}
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={confirmPayment}
                >
                  Pay Now
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowPaymentPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {activeTab === 'Events' && (
          <div>
            {sampleData.Events.map((event) => (
              <div key={event.id} className="p-4 border rounded mb-2">
                <h2 className="text-lg font-semibold">{event.name}</h2>
                <p className="text-gray-600">Date: {event.date}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Business' && (
          <div>
            {sampleData.Business.map((business) => (
              <div key={business.id} className="p-4 border rounded mb-2">
                <h2 className="text-lg font-semibold">{business.name}</h2>
                <p className="text-gray-600">Category: {business.category}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Hotels' && (
          <div>
            {sampleData.Hotels.map((hotel) => (
              <div key={hotel.id} className="p-4 border rounded mb-2">
                <h2 className="text-lg font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">Location: {hotel.location}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Payments' && (
          <div>
            {sampleData.Payments.map((payment) => (
              <div key={payment.id} className="p-4 border rounded mb-2 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">Amount: {payment.amount}</h2>
                  <p className="text-gray-600">Date: {payment.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardScreen;
