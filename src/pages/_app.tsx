import { BaseLayout } from "@/components/layout/BaseLayout/BaseLayout"
import "@/styles/all.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}
