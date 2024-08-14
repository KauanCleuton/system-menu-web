"use client"
import { Suspense, useEffect } from "react"
import Loading from "./loading"
import TopSection from "./home/TopSection"
import MiddleSection from "./home/MiddleSection"


const Home = () => {


  return (
    <Suspense fallback={<Loading />}>
      <TopSection />
      <MiddleSection />
    </Suspense>
  )
}

export default Home