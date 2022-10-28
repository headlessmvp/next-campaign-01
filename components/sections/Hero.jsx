import React, { useContext } from 'react'

// Next
import Link from 'next/link'

// Context
import { ProductContext } from '../../context/ProductContext'

export const Hero = () => {

    const { allData } = useContext(ProductContext)

    return (
        <div >
            <div className=" inset-0 overflow-hidden">
                {allData && allData?.image && <img
                    src={allData?.image?.url}
                    alt={"okay"}
                    className=" h-full w-full object-cover object-center"
                />}

            </div>
            <div className="pt-8 pb-80 sm:pt-24 sm:pb-40 lg:pt-10 lg:pb-48"><div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8" >
                <div className="sm:max-w-lg">
                    {allData && allData?.headline && <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        {allData?.headline}
                    </h1>}
                    {allData && allData?.subHeading && <p className="mt-4 text-xl text-gray-500">
                        {allData?.subHeading}
                    </p>}

                </div>
                <div>
                    <div className="mt-10">
                        <Link
                            href="#_"

                        >
                            <span className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700 cursor-pointer">                                    SHOP LOOK
                            </span>
                        </Link>
                    </div>
                </div>
            </div></div>



        </div>)
}
