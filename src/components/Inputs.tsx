

export default function Input({type, label, value, onChange} : {type:("number" | "text"), label: string, value: (string | number), onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return <>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </>
}