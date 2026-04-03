const services = [
  {
    name: "Full Groom",
    description:
      "Complete grooming session including bath, blow-dry, haircut, nail trim, ear cleaning, and finishing touches. Tailored to your dog's breed and your style preferences.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    name: "Bath & Brush",
    description:
      "A deep-clean bath with premium shampoo and conditioner, thorough blow-dry, brush-out, nail trim, and ear cleaning. Perfect between full grooms.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    name: "Puppy's First Groom",
    description:
      "A gentle introduction to grooming for puppies. We go slow, keep it positive, and build their confidence so they love coming back. Includes mini bath, light trim, and nail clip.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    name: "Nail Trim & Touch-Up",
    description:
      "Quick nail trim, ear cleaning, and a light brush-out to keep your pup tidy between full appointments. Walk-ins welcome when available.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
      </svg>
    ),
  },
  {
    name: "De-Shedding Treatment",
    description:
      "Specialized bath and blow-out designed to dramatically reduce shedding. Uses professional de-shedding tools and conditioners to remove loose undercoat.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: "Breed-Specific Styling",
    description:
      "Expert cuts for specific breeds — poodles, doodles, schnauzers, spaniels, and more. We know the standard cuts and can customize to your preference.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.26m0 0l3.1-4.61m-3.1 4.61l-5.1 3.26m10.2-6.52l5.1 3.26m0 0l-3.1 4.61m3.1-4.61l5.1-3.26" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold uppercase tracking-widest text-sm">Services</span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-brown mt-3 mb-4">
            Grooming Services for Every Pup
          </h2>
          <p className="mx-auto max-w-2xl text-brown-light text-lg">
            From a quick nail trim to a full breed-specific styling session,
            every service is delivered with patience, skill, and genuine love for dogs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="group rounded-2xl bg-warm-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gold-light/20"
            >
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pink/40 text-red group-hover:bg-gold/20 group-hover:text-gold-dark transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-brown mb-3">{service.name}</h3>
              <p className="text-brown-light leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-brown-light text-lg mb-4">
            Not sure which service is right for your dog?
          </p>
          <a
            href="#contact"
            className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-white shadow-md hover:bg-gold-dark transition-colors"
          >
            Let&apos;s Figure It Out Together
          </a>
        </div>
      </div>
    </section>
  );
}
