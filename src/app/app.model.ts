export type Credentials = {
    email: string,
    password: string
}

export interface Product {
    _id?: string,
    name: string,
    price: number,
    quantity: number,
    discount: number
}

export interface CartProduct {
    _id?: string,
    name: string,
    price: number,
    quantity: number,
    maxQuantity?: number,
    discount: number
}



export interface User {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    avatar?: string,
    isAdmin: boolean

}