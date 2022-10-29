import React, { useContext } from 'react'

// Next
import Link from 'next/link'

// Context
import { ProductContext } from '../../context/ProductContext'

export const Hero = () => {

    const { allData } = useContext(ProductContext)

    return (
        <div className="pt-8 pb-80 sm:pt-24 sm:pb-40 lg:pt-10 lg:pb-48 mt-28">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8" >
                <div className="sm:max-w-lg">
                    {allData && allData?.headline && <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
                        {allData?.headline}
                    </h1>}
                    {allData && allData?.subHeading && <p className="mt-4 text-xl text-gray-100 font-medium">
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
            </div>
        </div>
    )
}
