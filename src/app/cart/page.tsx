"use client";

import CartItem from '@/components/admin-panel/cartItem';
import OrderSummary from '@/components/admin-panel/cartOrderSummary';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { useCartStore } from '@/hooks/use-cart';

import { useStore } from 'zustand';

const CartPage = () => {
    const { cartItems } = useStore(useCartStore, (state) => state);



    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal; // Assuming no shipping or tax for now

    return (
        <ContentLayout title='Check Out'>
            <div className="min-h-screen">
                <div className="lg:container mx-auto py-10">
                    <h1 className="text-2xl font-semibold mb-6">Shopping Cart ({cartItems.length} items)</h1>
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-3/5">
                            {cartItems.map((item, index) => (
                                <CartItem key={index} {...item} />
                            ))}
                        </div>
                        <div className="lg:w-1/3 lg:ml-10 mt-6 lg:mt-0 ">
                            <OrderSummary subtotal={subtotal} total={total} />
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
};

export default CartPage;
