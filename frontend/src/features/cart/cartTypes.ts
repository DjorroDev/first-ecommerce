export interface CartItem {
    id: number
    price: number
    title: string
    quantity: number
    store: string
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}