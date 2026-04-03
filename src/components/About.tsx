export function About() {
  return (
    <section id="about" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold font-bold uppercase tracking-widest text-sm">About Mad Dog</span>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-brown mt-3 mb-6">
              Where Every Dog Is Treated Like Family
            </h2>
            <p className="text-brown-light text-lg leading-relaxed mb-6">
              Mad Dog Grooming is a solo-operated grooming studio in Portland, Oregon,
              built on the belief that every dog deserves calm, personal attention.
              No assembly lines. No rushed sessions. Just one groomer, one dog, and
              all the time it takes to do things right.
            </p>
            <p className="text-brown-light text-lg leading-relaxed mb-6">
              Each pup gets a detailed profile with grooming notes so we remember
              exactly how they like it — from their favorite brush to their tricky spots.
              We track preferences, coat history, and special needs so every visit
              picks up right where the last one left off.
            </p>
            <p className="text-brown-light text-lg leading-relaxed">
              Whether your dog is a first-time groomer or a seasoned spa regular,
              they&apos;ll leave looking sharp, feeling fresh, and already excited
              to come back.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-cream p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gold mb-1">1-on-1</div>
              <div className="text-sm font-semibold text-brown-light uppercase tracking-wide">Personal Attention</div>
            </div>
            <div className="rounded-2xl bg-cream p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green mb-1">100%</div>
              <div className="text-sm font-semibold text-brown-light uppercase tracking-wide">Stress-Free Focus</div>
            </div>
            <div className="rounded-2xl bg-cream p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-red mb-1">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <div className="text-sm font-semibold text-brown-light uppercase tracking-wide">Made with Love</div>
            </div>
            <div className="rounded-2xl bg-cream p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-gold-dark mb-1">PDX</div>
              <div className="text-sm font-semibold text-brown-light uppercase tracking-wide">Portland Local</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
