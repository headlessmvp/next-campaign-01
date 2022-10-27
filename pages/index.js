import { useContext, useEffect } from "react"

// Context
import { ProductContext } from "../context/ProductContext"

// Sanity
import { client } from "../lib/client"

// Components
import { Hero } from "../components/sections/Hero"
import { Favourites } from "../components/sections/Favourites"
import { Layout } from "../components/Layout"

export default function Home({ data }) {
  const { setAllData, allData, setSubCategories } = useContext(ProductContext)

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

  console.log("INDEX : ", allData)

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero section */}
        <Hero />
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
