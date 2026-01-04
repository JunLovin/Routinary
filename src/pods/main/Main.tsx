import Header from "./components/Header";
import Hero from "./sections/Hero";

export default function Main() {
  return (
  <>
      <main className="flex flex-col font-inter">
        <div className="header w-full h-26 fixed top-0 z-10 flex items-center justify-center">
          <Header />
        </div>
        <section className="main-content flex flex-col min-h-dvh">
          <Hero />
        </section>
      </main>
  </>
  )
}
