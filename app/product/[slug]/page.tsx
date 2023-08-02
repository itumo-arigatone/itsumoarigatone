import Footer from "@/app/components/Footer";

export default function Page({ params }: { params: { slug: string } }) {
  // fetch
  const image = "https://images.coach.com/is/image/Coach/ck019_b4nq4_a0";
  const title = "aaadfdasfdsafd";
  const price = "1000";
  const description = "やかましい。ばか。アホ。マジでむかつく。あいうえおあいうえおこんにちは時間がない。足りない。あいああああああ。むかつく。";
  return (
    <>
      <main className="bg-base">
        <div className="flex h-screen flex-col justify-between">
          <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mx-auto flex flex-col lg:flex-row">
              <img className="rounded-lg" src={image} alt={title} width={639}/>
              <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
                <h1 className="mt-1 text-4xl font-bold text-sub sm:text-5xl sm:tracking-tight lg:text-5xl">{title}</h1>
                <h1 className="mt-3 text-4xl font-bold text-sub sm:text-3xl sm:tracking-tight lg:text-3xl">￥{price}</h1>
                <div>
                  <div className="mt-10 mb-5 border-t bd-accent text-sub pt-10"></div>
                  <div className="bg-sub p-3">
                    <div className="text-base font-bold">description</div>
                    <p className="max-w-xl text-base">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}