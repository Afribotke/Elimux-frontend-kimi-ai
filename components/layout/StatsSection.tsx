"use client";

export function StatsSection() {
  const stats = [
    { value: "500+", label: "Institutions" },
    { value: "10,000+", label: "Programs" },
    { value: "50,000+", label: "Students Helped" },
    { value: "100+", label: "Scholarships" },
  ];

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

