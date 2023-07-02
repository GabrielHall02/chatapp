import Providers from "./components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Chat App",
	description: "VisorAI challenge",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Providers>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</Providers>
	);
}
