import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";

const EditProductPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        images: [],
        brand: "",
        description: "",
        price: 0,
        listPrice: 0,
        countInStock: 0,
        tags: [],
        colors: [],
        sizes: [],
        avgRating: 0,
        numReviews: 0,
        ratingDistribution: [],
        numSales: 0,
        isPublished: false,
        reviews: [],
    });

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFormData(data);
        };
        if (id) fetchProduct();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await axios.put(`/api/products/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        router.push("/admin/products");
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Product</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Slug</label>
                    <input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="Slug"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Category</label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Brand</label>
                    <input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Price</label>
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>List Price</label>
                    <input
                        name="listPrice"
                        type="number"
                        value={formData.listPrice}
                        onChange={handleChange}
                        placeholder="List Price"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Count In Stock</label>
                    <input
                        name="countInStock"
                        type="number"
                        value={formData.countInStock}
                        onChange={handleChange}
                        placeholder="Count In Stock"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default withAuth(EditProductPage);