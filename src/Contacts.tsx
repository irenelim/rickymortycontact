import { Outlet } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import SearchInput from "./components/SearchInput";
import ContactCard from "./components/ContactCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactType[] | null>(null);
  const [info, setInfo] = useState<InfoType | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  console.log(info); // {count: 826, pages: 42, next: 'https://rickandmortyapi.com/api/character?page=2', prev: null}

  useEffect(() => {
    const fetchContacts = async () => {
      const nameParam = name.length > 0 ? `name=${name}&` : null;
      const statusParam = status ? `status=${status}&` : null;
      const genderParam = gender ? `gender=${gender}` : null;
      const params =
        !nameParam && !statusParam && !genderParam
          ? ""
          : `/?${[nameParam, statusParam, genderParam].join("")}`;
      const fetchUrl =
        `https://rickandmortyapi.com/api/character${params}`.replace(/&$/, "");
      try {
        const result = await axios.get(fetchUrl);
        if (result.data) {
          // console.log(result.data)
          setContacts(result.data.results);
          setInfo(result.data.info);
        }
      } catch (error) {
        console.error("fetching data failed.");
      }
    };

    fetchContacts();

    return () => {
      setContacts(null);
      setInfo(null);
    };
  }, [name, status, gender]);

  const onClear = () => {
    setStatus("");
    setGender("");
  };

  return (
    <>
      <div className="overflow-auto max-w-[27%] w-[350px] bg-[#f7f7f7] border-x-2 border-[#e3e3e3] flex flex-col">
        <div className="p-4 flex flex-col">
          <h2 className="font-bold text-4xl">Contact</h2>
        </div>
        <SearchInput setValue={setName} value={name} />
        <div className="flex flex-col px-4 lg:flex-row gap-3">
          <Dropdown
            name="Status"
            setValue={setStatus}
            value={status}
            options={["alive", "dead", "unknown"]}
          />
          <Dropdown
            name="Gender"
            setValue={setGender}
            value={gender}
            options={["female", "male", "genderless", "unknown"]}
          />
        </div>
        {status || gender ? (
          <button
            onClick={onClear}
            className="self-end mx-2 my-4 w-[80px] px-4 py-2 font-semibold text-base bg-cyan-500 text-white rounded-full shadow-sm hover:shadow-cyan-600"
          >
            Clear
          </button>
        ) : null}

        {contacts && contacts.length > 0 ? (
          <div className="bg-slate-100 mt-4 max-h-[1590px] overflow-auto flex flex-col gap-1">
            {contacts?.map((contact) => {
              return <ContactCard key={contact.id} contact={contact} />;
            })}
          </div>
        ) : null}
      </div>

      <div id="detail" className="flex-1">
        <Outlet />
      </div>
    </>
  );
}
