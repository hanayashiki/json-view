import { exampleFile } from "../data/exampleFile";
import { useStore } from "../utils/store";

export const EmptyJsonView = () => {
  const store = useStore();

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src="/logo.svg" className="h-[7rem] w-[7rem] mb-[2rem]" />

        <h1 className="text-xl mb-[1rem]">Welcome JSON View!</h1>

        <ul className="text-center leading-loose mb-[1rem]">
          <li>☑️ Copy JSON to the left, and view the tree on the right.</li>
          <li>☑️ Share JSON files with your friends.</li>
          <li>☑️ Workspace persisted in the cloud.</li>
          <li>☑️ No login required.</li>
        </ul>

        <button
          onClick={async () => {
            await store.insertFile(exampleFile);
          }}
          className="bg-white py-2 px-4 rounded-md text-primary-main hover:text-opacity-50"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
