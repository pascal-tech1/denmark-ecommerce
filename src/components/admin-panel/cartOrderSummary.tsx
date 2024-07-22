import { useCartStore } from '@/hooks/use-cart';
import React from 'react';
import { useStore } from 'zustand';

interface OrderSummaryProps {
    subtotal: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, total }) => {
    const { cartItems } = useStore(useCartStore, (state) => state);

    const handleCheckout = () => {
        const adminWhatsAppNumber = '+2347035226775'; // Replace with the admin's WhatsApp number
        const cartItemsText = cartItems.map(item => (
            `*${item.title}* \nPrice: ₦${item.price.toFixed(2)} \nQuantity: ${item.quantity}\n`
        )).join('\n');

        const message = encodeURIComponent(
            `from your website denmarkmultibuzltd.com\n\ni have the following orders\n\nOrder Summary:\n\n${cartItemsText}\nSubtotal: ₦${subtotal.toFixed(2)}\nTotal: ₦${total.toFixed(2)}`
        );

        window.location.href = `https://wa.me/${adminWhatsAppNumber}?text=${message}`;
    };

    return (
        <div className="p-6 rounded-lg shadow-lg sticky left-0 top-10">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>&#8358; {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping + Tax</span>
                <a href="#" className="text-blue-400 text-sm">Calculate shipping</a>
            </div>
            <div className="flex justify-between mb-4">
                <span>Coupon Code</span>
                <a href="#" className="text-blue-400 text-sm">Add coupon code</a>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>&#8358; {total.toFixed(2)}</span>
            </div>
            <button
                onClick={handleCheckout}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Checkout
            </button>
        </div>
    );
};

export default OrderSummary;
