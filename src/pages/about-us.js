import NavBar from "../components/NavBar";
import Link from "next/link"

const About = () => {
  return (
    <main className="bg-white h-screen ">
      <nav class="bg-transparent px-2 py-8 sm:px-4 pb-8  w-full z-20 top-0 left-0  border-b-2 border-gray-100 ">
        <div class="container flex flex-wrap items-center justify-around sm:justify-between mx-auto">
          <a href="#" class="flex items-center justify-center">
            <span class="self-center text-5xl  whitespace-nowrap text-black font-font">Heaven Crowdfunding</span>
          </a>
          <div class="flex  items-center md:order-2 ">

            <Link
              href={`/`}

            >
              <p className='mr-10 font-medium'>Home</p>
            </Link>


          </div>
        </div>
      </nav>

      <div className=" flex justify-center flex-col p-24 gap-5">
        <p className="text-xl  w-[700px]">
          Bienvenido a Heaven, nuestro crowdfunding de vehículos siniestrados,
          puedes invertir en una oportunidad única de obtener ganancias a largo
          plazo mientras ayudas al medio ambiente.
        </p>
        <p className="text-lg  w-[500px]">
          Al invertir en nuestro crowdfunding, estarás contribuyendo a la
          reparación de coches que, de otra manera, podrían haber terminado en un
          depósito de chatarra. Al mismo tiempo, estarás obteniendo una
          participación en la propiedad del coche reparado y cualquier beneficio
          futuro que pueda generar.
        </p>
      </div>
    </main>
  );
};

export default About;
