import { TestimonialItem } from '../types';

export interface ExtendedTestimonialItem extends TestimonialItem {
  initial: string;
}

export const testimonials: ExtendedTestimonialItem[] = [
  {
    text: "Granite Gallery supplied the entire marble for our 5-star hotel lobby. The quality of Calacatta Gold was exceptional — perfect veining, consistent slab thickness, and delivered on time.",
    author: "Rajesh Mehta",
    role: "Lead Architect, Mehta & Partners",
    initial: "R"
  },
  {
    text: "We've imported three containers of Black Galaxy and White Statuario for our projects in UAE. The export packaging was impeccable and the quality certificates helped us clear customs smoothly.",
    author: "Ahmed Al-Rashid",
    role: "Interior Contractor, Dubai",
    initial: "A"
  },
  {
    text: "Best pricing I've found for Italian marble in Kishangarh, with absolutely no compromise on quality. The team helped us choose the right stone for our villa flooring. Highly recommended.",
    author: "Sunita Sharma",
    role: "Homeowner, Jaipur",
    initial: "S"
  },
  {
    text: "As an interior designer, I've worked with dozens of stone suppliers. Granite Gallery stands out for their curated selection of exotic stones and their willingness to provide samples.",
    author: "Priya Nair",
    role: "Interior Designer, Mumbai",
    initial: "P"
  },
  {
    text: "The exotic stone collection is unmatched. We used Rainforest Brown for our penthouse kitchen and it's become the center of attraction for every guest.",
    author: "Vikram Singh",
    role: "Business Owner",
    initial: "V"
  }
];
