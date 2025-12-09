import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { ReactNode } from "react"

const layout = ({children}: {children: ReactNode}) => {
  return (
    <>
    {/* <AuthProvider> */}
          <Header />
          <main className="pt-16">{children}</main>
        {/* </AuthProvider> */}
          <Footer />

    </>
    
  )
}

export default layout