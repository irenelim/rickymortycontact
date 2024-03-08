import EpisodesTableRow from "./EpisodesTableRow";

type Props = {
  episodes: string[];
};

function EpisodesTable({ episodes }: Props) {

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="border-b bg-blue-200 dark:border-slate-600 font-medium text-slate-600 dark:text-slate-200 text-left">Name</th>
          <th className="border-b bg-blue-200 dark:border-slate-600 font-medium text-slate-600 dark:text-slate-200 text-left">Air Date</th>
          <th className="border-b bg-blue-200 dark:border-slate-600 font-medium text-slate-600 dark:text-slate-200 text-left">Episode</th>
          <th className="border-b bg-blue-200 dark:border-slate-600 font-medium text-slate-600 dark:text-slate-200 text-left">Created Date</th>
        </tr>
      </thead>
      <tbody className="">
        {episodes.map((ep) => (
          <EpisodesTableRow key={ep} episodeUrl={ep} />
        ))}
      </tbody>
    </table>
  );
}

export default EpisodesTable;
