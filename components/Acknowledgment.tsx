import Link from 'next/link';

const Acknowledgment = () => {
  return (
    <aside className="container mx-auto mt-12 mb-12 flex flex-col items-center justify-center px-8 text-center font-semibold text-base-content">
      <p className="text-lg">
        Powered by{' '}
        <Link href="https://openai.com/api/">
          <span className="hover:underline">GPT-3</span>
        </Link>
      </p>
      <p className="mt-2">
        By using this application, you are agreeing to the OpenAI content use policy.
      </p>
    </aside>
  );
};
export default Acknowledgment;
