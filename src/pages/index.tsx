import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <Link href="/signup" className="text-blue-500 hover:underline mr-4">Sign Up</Link>
      <Link href="/login" className="text-blue-500 hover:underline">Log In</Link>
    </div>
  );
};

export default Home;