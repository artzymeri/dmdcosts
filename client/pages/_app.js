import "@/styling/global.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/dmd_logo.png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;