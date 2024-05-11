import person1 from "../../../public/person1.png";
import person2 from "../../../public/person2.jpeg";
import person3 from "../../../public/person3.jpeg";
import FancyTestimonialsSlider from "./testimonial-slider";
export default function FancyTestimonialsSliderPage() {
  const autorotateTiming: number = 7000;

  const testimonials = [
    {
      img: person1,
      quote:
        "I found my soulmate through this platform. It's incredible how love finds its way when you least expect it.",
      name: "Jessie J",
      role: "Acme LTD",
    },
    {
      img: person2,
      quote:
        "Meeting my life partner here was a dream come true. Thank you for bringing us together!",
      name: "Nick V",
      role: "Malika Inc.",
    },
    {
      img: person3,
      quote:
        "I never believed in love at first sight until I met my partner here. Every moment with them is a blessing.",
      name: "Amelia W",
      role: "Panda AI",
    },
  ];

  return <FancyTestimonialsSlider testimonials={testimonials} />;
}
