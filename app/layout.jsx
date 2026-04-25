import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata = {
	title: 'আলেশা বাজার - হোমমেড আচার',
	// description: 'শতভাগ হালাল হোমমেড আচার সরাসরি আপনার দোরগোড়ায়',
	// generator: 'v0.app',
	// icons: {
	// 	icon: [
	// 		{
	// 			url: '/icon-light-32x32.png',
	// 			media: '(prefers-color-scheme: light)',
	// 		},
	// 		{
	// 			url: '/icon-dark-32x32.png',
	// 			media: '(prefers-color-scheme: dark)',
	// 		},
	// 		{
	// 			url: '/icon.svg',
	// 			type: 'image/svg+xml',
	// 		},
	// 	],
	// 	apple: '/apple-icon.png',
	// },
};

export default function RootLayout({ children }) {
	return (
		<html lang="bn">
			<body className="font-sans antialiased bg-gradient-to-b from-green-50 to-white">
				{children}
				{process.env.NODE_ENV === 'production' && <Analytics />}
				<Toaster position="top-right" reverseOrder={false} />
			</body>
		</html>
	);
}
