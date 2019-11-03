import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} className="custom-select" {...rest}>
                {options.map(v => (
                    <option key={v.text} value={v.value}>
                        {v.text}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
