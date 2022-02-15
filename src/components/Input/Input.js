import React from 'react'

export default function Input({ label, type, name, className, invalidMessage }) {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        <input type={type} name={name} className={className} />
        <div className="invalid-feedback">
          {invalidMessage}
        </div>
      </label>
    </div>
  )
}
