import React, { useEffect, useState } from "react";

type Props = {
  options: string[];
  name: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

function Dropdown({ options, name, setValue, value }: Props) {
  const [val, setVal] = useState("");

  useEffect(() => {
    setVal(value);
  }, [value])

  useEffect(() => {
    setValue(val);
  }, [setValue, val])

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVal(event.currentTarget.value);
  };
  return (
    <select onChange={onChange} value={value} className="py-2 px-3 m3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300 text-slate-700 text-base">
      <option value="" >
        Select a {name}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="capitalize">
          {opt}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
