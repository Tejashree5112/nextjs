import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import withAuth from "@/hoc/withAuth";

interface Product {
    _id: string;
    name: string;
    slug: string;
    category: string;
    images: string[];
    brand: string;
    description: string;
    price: number;
    listPrice: number;
    countInStock: number;
    tags: string[];
    colors: string[];
    sizes: string[];
    avgRating: number;
    numReviews: number;
    ratingDistribution: number[];
    numSales: number;
    isPublished: boolean;
    reviews: string[];
}

const AdminProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = () => {
            const token = localStorage.getItem("token");
            axios.get("/api/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Products</h1>
                <Link href="/admin/products/create" legacyBehavior>
                    <a style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                        Create New Product
                    </a>
                </Link>
            </div>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                {products.map((product) => (
                    <li key={product._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            {product.images[0] && (
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                />
                            )}
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{product.name}</h2>
                                <p style={{ fontSize: '14px', color: '#666' }}>{product.category}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link href={`/admin/products/${product._id}/edit`} legacyBehavior>
                                <a style={{ backgroundColor: '#ffc107', color: 'white', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Edit
                                </a>
                            </Link>
                            <button
                                onClick={() => handleDelete(product._id)}
                                style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(AdminProductsPage);