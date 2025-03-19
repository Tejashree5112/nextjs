import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/auth/login", formData);
            localStorage.setItem("token", data.token);

            // Decode the token to get user information
            const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
            const isAdmin = decodedToken.isAdmin;

            // Redirect based on admin status
            if (isAdmin) {
                router.push("/admin/products");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Login
                </button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div>
                    <span style={{ marginRight: '8px' }}>Not registered yet?</span>
                    <Link href="/auth/register" legacyBehavior>
                        <a style={{ color: '#007bff', textDecoration: 'underline' }}>Register</a>
                    </Link>
                </div>
                <button
                    onClick={() => router.push('/')}
                    style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default LoginPage;