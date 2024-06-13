import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string | undefined;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className=" pt-3 pb-8 px-4 sm:px-6 ">{children}</div>
    </div>
  );
}
