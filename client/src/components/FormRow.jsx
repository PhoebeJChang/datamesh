// eslint-disable-next-line react/prop-types
const FormRow = ({type, name, labelText, defaultValue, id, onChange}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        required
        readOnly = {false}
        onChange = {onChange}
      />
    </div>
  )
}

export default FormRow