import React from 'react'

function TemparatureSwitchToggle({label, setIsCelcius}) {


function onChangeTemparatureToggle(e) {
    if(e.target.value){
        setIsCelcius(true)
    } else {
        setIsCelcius(false)
    }
}

  return (
    <div className="temparature__switch__container">
    {label}{" "}
    <div className="temparature__toggle__switch">
      <input
        type="checkbox"
        className="temparature__toggle__switch__checkbox"
        name={label}
        id={label}
        onChange={onChangeTemparatureToggle}
      />
      <label className="temparature__toggle__switch__label" htmlFor={label}>
        <span className="temparature__toggle__switch__inner" />
        <span className="temparature__toggle__switch__switch" />
      </label>
    </div>
  </div>
  )
}

export default TemparatureSwitchToggle