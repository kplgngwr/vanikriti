import Navbar from "@/components/Navbar";
import AuthFooter from "@/components/AuthFooter";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <AuthFooter />
    </div>
  );
}
