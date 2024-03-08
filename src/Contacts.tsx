import { Outlet } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import SearchInput from "./components/SearchInput";
import ContactCard from "./components/ContactCard";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactType[] | null>(null);
  const [info, setInfo] = useState<InfoType | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

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
        console.log(fetchUrl);
        const result = await axios.get(fetchUrl);
        if (result.data) {
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

  const fetchMoreContacts = async (url: string) => {
    console.log("fetchMoreContacts", url);
    try {
      const result = await axios.get(url);
      if (result.data) {
        setContacts((prev) => [...prev!, ...result.data.results]);
        setInfo(result.data.info);
      }
    } catch (error) {
      console.error("fetching data failed.");
    }
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
          <div className="bg-slate-100 mt-4 flex flex-col gap-1">
            <InfiniteScroll
              dataLength={contacts.length}
              next={() => (info?.next ? fetchMoreContacts(info?.next) : {})}
              hasMore={!!info?.next}
              loader={
                <p className="text-center italic text-slate-600/50">
                  Loading...
                </p>
              }
              height={1500}
              endMessage={
                <p className="text-center italic text-slate-600/50">
                  Yay! You have seen it all
                </p>
              }
            >
              {contacts?.map((contact) => {
                return <ContactCard key={contact.id} contact={contact} />;
              })}
            </InfiniteScroll>
          </div>
        ) : null}
      </div>

      <div id="detail" className="flex-1">
        <Outlet />
      </div>
    </>
  );
}
