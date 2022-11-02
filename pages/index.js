import { useContext, useEffect, useState, Fragment } from "react"

// Headless UI
import { Popover, Transition } from "@headlessui/react"

// Heroicons
import { ShoppingBagIcon } from "@heroicons/react/24/outline"

// Next
import Head from "next/head"
import Link from "next/link"

// Styles
import styles from "../styles/Home.module.css"

// Context
import { ProductContext } from "../context/ProductContext"

// Commerce Layer
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
  LineItemsContainer,
  LineItemsCount,
  LineItem,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  LineItemAmount,
  LineItemRemoveLink,
  TotalAmount,
  CheckoutLink,
} from "@commercelayer/react-components"

// Components
import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"

// Commercelayer
import CommerceLayerSDK from "@commercelayer/sdk"
import {
  PricesContainer,
  Price,
  ItemContainer,
  AddToCartButton,
} from "@commercelayer/react-components"

// Sanity
import { client } from "../lib/client"

export default function Home({ data }) {
  const [wiggle, setWiggle] = useState(false)
  const { setAllData, allData, setSubCategories, token } =
    useContext(ProductContext)
  const [cl, setCl] = useState()
  const [skus, setSkus] = useState([])

  const [origin, setOrigin] = useState("http://localhost:3000")

  useEffect(() => {
    setOrigin(location.origin)
  }, [])

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
        CommerceLayerSDK({
          organization: "headless",
          accessToken: token,
        })
      )
    }
  }, [token])

  useEffect(() => {
    fetchSKUs()
  }, [cl])

  return (
    <CommerceLayer
      accessToken={token}
      endpoint={process.env.NEXT_PUBLIC_CL_BASE_ENDPOINT}
    >
      <OrderStorage persistKey="abc-002">
        <OrderContainer
          attributes={{
            cart_url: `${origin}`,
            return_url: `${origin}`,
            privacy_url: `${origin}`,
          }}
        >
          {" "}
          <LineItemsContainer>
            <div className={styles.container}>
              <Head>
                <title>Campaign 01</title>
                <meta
                  name="description"
                  content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <div>
                <main>
                  <div
                    className={`bg-[url('https://cdn.sanity.io/images/z17lrfub/production/0a2348eb5500b7dee1776b933f83a3f654c10ac0-1920x1280.jpg')] object-cover object-center bg-cover bg-center min-h-[600px]`}
                  >
                    <header className="relative">
                      {/* Top navigation */}
                      <nav aria-label="Top" className="relative z-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
                          <div className="flex h-16 items-center">
                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                              <Link href="/">
                                <div className="flex items-center">
                                  {allData?.logo && (
                                    <img
                                      className="h-8 w-auto cursor-pointer"
                                      src={allData?.logo?.url}
                                      alt=""
                                    />
                                  )}

                                  <span className="ml-2 text-white text-2xl">
                                    {" "}
                                    {allData?.logoText}
                                  </span>
                                </div>
                              </Link>
                            </div>

                            <div className="ml-auto flex overflow-auto items-center">
                              {/* Shopping Cart */}
                              <Popover className="fixed right-6 flow-root text-sm lg:mr-8 drop-shadow-md">
                                <Popover.Button
                                  className={`${
                                    wiggle && "animate-wiggle"
                                  } group -m-2 z-50 flex items-center duration-100 bg-blue-600 hover:bg-blue-800 rounded-full p-3`}
                                  onClick={() => {
                                    setWiggle(true)
                                  }}
                                  onAnimationEnd={() => setWiggle(false)}
                                >
                                  <ShoppingBagIcon
                                    className="h-6 w-6 flex-shrink-0 text-white"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 text-sm font-medium text-white ">
                                    <LineItemsCount />
                                  </span>
                                  <span className="sr-only">
                                    items in cart, view bag
                                  </span>
                                </Popover.Button>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  {/* <Popover.Panel className="absolute max-h-[86vh] overflow-auto right-0 min-w-[300px] top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"> */}
                                  <Popover.Panel className=" w-screen h-screen sm:h-auto absolute -z-30 -top-12 bg-white -right-6  sm:max-h-[80vh] sm:overflow-auto sm:right-0 sm:min-w-[300px] sm:top-16 sm:mt-px  sm:pb-6 sm:shadow-lg sm:px-2   lg:top-full lg:left-auto lg:mt-3 sm:-mr-1.5 sm:w-80 sm:rounded-lg sm:ring-1 sm:ring-black sm:ring-opacity-5">
                                    <h2 className="sr-only">Shopping Cart</h2>

                                    <div className="container">
                                      <div
                                        style={{
                                          position: "relative",
                                          height: "auto",
                                        }}
                                      >
                                        <div style={{ height: "100%" }}></div>
                                        <div className="mx-auto max-w-2xl px-4  h-screen sm:h-auto overflow-auto flex flex-col justify-between sm:justify-start  py-10 sm:py-0">
                                          <ul
                                            role="list"
                                            className="divide-y divide-gray-200 max-h-[80vh] sm:max-h-[60vh] overflow-auto  "
                                          >
                                            <LineItemsContainer>
                                              <LineItem>
                                                <div className="flex items-center py-6 px-4 sm:px-0">
                                                  <LineItemImage
                                                    className="h-16 w-16 flex-none rounded-md border border-gray-200"
                                                    width={50}
                                                  />
                                                  <div className="ml-4 flex-auto">
                                                    <h3 className="font-medium text-gray-900">
                                                      <LineItemName />
                                                    </h3>
                                                    <LineItemQuantity
                                                      max={10}
                                                      className="block mt-1 text-xs py-1"
                                                    />
                                                    {/* <Errors resource="lineItem" field="quantity" /> */}
                                                    <LineItemAmount />
                                                    <LineItemRemoveLink
                                                      className="text-red-400 cursor-pointer text-xs block"
                                                      onClickCapture={() => {
                                                        setWiggle(true)
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </LineItem>
                                            </LineItemsContainer>
                                          </ul>
                                          <div className=" mt-auto ">
                                            <p className="text-xl sm:text-base mb-4 sm:mb-0 sm:mt-4 px-2 sm:px-0">
                                              Total:{" "}
                                              <LineItemsContainer>
                                                <TotalAmount className="text-xl sm:text-base font-medium" />
                                              </LineItemsContainer>
                                            </p>
                                            <CheckoutLink
                                              type="submit"
                                              className="w-full sm:rounded-md border border-transparent absolute bottom-0 left-0 sm:relative  bg-indigo-600 mt-6 py-3 sm:py-2 px-4 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                            />
                                          </div>
                                        </div>
                                        {"   "}
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </nav>
                    </header>
                    {/* Hero section */}
                    <Hero />
                  </div>
                  <div className="relative">
                    <ItemContainer>
                      <section aria-labelledby="favorites-heading">
                        <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8 bg-white">
                          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                            {skus &&
                              skus?.map((sku) => (
                                <div
                                  key={sku.reference}
                                  className="flex flex-col md:flex-row mt-20 max-w-[1000px] mx-auto"
                                >
                                  <div className="w-full overflow-hidden max-w-md md:mr-10 rounded-lg sm:aspect-h-1 sm:h-auto mx-auto">
                                    <img
                                      src={sku?.image_url}
                                      alt={sku?.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="md:max-w-sm flex flex-col justify-center items-center md:items-start  text-justify">
                                    {" "}
                                    <h3 className="text-3xl font-semibold text-gray-900">
                                      {sku.name}
                                    </h3>
                                    <p className="mt-10 text-sm text-gray-500">
                                      {sku?.description}
                                    </p>
                                    <PricesContainer>
                                      <Price
                                        skuCode={sku?.code}
                                        className="mt-10 text-lg font-medium text-gray-900"
                                        compareClassName="line-through text-sm md:text-xs ml-2 mb-1"
                                      />
                                    </PricesContainer>
                                    <AddToCartButton
                                      label={"Add to cart"}
                                      skuCode={sku?.code}
                                      className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                      onClickCapture={() => {
                                        setWiggle(true)
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </section>
                    </ItemContainer>
                  </div>
                </main>

                <Footer />
              </div>
            </div>
          </LineItemsContainer>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export async function getServerSideProps() {
  const query = `*[_type == "campaign"]{
    id,
    name, 
    logoText,
    logo{
      'url': asset->url
    },
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
