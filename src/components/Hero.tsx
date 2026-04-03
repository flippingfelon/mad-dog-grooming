import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-32">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C2118' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto mb-8 w-56 h-56 md:w-72 md:h-72 relative">
          <Image
            src="/logo.jpeg"
            alt="Mad Dog Grooming - Professional Dog Grooming in Portland, Oregon"
            fill
            className="rounded-full object-cover shadow-2xl border-4 border-gold-light/50"
            priority
          />
        </div>

        <h1 className="font-[var(--font-playfair)] text-4xl md:text-6xl font-bold text-brown leading-tight mb-6">
          Your Pup Deserves the{" "}
          <span className="text-gold">Royal Treatment</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg md:text-xl text-brown-light leading-relaxed mb-10">
          Professional, one-on-one dog grooming in Portland, Oregon.
          Every dog gets personalized attention, detailed grooming notes,
          and leaves looking and feeling their absolute best.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-gold px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-gold-dark hover:shadow-xl transition-all"
          >
            Book an Appointment
          </a>
          <a
            href="#services"
            className="rounded-full border-2 border-brown/20 px-8 py-4 text-lg font-bold text-brown hover:border-gold hover:text-gold-dark transition-all"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}
