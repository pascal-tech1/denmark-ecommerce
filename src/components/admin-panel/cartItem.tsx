import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useStore } from 'zustand';
import { useCartStore } from '@/hooks/use-cart';

interface CartItemProps {
    imageUrl: string;
    title: string;
    price: number;
    blurImage: string;
    _id: string;
    quantity: number
}

const CartItem: React.FC<CartItemProps> = ({ imageUrl, title, price, blurImage, _id, quantity }) => {

    const { updateQuantity, removeFromCart } = useStore(useCartStore, (state) => state);



    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(999, Number(e.target.value)));
        updateQuantity(_id, value)
    };

    return (
        <div className="flex min-[360px]:flex-row flex-col items-center justify-between p-4">
            <Link href={`/productdetail/${_id}`}>
                <Image src={imageUrl} alt={title} width={60} height={60} blurDataURL={blurImage} className="w-20 h-20 rounded-lg" />
            </Link>
            <div className="flex-1 flex flex-col gap-4 justify-between ml-4">

                <Link href={`/productdetail/${_id}`}>{title}</Link>

                <div className="">
                    <p className=" font-semibold">&#8358; {price.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex items-center ml-4">

                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 text-center bg-gray-800 text-white border border-gray-700 rounded"
                />

            </div>
            <button onClick={() => removeFromCart(_id)} className="ml-4 text-red-500"><Trash2 /></button>
        </div>
    );
};

export default CartItem;
