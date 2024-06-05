import React from 'react'
import { Link } from 'react-router-dom'
import { AddCircleIcon } from '../Icons/icons'

const AddButton = ({ text, to, onClick }) => {
  return (
    <>
      {to ?
        <Link to={to}>
          <button className="btn-l font-bold px-[22px] py-3 bg-primary-500 text-white flex items-center gap-2 rounded-full shadow-md">
            <AddCircleIcon />
            {text}
          </button>
        </Link>
        :
        <button onClick={onClick} className="btn-l font-bold px-[22px] py-3 bg-primary-500 text-white flex items-center gap-2 rounded-full shadow-md">
          <AddCircleIcon />
          {text}
        </button>
      }
    </>
  )
}

export default AddButton