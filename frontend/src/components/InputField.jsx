function InputField({ label, id, name, required, type, value, onChange }) {
    return (
        <div className="input-field">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} required={required} value={value} onChange={onChange} />
        </div>
    );
}

export default InputField;