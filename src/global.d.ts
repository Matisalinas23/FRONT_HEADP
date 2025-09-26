export {}

declare global {
    interface Window {
        MercadoPago?: typeof import('mercadopago')
    }
}