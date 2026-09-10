import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = { title: "QuickCompare — Compare before you buy", description: "Compare available quick-commerce prices around you." }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
