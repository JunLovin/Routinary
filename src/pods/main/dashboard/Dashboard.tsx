export default function Dashboard() {
  return (
    <>
      <section className="new-chat h-full w-full flex flex-col items-center justify-center gap-10">
        <h2 className="text-slate-100 text-4xl font-semibold tracking-wide max-w-[45ch] mx-auto text-center">Small habits, big impact. What routine are we architecting today?</h2>
        <div className="input w-2xl bg-zinc-950 rounded-xl h-max">
          <textarea
            className="w-full resize-none min-h-24 rounded-xl p-4 outline-0 placeholder:text-zinc-600 text-zinc-100"
            placeholder="Write your perfect day"
          />
        </div>
      </section>
    </>
  );
}
