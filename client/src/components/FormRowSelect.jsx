/* eslint-disable react/prop-types */
import React from 'react'

// pass the params we want to pass in 
const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className='form-label'>
        {labelText || name} {/* pass the label u want ti show on frontend*/}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}>
        {/* can also use <option> to hard code */}
        {/* list initially looks like ==== Object.values(BASICINFO_GENDER) */}
        {list.map((itemValue) => {
          return <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        })}
      </select>
    </div>
  )
}

export default FormRowSelect