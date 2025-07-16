import { Outlet } from "react-router";

export default function IndexLayout() {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-start w-11/12 my-8 mx-auto">
        <Outlet />
      </div>
    </section>
  );
}
