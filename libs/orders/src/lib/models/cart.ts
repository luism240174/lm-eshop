export class Cart {
    items?: CartItem[];

}

export class CartItem {
    productid?: string;
    quantity?: number;
}

export class CartItemDetailed {
    product?: any;
    quantity?: number;
}