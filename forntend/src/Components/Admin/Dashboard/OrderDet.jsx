'use client';

import { useEffect, useState } from 'react';
import { getAllOrder } from '../../../APIs/GoogleApi';

function OrderDet() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrder();
      if (response?.data?.success) {
        setOrders(response.data.orders);
      } else {
        console.error('Failed to fetch orders', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <p className="text-xl font-semibold text-gray-700">No orders found</p>
        <p className="text-gray-500 mt-2">Orders will appear here once they are placed</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">All Orders</h2>
          <p className="text-gray-600 mt-1">Administrative overview of all customer orders</p>
        </header>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-800">OrderId #{order._id}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Placed by{' '}
                      <span className="font-medium text-gray-700">
                        {order.user?.name || 'Unknown'}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-gray-800">
                      Rs. {order.totalAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Order Items
                  </h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      {order.products.map((item, index) => (
                        <div
                          key={`${item.product?._id || index}`}
                          className="flex items-center py-3 px-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                            {index + 1}
                          </div>
                          <div className="ml-4 flex-grow">
                            <p className="font-medium text-gray-800">
                              {item.product?.name || 'Product Unavailable'}
                            </p>
                          </div>
                          <div className="text-gray-700 font-medium">x{item.quantity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDet;
