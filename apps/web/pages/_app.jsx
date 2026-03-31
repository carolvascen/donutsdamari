import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Outfit:wght@300;400;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return <Component {...pageProps} />
}
