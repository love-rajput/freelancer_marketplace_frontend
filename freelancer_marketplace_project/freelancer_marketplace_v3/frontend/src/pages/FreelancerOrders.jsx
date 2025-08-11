import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import SubmitDelivery from "../components/SubmitDelivery";
import ReviewModal from "../components/ReviewModal";

const OrderModal = ({
  order,
  open,
  onClose,
  onAccept,
  onOpenDelivery,
  onReview,
}) => {
  if (!open || !order) return null;

  const statusColors = {
    processing: "bg-yellow-400",
    "in-progress": "bg-blue-400",
    submitted: "bg-purple-400",
    delivered: "bg-green-400",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={order.gigId?.thumbnail || "https://via.placeholder.com/150"}
            alt={order.gigId?.title}
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <div>
            <h2 className="text-2xl font-bold">{order.gigId?.title}</h2>
            <p className="text-gray-500">
              Client: {order.userId?.username || "Unknown"}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold text-white text-lg animate-pulse ${
              statusColors[order.status] || "bg-gray-400"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Amount Paid:</strong> ₹{order.price}
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Order ID:</strong> {order._id}
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Placed On:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </div>

        <div className="mt-6 gap-5 flex justify-end">
          {order.status === "processing" && (
            <Button
              className=" bg-green-500 hover:bg-green-600 text-white font-bold"
              onClick={() => onAccept(order._id)}
            >
              Accept Order
            </Button>
          )}
          <Button
            variant="outline"
            onClick={async () => {
              // Save client to DB
              await API.post("/chat/conversations/add-client", {
                userId: order.userId._id,
                username: order.userId.username,
                avatar:
                  order.userId.avatar ||
                  "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg",
              });

              // Open chat widget with this client (calls the exposed function in GlobalChatWidget)
              if (window && window.startGlobalChat) {
                window.startGlobalChat(
                  order.userId._id,
                  order.userId.username,
                  order.userId.avatar ||
                    "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg"
                );
              }
            }}
          >
            Chat with Client
          </Button>
          {order.status === "in-progress" && (
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-bold"
              onClick={() => onOpenDelivery(order._id)}
            >
              Mark as Submitted
            </Button>
          )}
          {order.status === "delivered" && (
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-bold"
              onClick={() => onReview(order._id)}
            >
              See Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const FreelancerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [deliveryOrderId, setDeliveryOrderId] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/freelancer-order");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching freelancer orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      await API.patch(`/orders/${orderId}/progress`);
      await fetchOrders();
      setModalOpen(false);
    } catch (err) {
      console.error("Error accepting order:", err);
    }
  };

  const handleSubmit = async (orderId, deliveryFileUrl, deliveryMessage) => {
    try {
      await API.patch(`/orders/${orderId}/complete`, {
        deliveryFileUrl,
        deliveryMessage,
      });
      await fetchOrders();
      setDeliveryModalOpen(false);
      setModalOpen(false);
    } catch (err) {
      console.error("Error submitting order:", err);
    }
  };

  const handleOpenDelivery = (orderId) => {
    setDeliveryOrderId(orderId);
    setDeliveryModalOpen(true);
  };

  const handleReview = (orderId) => {
    setReviewOrderId(orderId);
    setReviewModalOpen(true);
  };

  if (loading) {
    return <p className="text-center">Loading your orders...</p>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 shadow rounded-lg cursor-pointer hover:shadow-lg transition"
                onClick={() => {
                  setSelectedOrder(order);
                  setModalOpen(true);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      order.gigId?.thumbnail ||
                      "https://via.placeholder.com/150"
                    }
                    alt={order.gigId?.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {order.gigId?.title}
                    </h2>
                    <p className="text-gray-500">
                      Client: {order.userId?.username}
                    </p>
                    <p className="text-gray-500">Amount Paid: ₹{order.price}</p>
                    <p className="text-gray-500">
                      Status:{" "}
                      <span className="font-bold">
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <OrderModal
        order={selectedOrder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={handleAccept}
        onOpenDelivery={handleOpenDelivery}
        onReview={handleReview}
      />
      <SubmitDelivery
        open={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        onSubmit={handleSubmit}
        orderId={deliveryOrderId}
      />
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        orderId={reviewOrderId}
      />
    </div>
  );
};

export default FreelancerOrders;
