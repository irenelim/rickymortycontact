import { useLoaderData } from "react-router-dom";
import { isContactType } from "./utils";
import EpisodesTable from "./components/EpisodesTable";

export default function Contact() {
  const response = useLoaderData();
  const contact: ContactType | null = isContactType(response) ? response : null;

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-8 px-16 py-4 border-b-4 border-slate-300">
        <div className="relative rounded-full overflow-hidden">
          <img src={contact?.image} className="min-w-[100px]" />
        </div>
        <h1 className="font-bold text-7xl">{contact?.name}</h1>
      </div>

      <div className="px-16 py-8 flex flex-col gap-8">
        <section>
          <h3 className="font-bold text-2xl mb-3">Personal Info</h3>
          <div className="text-slate-600 text-base flex flex-col">
            <div className="flex items-start gap-3">
              <div className="font-semibold w-[100px] text-end">Status</div>
              <div>{contact?.status}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-semibold w-[100px] text-end">Gender</div>
              <div>{contact?.gender}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-semibold w-[100px] text-end">Species</div>
              <div>{contact?.species}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-semibold w-[100px] text-end">Location</div>
              <div>{contact?.location?.name}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-semibold w-[100px] text-end">
                Created Date
              </div>
              <div>
                {contact?.created ? new Date(contact.created).toString() : null}
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 className="font-bold text-2xl mb-3">Episodes</h3>
          <div>
            {contact?.episode ? (
              <EpisodesTable episodes={contact.episode} />
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
