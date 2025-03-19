
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const noLayoutPages = ['/auth/login', '/auth/register'];

    const isNoLayoutPage = noLayoutPages.includes(router.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {!isNoLayoutPage && <Header />}
            <main className="flex-1 flex flex-col">
                <Component {...pageProps} />
            </main>
            {!isNoLayoutPage && <Footer />}
        </div>
    );
}


export default MyApp;