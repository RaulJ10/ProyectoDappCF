import { Inter } from 'next/font/google'
import { AiOutlineArrowDown } from "react-icons/ai";

import { useState, useEffect } from "react";

import contractAbi from "../constants/abi";
import contract from "../constants/contractAddress";

import { useAccount, useConnect, useContractRead, useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from 'wagmi/providers/public'

import { ethers, BigNumber } from 'ethers'

import NavBar from "../components/NavBar";
import Menu from "../components/Menu";
import EditProject from '@/components/EditProject';
import InvestButton from '@/components/InvestButton';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const [owner, setOwner] = useState()
  const [projects, setProjects] = useState()

  const [createPopUp, setCreatePopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [cost, setCost] = useState("");
  const [url, setURL] = useState("");
  const [date, setDate] = useState();
  const [investValue, setInvestValue] = useState("")

  function handleStateCreate() {
    setCreatePopUp(true);
  }

  const handleOnChange = (e) => {
    const value = e.target.value;
    const input = e.target;
    switch (input.name) {
      case "Title":
        setTitle(value);
        break;
      case "Description":
        setDescription(value);
        break;
      case "CostsProject":
        setCost(value);
        break;
      case "ExpirationTime":
        setDate(value);
        break;
      case "ImageURL":
        setURL(value);
        break;
      case "Invest":
        setInvestValue(value);
        break;
    }
  };

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr);
    return dateObj / 1000;
  };

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const EthToWei = (value) => {
    return toString(value * 10 ** 18)
  }

  const balance = useBalance({
    address,
  })

  const getBalance = () => {
    if (balance.isLoading) return <div><p>Fetching balance…</p></div>
    if (balance.isError) return <div><p>Error fetching balance</p></div>
    return (
      <div>
        {balance.data?.formatted.slice(0, 6)}
      </div>
    )
  }

  const ownerRead = useContractRead({
    address: contract.contractAddress,
    abi: contractAbi,
    functionName: 'owner',
    onSuccess(data) {
      console.log('Success', data)
      setOwner(data)
    },
  })

  const getProyectos = useContractRead({
    address: contract.contractAddress,
    abi: contractAbi,
    functionName: 'getProyectos',
    onSuccess(data) {
      console.log('Success', data[0]?.owner)
      setProjects(data)
    },
  })

  const returnState = (e) => {
    switch (e) {
      case 0n:
        return "Abierto";
      case 1n:
        return "Aprobado";
      case 2n:
        return "Revertido";
      case 3n:
        return "Borrado";
      case 4n:
        return "Pagado";
    }
  };

  const { config } = usePrepareContractWrite({
    address: contract.contractAddress,
    abi: contractAbi,
    functionName: 'crearProyecto',
    args: [title, description, url, ethers.utils.parseEther(cost == '' ? "1" : cost), toTimestamp(date)],

  })
  const { write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log('Success', data)
      setCreatePopUp(false)
    },
  })




  return (
    <main
      className={`flex min-h-screen flex-col items-center  py-12 ${inter.className}`}
    >
      <NavBar account={address} active={isConnected} Injected={connect} balance={getBalance} />
      {
        isConnected
          ?
          <Menu setCreatePopUp={handleStateCreate} />
          :
          ""
      }

      <section className='flex flex-row flex-wrap gap-6 w-[85%] mt-12 ' >
        {isConnected ? (
          projects ? (
            projects.map((project, i) => {
              return (
                <div key={i} className='bg-white p-10 rounded-lg w-full min-w-[400px] max-w-[480px] h-full min-h-[580px] shadow'>
                  <h3 className='text-xl font-bold text-start'>{project[2]}</h3>
                  <img
                    className='rounded-lg my-3 w-full h-[200px]'
                    src={project.imageURL}
                  />
                  <div className='w-fit mt-4 mb-4'>
                    {
                      ethers.utils.formatEther((project[5])) == ethers.utils.formatEther((project[6]))
                        ?

                        <p className='bg-red-400 px-2 py-1 rounded-md' >
                          Finalizado
                        </p>

                        :
                        <p className='bg-green-400 px-2 py-1 rounded-md' >
                          Abierto
                        </p>
                    }
                  </div>
                  <div className='flex items-center gap-1 text-lg  mt-1'>
                    <p>Total recaudado:</p>
                    <p className='font-bold'>{ethers.utils.formatEther((project[6])).slice(0, 6)}</p>
                    <img
                      className='w-6'
                      src={"/eth-icon.png"}
                    />
                  </div>
                  <div className='flex items-center gap-1 text-md'>
                    <p>A recaudar:</p>
                    <p className='font-bold'>{ethers.utils.formatEther((project[5])).slice(0, 6)} ETH</p>

                  </div>



                  <p>{returnState(project[10])}</p>
                  <p className='mt-3'>{project[3]}</p>
                  <div className='flex mt-6 gap-6'>
                    <div className='flex gap-3'>

                      {
                        ethers.utils.formatEther((project[5])) == ethers.utils.formatEther((project[6]))
                          ?
                          <div className='flex gap-3'>
                            <input name="Invest" disabled type="number" className='input px-3 py-5 w-20 h-10 rounded-xl text-start text-xl outline-none font-sans font-medium' placeholder="ETH" onChange={(e) => {
                              handleOnChange(e);
                            }} />
                            <button className='bg-red-400 px-4 py-2 rounded-md' >
                              Closed
                            </button>
                          </div>
                          :
                          <div className='flex gap-3'>
                            <input name="Invest" type="number" className='input px-3 py-5 w-20 h-10 rounded-xl text-start text-xl outline-none font-sans font-medium' placeholder="ETH" onChange={(e) => {
                              handleOnChange(e);
                            }} />
                            <InvestButton id={i} investValue={investValue} />
                          </div>
                      }
                    </div>

                    {
                      address == project.owner
                        ?
                        <button className='bg-orange-400 px-4 py-2 rounded-md' onClick={() => { setEditPopUp(true) }}>
                          <p>Editar</p>
                        </button>
                        :
                        ""
                    }
                  </div>
                  {
                    editPopUp
                      ?
                      <EditProject id={i} setEditPopUp={setEditPopUp} handleOnChange={handleOnChange} url={url} cost={cost} description={description} title={title} date={date} toTimestamp={toTimestamp} isConnected={isConnected} />
                      :
                      ""
                  }
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )
        ) : (
          ""
        )}
      </section>

      {
        isConnected
          ?
          ""
          : (
            <div className='flex justify-center items-center flex-col gap-3'>
              <p className='text-xl font-semibold'>Connect Wallet to load the Dapp</p>
              <AiOutlineArrowDown className='text-lg' />
              <button class="text-black bg-white hover:bg-slate-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                onClick={() => { connect() }}>
                Connect Wallet
              </button>
            </div>
          )

      }

      {
        createPopUp
          ?
          <div className='h-[100%] w-full z-20 fixed top-0 left-0 backdrop-blur-lg flex justify-center items-center '>
            <div className=' max-w-[700px] min-w-[300px] w-full bg-white rounded-xl p-8 relative mx-3 popup'>
              <img src="./assets/cross.svg" alt="cross" className='h-[15px] w-[15px] absolute top-3 right-3 cursor-pointer' onClick={() => {
                setCreatePopUp(false)
              }} />
              <div>
                <div>
                  <div>
                    <div className='flex flex-col'>
                      <img
                        src={url ? url : "/new-project.png"}
                        alt="Set a proper image URL"
                        className='w-full h-[200px] rounded-lg'
                      />
                      <h2 className='text-2xl font-semibold mt-3'>Rellena los datos para crear un proyecto:</h2>
                      <div className='flex flex-col justify-between items-start gap-4 mt-6'>
                        <input
                          type="text"
                          name="Title"
                          className='w-full bg-slate-100 p-3 rounded-lg outline-none'
                          placeholder="Titulo del Proyecto"
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                        <input
                          type="text"
                          name="ImageURL"
                          className='w-full bg-slate-100 p-3 rounded-lg outline-none'
                          placeholder="URL de la Imagen"
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                        <input
                          type="number"
                          name="CostsProject"
                          placeholder="ETH a recaudar"
                          className='w-full bg-slate-100 p-3 rounded-lg outline-none'
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                        <input
                          type="date"
                          name="ExpirationTime"
                          placeholder="Tiempo de Expiración"
                          className='w-full bg-slate-100 p-3 rounded-lg outline-none'
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                        <textarea
                          type="text"
                          name="Description"
                          className='w-full h-[50%] bg-slate-100 p-3 rounded-lg outline-none'
                          placeholder="Descripcion del Proyecto"
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                        <button
                          className='bg-green-400 px-4 py-2 w-full rounded-lg'
                          onClick={() => {
                            if (title && description && cost && url && date) {
                              if (isConnected) {
                                write?.()
                              } else {
                                alert("Connect your wallet!");
                              }
                            } else {
                              alert("Rellena todos los campos!");
                            }
                          }}

                        >
                          Submit
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
          :
          ''
      }

    </main >
  )
}
