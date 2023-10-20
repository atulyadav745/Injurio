import React from 'react'
import injury1 from '../assets/injury1.avif'
import injury2 from '../assets/injury2.avif'
import injury3 from '../assets/injury3.webp'
import Image from 'next/image'

const Category = () => {
  return (
    <section className="py-0 md:py-0 bg-white dark:text-gray " id='category'>
	<div className="container p-6 mx-auto space-y-8">
		<div className="space-y-2 text-center">
			<h2 className=" text-4xl sm:text-5xl font-bold text-mauve">Popular Category</h2>
			<p className="font-serif text-sm dark:text-gray-400 rounded-2xl">What Makes Lief Stand Out?</p>
		</div>
		<div className="w-[80%] m-auto grid grid-cols-1  gap-x-12 gap-y-8 lg:grid-cols-3 ">
			{/* First card */}
			<article className="flex flex-col rounded-xl bg-darkwhite3">
				<a rel="noopener noreferrer" href="/" aria-label="Te nulla oportere reprimique his dolorum">
					<Image alt="" className="object-cover w-full h-full dark:bg-gray-500 rounded-2xl" src={injury1} />
				</a>
				<div className="flex flex-col flex-1 p-6">
					<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
					<a rel="noopener noreferrer" href="#" className="text-xl tracking-wider uppercase hover:underline dark:text-mauve font-bold">All Things Intelligently Connected</a>
					<h3 className="flex-1 py-2 text-sm font-semibold leading-snug">Record all your Young Care Records (profile, plans, sessions, logs, reports, documents, and more) and staff management data (task management, rota, leaves, training, and profiles).</h3>
					<div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
						<span className='text-lg font-medium text-mauve'>₹ XXXX</span>
						<a href='/'>
						<button  className="bg-mauve  text-white font-bold py-2 px-4 rounded mr-0 focus:bg-mauve ">Enroll Now</button>
						</a></div>
				</div>
			</article>
			{/* Second card */}
			<article className="flex flex-col bg-darkwhite3 rounded-lg">
				<a rel="noopener noreferrer" href="/" aria-label="Te nulla oportere reprimique his dolorum">
					<Image alt="" className="object-cover w-full h-full rounded-2xl dark:bg-gray-500" src={injury2} />
				</a>
				<div className="flex flex-col flex-1 p-6">
					<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
					<a rel="noopener noreferrer" href="#" className="text-xl tracking-wider uppercase hover:underline dark:text-mauve font-bold">AI Supported One Click Reports</a>
					<h3 className="flex-1 py-2 text-sm font-semibold leading-snug">Generate multiple custom reports like weekly summaries, Reg 45, etc. by simply picking a custom date and adding an impactful summary.</h3>
					<div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
						<span className='text-lg font-medium text-mauve'>₹ XXXX</span>
						<a href='/'>
						<button  className="bg-mauve  text-white font-bold py-2 px-4 rounded mr-0 focus:bg-mauve ">Enroll Now</button>
						</a>
					</div>
				</div>
			</article>
			{/* Third card */}
			<article className="flex flex-col rounded-2xl bg-darkwhite3">
				<a rel="noopener noreferrer" href="/" aria-label="Te nulla oportere reprimique his dolorum">
					<Image alt="" className="object-cover w-full h-full rounded-2xl dark:bg-gray-500" src={injury3} />
				</a>
				<div className="flex flex-col flex-1 p-6">
					<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
					<a rel="noopener noreferrer" href="#" className="text-xl tracking-wider uppercase hover:underline dark:text-mauve font-bold">Standards Dashboard & Best Practices Guide</a>
					<h3 className="flex-1 py-2 text-sm font-semibold leading-snug">SCIFF, Ofsted, and CQC standards-based dashboards are auto-populated with information on selected homes and YPs for your convenience.</h3>
					<div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
						<span className='text-lg font-medium text-mauve'>₹ XXXX</span>
						<a href='/'>
						<button  className="bg-mauve  text-white font-bold py-2 px-4 rounded mr-0 focus:bg-mauve ">Enroll Now</button>
						</a>
					</div>
				</div>
			</article>
			
		</div>
	</div>
</section>
  )
}

export default Category;