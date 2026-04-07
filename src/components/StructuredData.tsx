const socialProfiles = [
  "https://www.instagram.com/mad_doggrooming/",
  "https://www.facebook.com/mad.dog.grooming.2023/",
];

export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "PetGrooming",
    name: "Mad Dog Grooming",
    description:
      "Professional, personalized dog grooming services in Portland, Oregon. Every pup gets one-on-one attention, detailed grooming notes, and a stress-free experience.",
    url: "https://mad-dog-grooming.com",
    logo: "https://mad-dog-grooming.com/logo.jpeg",
    image: "https://mad-dog-grooming.com/logo.jpeg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Portland",
      addressRegion: "OR",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "45.5152",
      longitude: "-122.6784",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "45.5152",
        longitude: "-122.6784",
      },
      geoRadius: "30",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
    email: "madalyn@mad-dog-grooming.com",
    sameAs: socialProfiles,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book an appointment at Mad Dog Grooming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book online through our scheduling system or reach out directly via phone, email, or the contact form on our website. We'll confirm your appointment and send you a reminder before your visit.",
        },
      },
      {
        "@type": "Question",
        name: "What should I bring to my dog's first grooming appointment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Just bring your pup and any info about their grooming history or special needs. We'll create a detailed profile for your dog during the first visit so we always know exactly how to take care of them.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a full dog groom take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most full grooms take between 1.5 to 3 hours depending on your dog's size, coat type, and condition. We never rush — your dog gets all the time they need for a calm, thorough groom.",
        },
      },
      {
        "@type": "Question",
        name: "Do you groom all dog breeds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We groom all breeds, sizes, and coat types. From goldendoodles to German shepherds, poodles to pit bulls — every dog is welcome at Mad Dog Grooming.",
        },
      },
      {
        "@type": "Question",
        name: "What if my dog is anxious during grooming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We specialize in patient, stress-free grooming. Nervous or reactive dogs get extra time, positive reinforcement, and breaks when needed. We'll work with you to make grooming a positive experience over time.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods does Mad Dog Grooming accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept all major credit and debit cards through our secure online payment system. Payment is easy and handled at the time of booking or after your appointment.",
        },
      },
      {
        "@type": "Question",
        name: "How often should my dog be groomed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the breed and coat type. Most dogs benefit from a full groom every 4-8 weeks, with bath-and-brush sessions in between. We'll recommend a schedule that works for your dog during their first visit.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mad Dog Grooming",
    url: "https://mad-dog-grooming.com",
    description:
      "Professional dog grooming services in Portland, Oregon.",
    publisher: {
      "@type": "Organization",
      name: "Mad Dog Grooming",
      logo: {
        "@type": "ImageObject",
        url: "https://mad-dog-grooming.com/logo.jpeg",
      },
      sameAs: socialProfiles,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
