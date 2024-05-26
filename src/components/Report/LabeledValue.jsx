import React from 'react'

const LabeledValue = ({label, value, labelWidth}) => {
  return (
    <div className='flex body-m'>
      <strong 
      style={{
        minWidth: labelWidth ?? 93
      }} 
      className={`font-bold`}>{label}</strong>
      <span className='mr-2'>:</span>
      {value}
    </div>
  )
}

export default LabeledValue