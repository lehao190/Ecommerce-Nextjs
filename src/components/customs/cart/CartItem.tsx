'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  cartItemQuantChange,
  removeCartItem
} from '@/lib/redux/features/cart/cartSlice';
import { useRef } from 'react';
import { TCartItem } from '@/types/cart.types';

type Props = {
  item: TCartItem;
};

const CartItem = ({ item }: Props) => {
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center w-full md:w-1/2">
        <Image
          src={item.image}
          alt={item.name}
          width={128}
          height={128}
          className="w-16 h-16 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">${item.price}</p>
        </div>
      </div>

      {/* Appears on medium > */}
      <div className="hidden md:flex items-center mt-4 md:mt-0">
        <div className="border border-gray-600 rounded-lg">
          <button
            onClick={() => {
              if (quantityInputRef.current?.value)
                dispatch(
                  cartItemQuantChange({
                    id: item.id,
                    quantity:
                      +quantityInputRef.current.value > 0
                        ? +quantityInputRef.current.value - 1
                        : 0
                  })
                );
            }}
            className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
          >
            -
          </button>
          <input
            type="number"
            ref={quantityInputRef}
            value={item.quantity}
            onChange={(e) =>
              dispatch(
                cartItemQuantChange({
                  id: item.id,
                  quantity: +e.target.value < 0 ? 0 : +e.target.value
                })
              )
            }
            className="w-12 text-center"
          />
          <button
            onClick={() => {
              if (quantityInputRef.current?.value)
                dispatch(
                  cartItemQuantChange({
                    id: item.id,
                    quantity: +quantityInputRef.current.value + 1
                  })
                );
            }}
            className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Appears on medium > */}
      <div className="hidden md:flex items-center mt-4 md:mt-0 font-semibold">
        ${item.price}
      </div>

      {/* Appears on medium > */}
      <button
        onClick={() => dispatch(removeCartItem(item.id))}
        className="hidden md:flex items-center mt-4 md:mt-0 text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>

      {/* Hidden on medium screen > */}
      <div className="md:hidden flex justify-between">
        <div className="flex items-center mt-4 md:mt-0">
          <div className="border border-gray-600 rounded-lg">
            <button
              onClick={() => {
                if (quantityInputRef.current?.value)
                  dispatch(
                    cartItemQuantChange({
                      id: item.id,
                      quantity:
                        +quantityInputRef.current.value > 0
                          ? +quantityInputRef.current.value - 1
                          : 0
                    })
                  );
              }}
              className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
            >
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  cartItemQuantChange({
                    id: item.id,
                    quantity: +e.target.value < 0 ? 0 : +e.target.value
                  })
                )
              }
              className="w-12 text-center"
            />
            <button
              onClick={() => {
                if (quantityInputRef.current?.value)
                  dispatch(
                    cartItemQuantChange({
                      id: item.id,
                      quantity: +quantityInputRef.current.value + 1
                    })
                  );
              }}
              className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4 md:mt-0 font-semibold">
          ${item.price}
        </div>

        <button
          onClick={() => dispatch(removeCartItem(item.id))}
          className="flex items-center mt-4 md:mt-0 text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
