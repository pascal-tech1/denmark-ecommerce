import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string | undefined;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className=" pt-3 px-2 md:px-6  bg-background ">{children}</div>
    </div>
  );
}
