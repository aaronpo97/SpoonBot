import React from 'react';
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-8/12">
        <h1 className="font-bold text-5xl">About</h1>
        <p className="text-lg mt-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dicta expedita
          delectus aliquid incidunt earum nam dolorem, ipsum sapiente suscipit,
          dignissimos at et! Recusandae facilis inventore, fugit cupiditate in voluptate!
        </p>
      </div>
    </div>
  );
};

export default About;
