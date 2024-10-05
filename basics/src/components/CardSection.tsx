"use client";
import React from 'react'
import { courses } from '@/data/courses.json'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import Image from 'next/image';

interface Course {
    id: number;
    title: string;
    description: string;
    duration: string;
    instructor: string;
    price: string;
    image: string;
    featured: boolean; // Added the 'featured' property
}
function CardSection() {
    const featuredData = courses.filter((course: Course) => course.featured);
    return (
        <div className='w-full mx-auto mb-40' >
            <div className='md:px-40 mx-auto'>
                <div className='mb-16 text-center'>
                    <h1 className='md:text-6xl'>Featured courses</h1>
                    <h2 className='text-xl'>Lorem ipsum dolor sit.</h2>
                </div>
                <div className='grid grid-cols-4 gap-8'>
                    {
                        featuredData?.map((course: Course) =>
                        ((
                            <div key={course.id} className='cursor-pointer space-y-14 space-x-9 ' >
                                <BackgroundGradient className="rounded-[22px] h-80 max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    {/* <Image
                                    src={`/jordans.webp`}
                                    alt="jordans"
                                    height="400"
                                    width="400"
                                    className="object-contain"
                                /> */}
                                    <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                                        {course.title}
                                    </p>

                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {course.description}
                                    </p>
                                    <button className="rounded-full py-3 pl-4 pr-1  text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                                        <span>Buy now </span>
                                        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                            {course.price}
                                        </span>
                                    </button>
                                </BackgroundGradient>
                            </div>
                        )))
                    }
                </div>
                <div className='w-full flex justify-center mt-20 relative'>
                    {/* Button with 'peer' class */}
                    <button className='relative px-4 py-2 rounded-md bg-white z-40 text-black mx-auto transform hover:-translate-y-2 hover:shadow-sm ease-in-out duration-200 peer'>
                        View More Courses
                    </button>

                    {/* Div that responds to button hover */}
                    <div className='absolute top-0 w-40 h-10 rounded-md peer-hover:bg-zinc-500 ease-in-out duration-200'>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CardSection
