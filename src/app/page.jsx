"use client"
import { Suspense, useEffect } from "react"
import Loading from "./loading"
import TopSection from "./home/TopSection"
import MiddleSection from "./home/MiddleSection"
import BannerSection from "./home/BannerSection"


const Home = () => {


  return (
    <Suspense fallback={<Loading />}>
      <TopSection />
      <BannerSection />
      <MiddleSection />
    </Suspense>
  )
}

export default Home