import Link from 'next/link'
import React from 'react'
import { Button } from './ui/moving-border'
import { Spotlight } from './ui/Spotlight'

function HeroSection() {
  return (
    <div className='h-auto md:h-[48rem] w-full flex flex-col items-center justify-center relative overflow-hidden mx-auto px-4 py-10 md:py-0'>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <h1 className='mt-20 py-1 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400 text-transparent'>Adipisicing elit. Voluptate, illo.</h1>
      <p className='mt-4 text-base text-center font-normal max-w-lg mx-auto md:text-neutral-300'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A voluptas aliquid molestias obcaecati asperiores, tenetur cumque eligendi impedit minima explicabo aut id voluptates quasi iure aliquam.</p>

      <div className='mt-4 w-60'>
        <Button
          borderRadius="1.75rem"
          className="bg-white  dark:bg-black text-black dark:text-white"
        >
          <Link href="/contact" className='w-full'>
            Borders are cool
          </Link>
        </Button>
      </div>
      <div>

      </div>
    </div>
  )
}

export default HeroSection
