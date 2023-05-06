import { useState, useEffect } from "react";

import contractAbi from "../constants/abi";
import contract from "../constants/contractAddress";

import { useContractWrite, usePrepareContractWrite } from 'wagmi'


import { ethers } from 'ethers'

function EditProject({ setEditPopUp, url, title, description, cost, handleOnChange, id, toTimestamp, date, isConnected }) {

    const { config } = usePrepareContractWrite({
        address: contract.contractAddress,
        abi: contractAbi,
        functionName: 'editarProyecto',
        args: [id, title, description, url, toTimestamp(date)],
    })
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            console.log('Success', data)
            setEditPopUp(false)
        },
    })

    return (

        <div className='h-[100%] w-full z-20 fixed top-0 left-0 backdrop-blur-lg flex justify-center items-center '>
            <div className=' max-w-[700px] min-w-[300px] w-full bg-white rounded-xl p-8 relative mx-3 popup'>
                <img src="./assets/cross.svg" alt="cross" className='h-[15px] w-[15px] absolute top-3 right-3 cursor-pointer' onClick={() => {
                    setEditPopUp(false)
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

    )
}

export default EditProject