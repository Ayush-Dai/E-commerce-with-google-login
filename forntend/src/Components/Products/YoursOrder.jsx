"use client"

import { useState, useEffect } from "react"
import { getOrderByUserId } from "../../APIs/GoogleApi"
import { Package, ShoppingBag, Calendar, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

function YoursOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"))
      try {
        const response = await getOrderByUserId(user._id)
        console.log("API Response:", response.data)

        if (response.data.success && Array.isArray(response.data.findById)) {
          setOrders(response.data.findById)
        } else {
          setOrders([])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getOrderStatus = (order) => {
    const daysSinceOrder = Math.floor((new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24))

    if (daysSinceOrder < 1) return { label: "Processing", color: "bg-blue-100 text-blue-800" }
    if (daysSinceOrder < 3) return { label: "Shipped", color: "bg-purple-100 text-purple-800" }
    if (daysSinceOrder < 5) return { label: "Out for Delivery", color: "bg-amber-100 text-amber-800" }
    return { label: "Delivered", color: "bg-green-100 text-green-800" }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
        <p className="text-lg text-gray-600">Loading your orders...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <ShoppingBag className="h-7 w-7 mr-3 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Your Orders</h2>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const status = getOrderStatus(order)
            const isExpanded = expandedOrders[order._id]

            return (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white transition-all hover:shadow-md"
              >
                <div className="p-5 cursor-pointer" onClick={() => toggleOrderExpand(order._id)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${status.color} mr-2`}>
                          {status.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          Order #{order._id.substring(order._id.length - 8)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          <span className="text-sm">{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-1.5" />
                          <span className="text-sm">
                            {order.products.length} {order.products.length === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 md:mt-0">
                      <div className="mr-4">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-lg font-bold text-gray-800">Rs {order.totalAmount.toLocaleString()}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50 p-5">
                    <h4 className="font-medium text-gray-700 mb-3">Order Items</h4>
                    <div className="space-y-4">
                      {order.products.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center bg-white p-3 rounded-md border border-gray-100"
                        >
                          <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                            <img
                              src={item.product.imageUrl || "/placeholder.svg"}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h5 className="font-medium text-gray-800">{item.product.name}</h5>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-800">
                              Rs {(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default YoursOrder
