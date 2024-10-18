export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isSeller: boolean;
    address: string;
}

export interface Product {
    id: number;
    sellerId: number;
    title: string;
    desc: string;
    store: string;
    price: number;
    stock: number;
    image: string;
    created_at: string;
}

// interface for request body product meanwhile the normal Product is the response
export interface ReqProduct {
    sellerId: number | undefined;
    title: string;
    desc: string;
    store: string | undefined;
    price: number;
    stock: number;
}

export interface Order {
    id: number
    buyerId: number
    sellerId: number
    quantity: number
    transactionId: number
    total: number
    items: OrderProducts[]
}

export interface OrderProducts {
    id: number
    orderId: number
    itemId: number
    quantity: number
    price: number
    subTotal: number
}

export interface Transaction {
    id: number
    buyerId: number
    payment: number
    total: number
}

export interface CartItem {
    id: number
    price: number
    title: string
    quantity: number
    store: string
    image: string
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}