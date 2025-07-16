
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <section className="bg-white lg:grid  lg:place-content-center">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-32 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold  sm:text-5xl text-[#875bf9]">
        AI Course Generator
        <strong className="text-black sm:block"> Custom Learning Paths Powered By AI </strong>

      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
        Unlock personalized education with Ai-driven course creation.
        Tailor your learning journey to fit your unique goals and pace.
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
         <Link href="/dashboard">
              <span className="inline-block rounded border border-[#875bf9] bg-[#875bf9] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#875bf9]/80 cursor-pointer">
                Get Started
              </span>
            </Link>
       
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero