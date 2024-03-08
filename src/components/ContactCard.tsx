import { NavLink } from "react-router-dom";

type Props = {
  contact: ContactType;
};

function ContactCard({ contact }: Props) {
  const { id, image, name, species } = contact;
  return (
    <NavLink
      to={`./${id}`}
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      <div
        className="py-2 flex items-center cursor-pointer"
      >
        <img
          src={image}
          className="w-[60px] h-[60px] [clip-path:_circle(50%)] mx-3"
        />
        <div className="flex flex-col text-slate-700">
          <h6 className="font-semibold">{name}</h6>
          <p className="">{species}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default ContactCard;
