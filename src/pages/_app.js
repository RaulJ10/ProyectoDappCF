import '@/styles/globals.css'

//Importamos todo para configurar el cliente de WAGMI y la red de sepolia
import { WagmiConfig, createClient, sepolia, configureChains, } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

//Les ponemos un provider con una red y que utilice la RPC publica
const { provider, webSocketProvider } = configureChains(
  [sepolia],
  [publicProvider()],
)

//Para el cliente le decimos que siga utilizando el provider y que no se autoconecte la aplicación
const client = createClient({
  autoConnect: false,
  provider
})

export default function App({ Component, pageProps }) {
  return (
    //Envolvemos el componente padre entre la configuración de WAGMI para que todo funcione correctamente
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )

}
