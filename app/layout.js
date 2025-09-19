import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Grassroots Digital Organizing Toolkit',
  description: 'Tools for effective digital organizing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <Navigation />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}