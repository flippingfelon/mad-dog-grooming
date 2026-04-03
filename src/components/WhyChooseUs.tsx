const reasons = [
  {
    title: "One Dog at a Time",
    description:
      "Your dog gets my full, undivided attention. No cages, no waiting, no distractions. Just focused, calm grooming from start to finish.",
    color: "bg-gold/15 text-gold-dark",
  },
  {
    title: "Detailed Dog Profiles",
    description:
      "Every dog gets a profile with grooming notes, preferences, coat history, and special needs. We pick up exactly where we left off every time.",
    color: "bg-green/15 text-green",
  },
  {
    title: "Stress-Free Experience",
    description:
      "We go at your dog's pace. Nervous pups get extra patience and positive reinforcement. The goal is a dog who actually likes getting groomed.",
    color: "bg-pink/40 text-red",
  },
  {
    title: "Easy Online Booking",
    description:
      "Schedule your appointments online, get reminders before each visit, and pay securely with your card. Simple and convenient.",
    color: "bg-gold-light/30 text-brown",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-brown py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <span className="text-gold-light font-bold uppercase tracking-widest text-sm">Why Mad Dog</span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">
            What Makes Us Different
          </h2>
          <p className="mx-auto max-w-2xl text-cream-dark/80 text-lg">
            Mad Dog Grooming isn&apos;t a factory. It&apos;s a personal grooming
            studio where your dog is the only client that matters.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl bg-brown-light/50 p-8 border border-gold-light/10"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${reason.color} mb-4`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cream mb-3">{reason.title}</h3>
              <p className="text-cream-dark/70 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
