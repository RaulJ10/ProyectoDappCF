import { FaInstagramSquare } from 'react-icons/fa'
import { AiFillTwitterSquare } from 'react-icons/ai'
import { BsDiscord } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'

function Menu({ setCreatePopUp }) {
    return (

        <section class="flex flex-row justify-around w-[75%] mt-12">
            <button className='bg-green-400 px-4 py-2 rounded-md' onClick={() => { setCreatePopUp() }}>
                Create Project
            </button>
            <button className='bg-orange-400 px-4 py-2 rounded-md'>
                Proyectos Financiados
            </button>


        </section>

    )
}

export default Menu