export default function Pin({ children }) {
  return (
    <div className="relative w-[50px] h-[50px] rounded-t-full rounded-br-full flex-center bg-red-300 -rotate-45">
      <p className="rotate-45 font-bold">{children}</p>
    </div>
  );
}
