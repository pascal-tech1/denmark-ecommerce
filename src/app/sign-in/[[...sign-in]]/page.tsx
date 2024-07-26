import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent from "@/components/demo/placeholder-content";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";

export default function Page() {
  return (
    <ContentLayout title="Sign Up">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Register</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          forceRedirectUrl={"/"}
        />
      </PlaceholderContent>
    </ContentLayout>
  );
}
