
"use server"; 
import Script from "next/script";


export default async function AnalyticsConfig() { 
  if (!process.env.MEASUREMENT_ID) {
    console.warn("MEASUREMENT_ID is not set in environment variables.");
    return null;
  }
    return (
      <>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.MEASUREMENT_ID}`}
          id="gtag-script"
        ></Script>

        <Script id="gtag-config" strategy="lazyOnload">
          {`
                   window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.MEASUREMENT_ID}', {
                      page_path: window.location.pathname,
                    });
                `}
        </Script>
      </>
    );
}