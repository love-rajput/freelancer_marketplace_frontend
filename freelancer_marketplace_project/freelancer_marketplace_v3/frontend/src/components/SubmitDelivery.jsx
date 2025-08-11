import React, { useState } from "react";

const SubmitDelivery = ({ open, onClose, onSubmit, orderId }) => {
  const [deliveryFileUrl, setDeliveryFileUrl] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orderId, deliveryFileUrl, deliveryMessage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Submit Delivery</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Project Link / File URL
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={deliveryFileUrl}
              onChange={(e) => setDeliveryFileUrl(e.target.value)}
              placeholder="https://your-link.com/file"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Description / Message
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={deliveryMessage}
              onChange={(e) => setDeliveryMessage(e.target.value)}
              placeholder="Describe your delivery..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Submit Delivery
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitDelivery;
