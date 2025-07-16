export default function ContactUsForm() {
  return (
    <div className="relative border border-solid border-[#333] px-4 pt-16 pb-4">
      <h2 className="text-5xl font-bold absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-solid border-[#333] bg-white">
        Contact Us
      </h2>
      <form
        action=""
        className=" grid grid-cols-2 auto-rows-auto gap-y-8 gap-x-4"
      >
        {/* First name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fname" className="font-bold">
            First name
          </label>
          <input
            id="fname"
            type="text"
            className="border border-solid border-[#333] px-4 py-2"
            placeholder="First name"
          />
        </div>

        {/* Last name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="lname" className="font-bold">
            Last name
          </label>
          <input
            id="lname"
            type="text"
            className="border border-solid border-[#333] px-4 py-2"
            placeholder="Last name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border border-solid border-[#333] px-4 py-2"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-bold">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="border border-solid border-[#333] px-4 py-2"
            placeholder="123-456-7890"
          />
        </div>
        <div className="col-span-2 flex justify-end items-start">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-sky-700 font-bold text-white hover:bg-sky-400 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
