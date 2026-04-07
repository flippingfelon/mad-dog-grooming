const dogs = [
  {
    name: "Milo",
    breed: "Goldendoodle",
    size: "Medium",
    owner: "Sarah J.",
    lastVisit: "2026-04-01",
    notes: "Hand scissor trim, blueberry facial, low dryer noise tolerance.",
  },
  {
    name: "Luna",
    breed: "Shih Tzu",
    size: "Small",
    owner: "Chris M.",
    lastVisit: "2026-03-28",
    notes: "Sanitary trim + nail grind. Prefers breaks during face trim.",
  },
  {
    name: "Rocky",
    breed: "German Shepherd",
    size: "Large",
    owner: "Maria P.",
    lastVisit: "2026-03-22",
    notes: "De-shed treatment. Sensitive around rear paws.",
  },
];

export default function DogProfilesPage() {
  return (
    <main className="min-h-screen bg-amber-50 px-4 py-10 text-gray-900">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Internal Dashboard (V1)
          </p>
          <h1 className="mt-2 text-3xl font-bold">Dog Profiles + Grooming Notes</h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-600">
            This first slice gives Mad Dog Grooming a clean place to track each dog,
            what was done, and what to remember next visit. Next step is wiring this
            screen to Supabase so records are saved and searchable.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {dogs.map((dog) => (
            <article
              key={dog.name}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{dog.name}</h2>
                  <p className="text-sm text-gray-600">
                    {dog.breed} • {dog.size}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  Last visit: {dog.lastVisit}
                </span>
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="font-medium text-gray-800">Owner</dt>
                  <dd className="text-gray-600">{dog.owner}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-800">Grooming notes</dt>
                  <dd className="text-gray-600">{dog.notes}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
