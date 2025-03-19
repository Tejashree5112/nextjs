import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/auth/login");
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return AuthComponent;
};

export default withAuth;