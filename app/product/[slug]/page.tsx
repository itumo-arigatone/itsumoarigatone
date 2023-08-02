export default function Page({ params }: { params: { slug: string } }) {
  return <h1 className="text-sub">My Page {params.slug}</h1>
}