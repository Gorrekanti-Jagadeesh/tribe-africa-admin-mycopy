import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseDB';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ApprovalStatus {
  id: string;
  documentId: string;
  documentType: string;
  status: string;
  approvedAt: Date;
  title?: string;
  description?: string;
  country?: string;
  city?: string;
  name?: string;
  type?: string;
  userid?: string;
  accommodation_type?: string;
  read?: boolean;
  blogType?: string;
  author?: string;
  businessCategory?: string;
  businessSubCategory?: string;
  adType?: string;
  page?: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<ApprovalStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [documentTypeFilter, setDocumentTypeFilter] = useState<string>('all');
  const navigate = useNavigate();

  const getAllDocuments = async () => {
    try {
      // Get userId from cookies
      const userCookie = Cookies.get('emailUser') || Cookies.get('googleUser');

      if (!userCookie) {
        console.log('User is not authenticated');
        navigate('/login');
        return;
      }

      // Parse the user data from the cookie
      const userData = JSON.parse(userCookie);

      // Extract the userId - look for uid field in the user data
      const userId = userData.uid;

      if (!userId) {
        console.log('User ID not found in cookie data');
        navigate('/login');
        return;
      }

      // Fetch notifications from single collection
      const notificationsQuery = await getDocs(collection(db, 'notifications'));

      const notificationData: ApprovalStatus[] = [];

      // Process notifications
      notificationsQuery.forEach((doc) => {
        const data = doc.data();
        // Only include notifications that belong to the current user
        if (data.userid === userId) {
          notificationData.push({
            id: doc.id,
            documentId: data.documentId || '',
            documentType: data.documentType || 'general',
            status: data.status?.toLowerCase() || 'pending',
            approvedAt: data.timestamp?.toDate() || new Date(),
            title: data.title || `${data.documentType} notification`,
            description: data.description || data.reason,
            country: data.country,
            city: data.city,
            name: data.name,
            type: data.type,
            userid: data.userid,
            accommodation_type: data.accommodation_type,
            read: data.read || false,
            blogType: data.blogType,
            author: data.author,
            businessCategory: data.businessCategory,
            businessSubCategory: data.businessSubCategory,
            adType: data.adType,
            page: data.page,
          });
        }
      });

      // Sort notifications by date, newest first
      notificationData.sort((a, b) => b.approvedAt.getTime() - a.approvedAt.getTime());

      setNotifications(notificationData);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Update the notification in Firestore
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
      });

      // Update local state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.read);

      // Update all unread notifications in Firestore
      const updatePromises = unreadNotifications.map((notification) =>
        updateDoc(doc(db, 'notifications', notification.id), {
          read: true,
        })
      );

      await Promise.all(updatePromises);

      // Update local state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((notification) => notification.status.toLowerCase() === filter.toLowerCase());

  const filteredByDocumentType =
    documentTypeFilter === 'all'
      ? filteredNotifications
      : filteredNotifications.filter((notification) => notification.documentType === documentTypeFilter);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes

    if (diff < 60) {
      return `${diff}m`;
    } else if (diff < 24 * 60) {
      return `${Math.floor(diff / 60)}h`;
    } else if (diff < 30 * 24 * 60) {
      return `${Math.floor(diff / (60 * 24))}d`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatDocumentType = (type: string) => {
    switch (type) {
      case 'findABusiness':
        return 'Business Listing';
      case 'accomodationList':
        return 'Accommodation';
      case 'blog':
        return 'Blog Post';
      case 'event':
        return 'Event';
      default:
        // Convert camelCase to Title Case with spaces
        return type
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
          .trim();
    }
  };

  return (
    <div className="mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 pb-1 border-b-2 border-brand-orange">Notifications</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>{notifications.filter((n) => !n.read).length} unread</span>
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                  <span>{notifications.filter((n) => n.read).length} read</span>
                </span>
              </div>
              <button
                onClick={markAllAsRead}
                className="px-4 py-1 text-xs font-medium text-white bg-brand-orange hover:bg-[#E05A00] rounded-md shadow-sm transition"
              >
                Mark all as read
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative inline-block text-left">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-sm rounded-lg pl-4 pr-10 py-1.5 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent shadow-sm"
              >
                <option value="all">All notifications</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative inline-block text-left">
              <select
                value={documentTypeFilter}
                onChange={(e) => setDocumentTypeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-sm rounded-lg pl-4 pr-10 py-1.5 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent shadow-sm"
              >
                <option value="all">All types</option>
                <option value="event">Events</option>
                <option value="accomodationList">Accommodations</option>
                <option value="blog">Blogs</option>
                <option value="findABusiness">Businesses</option>
                <option value="advertisement">Advertisements</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-orange border-opacity-50 border-t-brand-orange"></div>
          </div>
        ) : filteredByDocumentType.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="bg-orange-50 rounded-full p-4 mb-2 text-brand-orange shadow-sm">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-500 text-center text-sm">We'll notify you when there's activity</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {filteredByDocumentType.map((notification) => (
              <div
                key={notification.id}
                className={`group relative p-4 transition-all duration-200 rounded-lg border ${
                  !notification.read
                    ? 'bg-white border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200'
                    : 'bg-white border-gray-100 hover:border-gray-200'
                } cursor-pointer`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                {/* Unread indicator dot */}
                {!notification.read && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-blue-500 rounded-r-full"></div>
                )}

                <div className="flex items-start gap-4">
                  {/* Status indicator */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      notification.status === 'approved'
                        ? 'bg-green-50 text-green-600'
                        : notification.status === 'rejected'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {notification.status === 'approved' ? '✓' : notification.status === 'rejected' ? '✕' : '•'}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-gray-900">
                            {formatDocumentType(notification.documentType)}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                              notification.status === 'approved'
                                ? 'bg-green-50 text-green-700'
                                : notification.status === 'rejected'
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                          </span>
                        </div>

                        {notification.description && (
                          <p
                            className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'} line-clamp-2`}
                          >
                            {notification.description}
                          </p>
                        )}

                        {/* Details section based on document type */}
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                          {notification.documentType === 'event' && (
                            <>
                              {notification.title && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Title:</span>
                                  {notification.title}
                                </span>
                              )}
                              {notification.type && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Type:</span>
                                  {notification.type}
                                </span>
                              )}
                              {notification.city && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Location:</span>
                                  {notification.city}
                                  {notification.country ? `, ${notification.country}` : ''}
                                </span>
                              )}
                            </>
                          )}

                          {notification.documentType === 'accomodationList' && (
                            <>
                              {notification.name && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Name:</span>
                                  {notification.name}
                                </span>
                              )}
                              {notification.accommodation_type && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Type:</span>
                                  {notification.accommodation_type}
                                </span>
                              )}
                            </>
                          )}

                          {notification.documentType === 'blog' && (
                            <>
                              {notification.title && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Title:</span>
                                  {notification.title}
                                </span>
                              )}
                              {notification.author && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Author:</span>
                                  {notification.author}
                                </span>
                              )}
                              {notification.blogType && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Type:</span>
                                  {notification.blogType}
                                </span>
                              )}
                              {notification.country && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Country:</span>
                                  {notification.country}
                                </span>
                              )}
                            </>
                          )}

                          {notification.documentType === 'findABusiness' && (
                            <>
                              {notification.title && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Business Name:</span>
                                  {notification.title}
                                </span>
                              )}
                              {notification.businessCategory && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Category:</span>
                                  {notification.businessCategory
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              )}
                              {notification.businessSubCategory && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Subcategory:</span>
                                  {notification.businessSubCategory
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              )}
                            </>
                          )}

                          {notification.documentType === 'advertisement' && (
                            <>
                              {notification.adType && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Ad Type:</span>
                                  {notification.adType}
                                </span>
                              )}
                              {notification.page && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">Page:</span>
                                  {notification.page}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Time and read status */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(notification.approvedAt)}
                        </span>
                        {!notification.read && <span className="text-xs font-medium text-blue-600">New</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer for larger screens */}
      {filteredByDocumentType.length > 5 && (
        <div className="border-t border-gray-200 py-2 px-8 bg-gray-50 mt-1">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600 font-medium">
              Showing {filteredByDocumentType.length} notification{filteredByDocumentType.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
