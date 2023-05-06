import '@/styles/globals.css'

import { WagmiConfig, createClient, sepolia, configureChains, } from 'wagmi'
import { fantomTestnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(
  [sepolia],
  [publicProvider()],
)

const client = createClient({
  autoConnect: false,
  provider
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )

}
