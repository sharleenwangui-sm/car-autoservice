import { Star } from "lucide-react";
import { SectionTitle, Card } from "../ui";

const testimonials = [
  {
    rating: 5,
    text: '"Best service in town! My SUV feels brand new after the alignment. The digital inspection report was incredibly helpful for planning future maintenance."',
    author: "Johnathan Davis",
    role: "BMW X5 Owner",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
  {
    rating: 5,
    text: '"Finally found an honest shop. They didn\'t push any unnecessary repairs and the green theme of the lobby is actually very calming!"',
    author: "Sarah Miller",
    role: "Tesla Model 3 Owner",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    rating: 5,
    text: '"Fast AC repair during a heatwave. They squeezed me in last minute and had me back on the road in under two hours. Highly recommend."',
    author: "Michael Reed",
    role: "Ford F-150 Owner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "fill-primary text-primary" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="What Our Drivers Say" centered className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-gray-50 border border-gray-100">
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 text-gray-700 italic text-sm leading-relaxed">
                {testimonial.text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
