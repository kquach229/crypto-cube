import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from './components/Header';
import QueryProvider from '@/components/QueryProvider'; // Import new QueryProvider component
import Script from 'next/script';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import MobileSideBar from './components/MobileSideBar';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'CryptoCube',
  description: 'Track Trends in Crypto',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Script type='text/jsx' src='echarts.js'></Script>
      </head>
      <body className={`${poppins.className} antialiased min-h-screen`}>
        <QueryProvider>
          <SidebarProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange>
              <div className='p-5 w-full'>
                <MobileSideBar />
                <div className='block sm:hidden'>
                  <SidebarTrigger />
                </div>
                <div className='hidden sm:block'>
                  <Header />
                </div>
                {children}
              </div>
            </ThemeProvider>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
