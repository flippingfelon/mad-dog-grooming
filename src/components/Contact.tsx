export function Contact() {
  return (
    <section id="contact" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-brown p-10 md:p-16 text-center">
          <span className="text-gold-light font-bold uppercase tracking-widest text-sm">Get in Touch</span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">
            Ready to Book Your Pup&apos;s Next Groom?
          </h2>
          <p className="mx-auto max-w-2xl text-cream-dark/80 text-lg mb-10">
            Reach out to schedule an appointment, ask about services, or just
            say hi. We&apos;d love to meet your dog.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="rounded-2xl bg-brown-light/50 p-6 border border-gold-light/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/20 text-gold mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="text-cream font-bold mb-1">Phone</h3>
              <p className="text-cream-dark/70">Coming soon</p>
            </div>

            <div className="rounded-2xl bg-brown-light/50 p-6 border border-gold-light/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink/30 text-pink mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-cream font-bold mb-1">Email</h3>
              <p className="text-cream-dark/70">hello@mad-dog-grooming.com</p>
            </div>

            <div className="rounded-2xl bg-brown-light/50 p-6 border border-gold-light/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green/20 text-green mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-cream font-bold mb-1">Location</h3>
              <p className="text-cream-dark/70">Portland, Oregon</p>
            </div>
          </div>

          <a
            href="mailto:hello@mad-dog-grooming.com"
            className="inline-block rounded-full bg-gold px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-gold-dark hover:shadow-xl transition-all"
          >
            Contact Us to Book
          </a>
        </div>
      </div>
    </section>
  );
}
