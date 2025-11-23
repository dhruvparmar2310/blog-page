import '@/assets/css/main.scss'
import Header from '@/common/components/Header/Header'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
      <Component {...pageProps} />
      </main>
    </>
  )
}
