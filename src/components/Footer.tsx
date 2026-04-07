import Image from "next/image";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/mad_doggrooming/",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/mad.dog.grooming.2023/",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown-light py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Mad Dog Grooming"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-[var(--font-playfair)] text-cream font-bold text-lg">
              Mad Dog Grooming
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#about" className="text-cream-dark/60 text-sm hover:text-gold-light transition-colors">About</a>
            <a href="#services" className="text-cream-dark/60 text-sm hover:text-gold-light transition-colors">Services</a>
            <a href="#why-us" className="text-cream-dark/60 text-sm hover:text-gold-light transition-colors">Why Us</a>
            <a href="#faq" className="text-cream-dark/60 text-sm hover:text-gold-light transition-colors">FAQ</a>
            <a href="#contact" className="text-cream-dark/60 text-sm hover:text-gold-light transition-colors">Contact</a>
          </nav>

          <p className="text-cream-dark/40 text-sm">
            &copy; {year} Mad Dog Grooming. All rights reserved.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-cream-dark/10 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dark/60 text-sm hover:text-gold-light transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
          <p className="text-cream-dark/40 text-xs">
            Professional dog grooming in Portland, Oregon. Serving the greater Portland metro area.
          </p>
        </div>
      </div>
    </footer>
  );
}
