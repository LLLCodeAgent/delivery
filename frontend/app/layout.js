import './globals.css';
import NavBar from '@/components/NavBar';
import ChatWidget from '@/components/ChatWidget';

export const metadata = {
  title: 'Logistics Management Platform',
  description: 'Production-ready logistics platform with AI chatbot',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
