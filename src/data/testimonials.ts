import { TestimonialItem } from '../types';

export interface ExtendedTestimonialItem extends TestimonialItem {
  initial: string;
}

export const testimonials: ExtendedTestimonialItem[] = [
  {
    text: "Granite Gallery supplied the entire stone for our luxury hotel lobby. The quality of their imported Italian marble was exceptional — perfect veining, consistent slab thickness, and delivered on schedule.",
    author: "Rajesh Mehta",
    role: "Architect / Designer, New Delhi",
    initial: "R"
  },
  {
    text: "We imported full consignments of gangsaw granite and imported marble for our commercial projects in UAE. The export packaging was impeccable and the quality certificates helped us clear customs smoothly.",
    author: "Ahmed Al-Rashid",
    role: "Contractor / Builder, Dubai",
    initial: "A"
  },
  {
    text: "Best pricing I've found for Italian marble in Kishangarh, with absolutely no compromise on quality. The team helped us choose the right stone for our villa flooring. Highly recommended.",
    author: "Sunita Sharma",
    role: "Homeowner, Jaipur",
    initial: "S"
  },
  {
    text: "As an interior designer, I've worked with dozens of stone suppliers. Granite Gallery stands out for their curated selection of exotic stones and their willingness to provide physical design samples.",
    author: "Priya Nair",
    role: "Architect / Designer, Mumbai",
    initial: "P"
  },
  {
    text: "The exotic stone collection is unmatched. We used exotic quartzite for our penthouse kitchen and it has become the centerpiece of our home.",
    author: "Vikram Singh",
    role: "Business Owner, Delhi",
    initial: "V"
  }
];
