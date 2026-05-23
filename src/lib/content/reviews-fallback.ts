export type StaticReview = {
  author: string;
  role: string;
  text: string;
  rating: number;
};

export const fallbackReviews: StaticReview[] = [
  {
    author: "Luann B.",
    role: "Wife, Mom, Nurse, Tennis Player",
    rating: 5,
    text: "After a back injury left me unable to continue the active lifestyle I once led, I knew I needed to change things. I had never weight trained, and frankly was intimidated by it, but after meeting with Chris I decided to give it a try. After 6 months I met my goals and have maintained them for 15 months. But most importantly, I'm back to the active lifestyle I love! Thanks Wellness Zone for your patience and support this past year.",
  },
  {
    author: "Margie Pabst",
    role: "Wife, Friend, Philanthropist, Traveler, Performing Arts",
    rating: 5,
    text: "I've been exercising over the last 17 years at the Wellness Zone with Nick Rao. I look forward to these sessions every week because the rewards, both physically and emotionally, are huge! My primary care physician always comments on the perfect blood pressure. Nick is really fun, and I like how I feel when I look in the mirror. Nick trains for your life functionality, so I am always pleased when I bend over easily to pick up something, reach up in a cupboard and stand up from a chair without struggling. I am a happy exerciser!",
  },
  {
    author: "Kaley Kallman",
    role: "Daughter, Sister, Friend, Entrepreneur, Adventurer",
    rating: 5,
    text: "The Wellness Zone isn't just a gym, it's a result-driven team of experts committed to your fitness journey. Whether your goal is to lose weight, gain muscle, become a better athlete, or recover from an injury, the trainers can adjust your exercise routine and nutrition program to help you get there. After breaking my collar bone, Alex was patient and methodical. He worked with me to regain mobility and strength throughout my recovery and now I am in better shape than ever.",
  },
];
