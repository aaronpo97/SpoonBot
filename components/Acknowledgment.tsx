import Link from 'next/link';

const Acknowledgment = () => {
  return (
    <div className="mt-12 mb-12 container mx-auto flex flex-col items-center justify-center text-base-content text-center font-semibold px-8">
      <p className="text-lg">
        Powered by{' '}
        <Link href="https://openai.com/api/">
          <span className="hover:underline">GPT-3</span>
        </Link>
      </p>
      <p className="mt-2">
        By using this application, you are agreeing to the OpenAI content use policy.
      </p>
    </div>
  );
};
export default Acknowledgment;
