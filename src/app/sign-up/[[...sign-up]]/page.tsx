
import { SignUp } from '@clerk/nextjs';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import PlaceholderContent from '@/components/demo/placeholder-content';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

import Link from 'next/link';

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

                <SignUp
                    path="/sign-up"
                    routing="path"
                    signInUrl="/sign-in"
                />
            </PlaceholderContent>
        </ContentLayout>
    );
}
