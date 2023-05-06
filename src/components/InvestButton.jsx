import { useState, useEffect } from "react";

import contractAbi from "../constants/abi";
import contract from "../constants/contractAddress";

import { useContractWrite, usePrepareContractWrite } from 'wagmi'


import { ethers } from 'ethers'

function InvestButton({ id, investValue }) {

    const { config } = usePrepareContractWrite({
        address: contract.contractAddress,
        abi: contractAbi,
        functionName: 'invertirProyecto',
        args: [id],
        overrides: {
            value: ethers.utils.parseEther(investValue == '' ? "1" : investValue),
        },

    })
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            console.log('Success', data)
            setEditPopUp(false)
        },
    })

    return (

        <button className='bg-green-400 px-4 py-2 rounded-md' onClick={() => { write?.() }}>
            Invertir
        </button>

    )
}

export default InvestButton