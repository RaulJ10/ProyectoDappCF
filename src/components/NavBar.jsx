import { FaInstagramSquare } from 'react-icons/fa'
import { AiFillTwitterSquare } from 'react-icons/ai'
import { BsDiscord } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'

function NavBar({ account, balance, active, activate, Injected }) {
    return (

        <nav class="bg-transparent px-2 sm:px-4 pb-8  w-full z-20 top-0 left-0  border-b-2 border-gray-100 ">
            <div class="container flex flex-wrap items-center justify-around sm:justify-between mx-auto">
                <a href="#" class="flex items-center justify-center">
                    <span class="self-center text-5xl  whitespace-nowrap text-black font-font">CrowdFunding</span>
                </a>
                <div class="flex md:order-2 ">
                    {active
                        ?
                        <div className="flex gap-2"><button type="button" class="text-black bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0  ">{`${account?.slice(0, 5)}...${account?.slice(account.length - 4)}`}</button>
                            <button type="button" class="text-black bg-white flex gap-1  font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 ">{balance()} ETH</button></div>
                        :
                        <div>
                            <button class="text-black bg-white hover:bg-slate-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                                onClick={() => { Injected() }}>
                                Connect Wallet
                            </button>

                        </div>
                    }

                </div>
            </div>
        </nav>

    )
}

export default NavBar