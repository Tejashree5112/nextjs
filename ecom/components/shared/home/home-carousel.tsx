"use client"
import * as React from "react"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../../components/ui/carousel'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer"
import axios from "axios"
import { Product } from "@/types/product" // Import the Product type
import { useCart, CartProvider } from "@/context/CartContext";

function HomeCarousel({
    items,
}:{
    items: {
        image:string
        url: string
        title: string
        buttonCaption: string
    }[]
}){
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        window.location.href = "/admin/products/cart";
    };

    const plugin = React.useRef(
        Autoplay({delay: 3000, stopOnInteraction: true})
    )

    return(
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <Carousel
                    dir="ltr"
                    plugins={[plugin.current]}
                    style={{ width: '100%', margin: '0 auto' }}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {items.map((item, index) => (
                            <CarouselItem key={index}>
                                <Link href={item.url}>
                                    <div style={{ display: 'flex', aspectRatio: '16/6', alignItems: 'center', justifyContent: 'center', padding: '6px', position: 'relative', margin: '0' }}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: 'cover', filter: 'brightness(0.7)' }}
                                            priority
                                        />
                                        <div style={{ position: 'absolute', width: '33%', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
                                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'white' }}>
                                                {item.title}
                                            </h2>
                                            <Button style={{ display: 'none', backgroundColor: '#007bff', color: 'white' }}>
                                                {item.buttonCaption}
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious style={{ left: '0', marginLeft: '12px' }}/>
                    <CarouselNext style={{ right: '0', marginRight: '12px' }}/>
                </Carousel>
                <div style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Products</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                        {products.map((product) => (
                            <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                {product.images[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={200}
                                        height={150}
                                        style={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                                    />
                                ) : (
                                    <div style={{ width: 200, height: 150, backgroundColor: '#f0f0f0', borderRadius: '8px 8px 0 0' }} />
                                )}
                                <div style={{ padding: '16px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '8px' }}>{product.name}</h3>
                                    <p style={{ color: '#555', fontSize: '14px' }}>{product.description}</p>
                                    <p style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>${product.price}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                        <Button onClick={() => handleAddToCart(product)} style={{ backgroundColor: '#28a745', color: 'white', fontSize: '14px' }}>Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default function HomeCarouselWithProvider(props: { items: { image: string; url: string; title: string; buttonCaption: string; }[] }) {
    return (
        <CartProvider>
            <HomeCarousel {...props} />
        </CartProvider>
    );
}