export default function Input({ label, invalid, ...props }) {
    let lableClass="block mb-2 text-xs font-bold tracking-wide uppercase"
    let inputClass="w-full px-3 py-2 leading-tight border rounded shadow"
    if(invalid) {
        lableClass += " text-red-400"
        inputClass += " text-red-500 bg-red-100 border-red-300"
    } else{
        lableClass += " text-stone-300"
        inputClass += " text-gray-700 text-stone-300"
    }

  return (
    <p>
      <label className={lableClass}>{label}</label>
      <input className={inputClass} {...props} />
    </p>
  );
}