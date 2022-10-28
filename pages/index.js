import { useContext, useEffect, useState } from "react"

// Commercelayer
import CommerceLayer from "@commercelayer/sdk"

// Context
import { ProductContext } from "../context/ProductContext"

// Commerce Layer
import {
  PricesContainer,
  Price,
  ItemContainer,
  AddToCartButton,
} from "@commercelayer/react-components"

// Sanity
import { client } from "../lib/client"

// Components
import { Hero } from "../components/sections/Hero"
import { Favourites } from "../components/sections/Favourites"
import { Layout } from "../components/Layout"
import Link from "next/link"

export default function Home({ data }) {
  const { setAllData, allData, setSubCategories, token } =
    useContext(ProductContext)
  const [cl, setCl] = useState()
  const [skus, setSkus] = useState([])

  // Handlers
  const fetchSKUs = async () => {
    if (token) {
      // Fetch Commercelayer SKUs
      const skus = await cl.skus.list()
      if (skus) {
        setSkus(skus)
      }
      // Fetch Commercelayer SKUs
    }
  }

  useEffect(() => {
    setAllData(data)
  }, [])

  useEffect(() => {
    let subCatTemp = []
    data?.categories?.map((category) => {
      category?.subCategories?.map((sub) => subCatTemp.push(sub))
    })
    setSubCategories(subCatTemp)
  }, [allData])

  useEffect(() => {
    if (token) {
      setCl(
        CommerceLayer({
          organization: "headless",
          accessToken: token,
        })
      )
    }
  }, [token])

  useEffect(() => {
    fetchSKUs()
  }, [cl])

  console.log("INDEX : ", skus)

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero section */}
        <Hero />

        <ItemContainer>
          <section aria-labelledby="favorites-heading">
            <div className="mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-baseline sm:justify-between">
                <h2
                  id="favorites-heading"
                  className="text-2xl font-bold tracking-tight text-gray-900"
                >
                  Purchase Look
                </h2>
                <span className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                  <span aria-hidden="true"> &rarr;</span>
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                {skus &&
                  skus?.map((sku) => (
                    <div key={sku.reference}>
                      <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                        <img
                          src={sku?.image_url}
                          alt={sku?.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-gray-900">
                        {sku.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {sku?.description}
                      </p>
                      <PricesContainer>
                        <Price
                          skuCode={sku?.code}
                          className="mt-1 text-lg font-medium text-gray-900"
                          compareClassName="line-through text-sm md:text-xs ml-2 mb-1"
                        />
                      </PricesContainer>
                      <AddToCartButton
                        label={"Add to cart"}
                        skuCode={sku?.code}
                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                      />
                    </div>
                  ))}
              </div>

              <div className="mt-6 sm:hidden">
                <Link href="/favourites">
                  <span className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    ...
                    <span aria-hidden="true"> &rarr;</span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </ItemContainer>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const query = `*[_type == "campaign"]{
    id,
    name, 
    headline,
    subHeading, 
    image{
      'url': asset->url
    },
}`

  // Get Sanity Data
  const campaigns = await client.fetch(query)

  let filtered = {}

  if (campaigns.length > 0) {
    filtered = campaigns.filter(
      (campaign) => campaign.id === process.env.NEXT_PUBLIC_CAMPAIGN_ID
    )
  }

  return {
    props: {
      data: filtered[0],
    },
  }
}
