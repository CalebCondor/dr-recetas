import Image from "next/image";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Lorem ipsum dolor amet ipiscing elit elusmod tempor lorem ipsum incididunt.",
    author: "Herman miller",
    role: "Chief financial",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor amet ipiscing elit elusmod tempor lorem ipsum incididunt.",
    author: "Shoko mugikura",
    role: "Financial manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor amet ipiscing elit elusmod tempor lorem ipsum incididunt.",
    author: "Matthew taylor",
    role: "Office manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 text-balance">
            Clientes satisfechos confían con Dr.Recetas
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center">
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm min-h-40 flex items-center justify-center">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {testimonial.text}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {testimonial.author}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
