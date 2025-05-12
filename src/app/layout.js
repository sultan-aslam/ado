// import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
// import StoreProvider from '@/providers/StoreProvider';
// import MainLayout from '@/components/layout/MainLayout';
// import styles from './page.module.css';
// import betaImage from '../../public/images/io.png';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ClientMainLayout from '@/components/layout/ClientMainLayout';
import { AntdRegistry } from '@ant-design/nextjs-registry';

// Optimize font loading
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Only load necessary weights
  display: 'swap',
  preload: true,
  variable: '--font-poppins'
});

export const metadata = {
  title: 'Goedkope vakantie boeken? All inclusive Turkije | Adotravel',
  description:
    'Boek nu uw vakantie goedkoop bij Adotravel. ✔️ Laagste Prijs Garantie ✔️ Lid Garantiefonds ✔️ Al 15 jaar uw specialist'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <ErrorBoundary>
          {/* <div className={styles.beta} style={{ position: 'absolute' }}>
            <Image alt="beta" src={betaImage} width={65} height={65} />
          </div> */}
          <Script
            id="cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="b7143863-61eb-4efd-92ff-fa941dcc53e1"
            data-blockingmode="auto"
            type="text/javascript"
            strategy="lazyOnload"
          />
          <Script
            async
            id="widget.futy.io"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.Futy = { key: '627cc3ea38312' };
                (function (e, t) {
                  var n = e.createElement(t);
                  n.async = true;
                  var f = window.Promise && window.fetch ? 'modern.js' : 'legacy.js';
                  n.src = 'https://v1.widget.futy.io/js/futy-widget-' + f;
                  var r = e.getElementsByTagName(t)[0];
                  r.parentNode.insertBefore(n, r);
                })(document, 'script');
              `
            }}
          />

          <QueryProvider>
            <AntdRegistry>
              <ClientMainLayout>{children}</ClientMainLayout>
            </AntdRegistry>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
