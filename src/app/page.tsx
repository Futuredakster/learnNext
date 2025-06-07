import Link from 'next/link';
export default function Home() {
  return (
    <div className="bg-black">
      <main className="flex flex-col justify-center items-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-orange-500 text-black w-4/5 sm:max-w-96 sm:text-2xl">
          <h1 className='text-4xl font-bold'>Dan's Computer<br /> Repair Shop</h1>
          <address>
            555 Gateway Lane <br />
            Kansas City, KS 55555
          </address>
          <p>
            Open Daily 9am to 5pm
          </p>
          <Link href="tel:4203619842" className="hover:underline">
            420-361-9842
          </Link>
          <Link href="/login" className="hover:underline">
           If your are a worker please continue to login
          </Link>
        </div>
      </main>
    </div>
  );
}
