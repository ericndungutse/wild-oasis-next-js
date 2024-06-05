'use client';

// Only Catches Rendering Errors. It does not even catch errors from root layout. (Todo so: use global_error.jsx to catch error from any file): Replaces entire layout
export default function Error({ error, reset }) {
  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>
        Something went wrong!
      </h1>
      <p className='text-lg'>👎 {error.message}</p>

      <button
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
