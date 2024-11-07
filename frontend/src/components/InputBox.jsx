

export const InputBox = ({label, placeholder, onChange}) => {
    return <div>
        <div className="text-sm font-bold text-left py-2">{label}</div>
        <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" onChange={onChange}></input>
    </div>
}