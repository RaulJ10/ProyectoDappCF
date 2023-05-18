import { useState, useEffect } from "react";

import contractAbi from "../constants/abi";
import contract from "../constants/contractAddress";

import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi'


import { ethers } from 'ethers'

function InvestedProjects({ id, address, investedPopUp, projectIndex }) {

    const [project, setProject] = useState()

    const getInversores = useContractRead({
        address: contract.contractAddress,
        abi: contractAbi,
        functionName: 'getInversores',
        args: [id],
        onSuccess(data) {
            setInvestors(data)
            console.log(data);
        },
    })

    const getCount = useContractRead({
        address: contract.contractAddress,
        abi: contractAbi,
        functionName: 'projectCount',
        onSuccess(data) {
            setProjectCount(data)
        },
    })

    const getProyecto = useContractRead({
        address: contract.contractAddress,
        abi: contractAbi,
        functionName: 'getProyecto',
        args: [id],
        onSuccess(data) {
            //console.log('Success', data[0]?.owner)
            setProject(data)
            Object.values(investors).map((i) => {

                if (i[0] == address) {
                    setInvested(true)
                    console.log(invested, id);
                }
            })
        },
    })

    const [showProjectsFinanced, setShowProjectsFinanced] = useState(false);
    const [projectsFinanced, setProjectsFinanced] = useState([]);
    const [projectCount, setProjectCount] = useState();
    const [investors, setInvestors] = useState({});
    const [invested, setInvested] = useState()


    // for (let i = 0; i <= projectCount; i++) {
    //     Object.values(investors).map((key) => {

    //         if (key[0] == address) {
    //             setInvested(true)
    //             console.log(true, id);
    //         }
    //     });
    // }


    useEffect(() => {

        Object.values(investors).map((i) => {

            if (i[0] == address) {
                setInvested(true)
                console.log(invested, id);
            }
        })
    }, [])

    useEffect(() => {

        Object.values(investors).map((i) => {

            if (i[0] == address) {
                setInvested(true)
                console.log(invested, id);
            }
        })
    }, [investors])



    return (


        <div>
            {
                invested ? (
                    <section className='flex flex-row flex-wrap gap-6 w-full p-3 ' >
                        <div className="bg-slate-100 w-full flex flex-row gap-4 rounded-lg p-3">
                            <img
                                className='rounded-lg w-[80px] h-[80px]'
                                src={projectIndex.imageURL}
                            />
                            <div>
                                <h3 className='text-xl font-bold text-start'>{projectIndex[2]}</h3>
                                <p className='mt-1'>{projectIndex[3]}</p>
                            </div>
                        </div>
                    </section>
                ) : (
                    ""
                )

            }

        </div>




    )
}

export default InvestedProjects