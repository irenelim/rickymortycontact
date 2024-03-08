import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

function SearchInput({ setValue, value }: Props) {
  const [val, setVal] = useState("");
  const debouncedValue = useDebounce<string>(val, 800);

  useEffect(() => {
    setVal(value);
  }, [value])

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };

  return (
    <input
      type="text"
      maxLength={20}
      placeholder="Search Characters"
      className="m-3 block text-base py-2 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
      onChange={onChange}
      value={val}
    />
  );
}

export default SearchInput;
