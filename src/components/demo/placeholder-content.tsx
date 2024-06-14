import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg border-none lg:mt-6 mt-4">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
