import { create } from 'zustand';

export const useCartStore = create((set) => ({
	items: [],
	addItem: (item) =>
		set((state) => {
			const existingItem = state.items.find((i) => i._id === item._id);
			if (existingItem) {
				return {
					items: state.items.map((i) => (i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i)),
				};
			} else {
				return {
					items: [...state.items, { ...item, quantity: 1 }],
				};
			}
		}),
	increment: (id) =>
		set((state) => ({
			items: state.items.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)),
		})),
	decrement: (id) =>
		set((state) => ({
			items: state.items.map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i)),
		})),
	removeItem: (id) =>
		set((state) => ({
			items: state.items.filter((i) => i._id !== id),
		})),

	updateQuantity: (id, quantity) =>
		set((state) => ({
			items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
		})),
	clearCart: () => set({ items: [] }),
	getTotal: () =>
		set((state) => ({
			total: state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
		})),
	getTotalQuantity: () =>
		set((state) => ({
			totalQuantity: state.items.reduce((acc, item) => acc + item.quantity, 0),
		})),
}));
