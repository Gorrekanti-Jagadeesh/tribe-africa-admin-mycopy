import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('Advertisements');

  const tabs = ['Advertisements', 'Events', 'Business', 'Hotels', 'Payments'];

  const sampleData = {
    Advertisements: [
      { id: 1, title: 'Ad 1', status: 'Expired' },
      { id: 2, title: 'Ad 2', status: 'Verification in Progress' },
      { id: 3, title: 'Ad 3', status: 'Live', expiry: '7 days' },
    ],
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

  return (
    <div className="p-6">
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
            {sampleData.Advertisements.map((ad) => (
              <div key={ad.id} className="p-4 border rounded mb-2 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{ad.title}</h2>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    ad.status === 'Live'
                      ? 'bg-green-100 text-green-600'
                      : ad.status === 'Expired'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {ad.status}{' '}
                  {ad.status === 'Live' && (
                    <span>{`
                  (Expires in ${ad.expiry})`}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
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
