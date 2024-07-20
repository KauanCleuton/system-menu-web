"use client"
import { Suspense, useEffect } from "react"
import Loading from "./loading"
import TopSection from "./home/TopSection"
import MiddleSection from "./home/MiddleSection"


const Home = () => {

  useEffect(() => {
    const requestPermissionAndNotify = () => {
      window.Notification.requestPermission(permission => {
        if (permission === 'granted') {
          new window.Notification("Vishi Delivery", {
            body: "Seja Bem-Vindo",
            icon: "/img/logo.svg"
          })
        }
      })
    }

    requestPermissionAndNotify(); // Pedir permissão e notificar na primeira vez

    const intervalId = setInterval(() => {
      new window.Notification("Vishi Delivery", {
        body: "Aqui está sua notificação periódica",
        icon: "/img/logo.svg"
      })
    }, 60000); // 60000 ms = 1 minuto

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [])



  return (
    <Suspense fallback={<Loading />}>
      <TopSection />
      <MiddleSection />
    </Suspense>
  )
}

export default Home