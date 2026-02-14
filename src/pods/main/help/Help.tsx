export default function Help() {
  return (
    <>
      <div className="h-dvh p-4 w-full text-zinc-100 overflow-y-auto">
        <div className="h-full flex flex-col items-center justify-around text-center px-4">
          <div className="top flex flex-col items-center justify-center gap-6">
            <h1 className="font-semibold text-4xl text-center leading-normal">👋
          Hey, Need Any Help?</h1>

            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-md px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 ring-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
            />
          </div>
          <div className="help-articles flex h-140 flex-col items-start justify-start gap-6 w-full">
            <h2 className="text-2xl font-medium">Browse by Categories</h2>
            <div className="categories grid grid-cols-3 gap-6 w-full">
              {['Getting Started', 'Account Management', 'Troubleshooting', 'Best Practices'].map((category) => (
                <button
                  key={category}
                  className="w-full text-left bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
                >
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <p className="text-sm text-zinc-500 mt-1">Find articles related to {category.toLowerCase()}.</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
