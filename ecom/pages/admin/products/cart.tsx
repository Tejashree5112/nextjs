import { useCart, CartProvider } from "@/context/CartContext";
import Image from "next/image";

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                    {cart.map((item) => (
                        <li key={item.product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <Image
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{item.product.name}</h2>
                                    <p style={{ fontSize: '14px', color: '#666' }}>${item.product.price}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.product._id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '20px' }}>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
};

const CartWithProvider = () => (
    <CartProvider>
        <Cart />
    </CartProvider>
);

export default CartWithProvider;