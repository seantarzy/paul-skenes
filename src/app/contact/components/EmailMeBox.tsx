export default function EmailMeBox() {
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md md:w-96 cursor-pointer">
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
        className="text-2xl font-serif text-yellow-300"
      >
        Email Me @ {process.env.NEXT_PUBLIC_EMAIL}
      </a>
    </div>
  );
}
