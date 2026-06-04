import { redirect } from "next/navigation";

type ResourceRedirectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ResourceRedirectPage({
  params,
}: ResourceRedirectPageProps) {
  const { slug } = await params;

  redirect(`/${slug}`);
}
