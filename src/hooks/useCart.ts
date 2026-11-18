"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@src/types/productManagement";
import type { OrderType } from "@src/types/orderManagement";

export type CartDiscount = {
  discountCode: string;
  discountPercentage: number;
  products: string[];
};

export type CartItem = {
  cartKey: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

type AddToCartOptions = {
  quantity?: number;
  selectedSize?: string;
  selectedColor?: string;
};

type CartState = {
  items: CartItem[];
  appliedDiscount: CartDiscount | null;
  shippingFee: number;
  addToCart: (product: Product, options?: AddToCartOptions) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discount: CartDiscount) => void;
  removeDiscount: () => void;
  setShippingFee: (fee: number) => void;
  hasMerch: () => boolean;
  hasDigital: () => boolean;
  getOrderType: () => OrderType;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
};

const buildCartKey = (
  productId: string,
  selectedSize?: string,
  selectedColor?: string
): string => [productId, selectedSize ?? "", selectedColor ?? ""].join("::");

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedDiscount: null,
      shippingFee: 0,

      addToCart: (product, options = {}) => {
        const isDigital = product.productType === "digital_music";
        const quantity = isDigital ? 1 : Math.max(1, options.quantity ?? 1);
        const selectedSize = isDigital ? undefined : options.selectedSize;
        const selectedColor = isDigital ? undefined : options.selectedColor;
        const cartKey = buildCartKey(product._id, selectedSize, selectedColor);

        set((state) => {
          const existing = state.items.find((i) => i.cartKey === cartKey);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartKey === cartKey
                  ? {
                      ...i,
                      quantity: isDigital ? 1 : i.quantity + quantity,
                    }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                cartKey,
                product,
                quantity,
                selectedSize,
                selectedColor,
              },
            ],
          };
        });
      },

      removeFromCart: (cartKey) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartKey !== cartKey),
        }));
      },

      updateQuantity: (cartKey, quantity) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.cartKey !== cartKey) return i;
            if (i.product.productType === "digital_music") {
              return { ...i, quantity: 1 };
            }
            return { ...i, quantity: Math.max(1, quantity) };
          }),
        }));
      },

      clearCart: () =>
        set({ items: [], appliedDiscount: null, shippingFee: 0 }),

      applyDiscount: (discount) => set({ appliedDiscount: discount }),

      removeDiscount: () => set({ appliedDiscount: null }),

      setShippingFee: (fee) => set({ shippingFee: Math.max(0, fee) }),

      hasMerch: () =>
        get().items.some((item) => item.product.productType === "merch"),

      hasDigital: () =>
        get().items.some(
          (item) => item.product.productType === "digital_music"
        ),

      getOrderType: () => {
        const hasPhysical = get().hasMerch();
        const hasDigitalItem = get().hasDigital();
        if (hasPhysical && hasDigitalItem) return "mixed";
        if (hasDigitalItem) return "digital";
        return "merch";
      },

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),

      getDiscountAmount: () => {
        const state = get();
        if (!state.appliedDiscount) return 0;

        let totalDiscount = 0;
        const appliesToAll = state.appliedDiscount.products.length === 0;

        for (const item of state.items) {
          const isEligible =
            appliesToAll ||
            state.appliedDiscount.products.includes(item.product._id);

          if (isEligible) {
            totalDiscount +=
              item.product.price *
              item.quantity *
              (state.appliedDiscount.discountPercentage / 100);
          }
        }
        return totalDiscount;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().hasMerch() ? get().shippingFee : 0;
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: "wizolingo-cart-storage",
    }
  )
);

