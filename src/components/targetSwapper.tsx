import { Dispatch, SetStateAction, useState } from "react";
import FirstTask from "./FirstTask";
import SecondTask from "./SecondTask";

function Button({
  type,
  setPageCounter,
}: {
  type: "prev" | "next";
  setPageCounter: Dispatch<SetStateAction<number>>;
}) {
  return (
    <button
      onClick={() =>
        setPageCounter((prev) => (type === "prev" ? prev - 1 : prev + 1))
      }
    >
      {type === "prev" ? "Предыдущая" : "Следующая"}
    </button>
  );
}

export default function TargetSwapper() {
  const [pageCounter, setPageCounter] = useState<number>(0);

  return (
    <div>
      {pageCounter === 0 && <FirstTask />}
      {pageCounter === 1 && <SecondTask />}
      <Button
        type={pageCounter === 1 ? "prev" : "next"}
        setPageCounter={setPageCounter}
      />
    </div>
  );
}
