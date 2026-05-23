export type PillarId = "moving" | "eating" | "living";

export type Pillar = {
  id: PillarId;
  title: string;
  subtitle: string;
  image: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    id: "moving",
    title: "MOVE WELL",
    subtitle: "personal training",
    image: "/images/pillar-move.jpg",
    description:
      "How well does your body move? Think about it, carefully. Many fitness programs promote weight loss, muscle gain, a better body, etc. We also recognize those goals as important. However, in terms of quality of life, there is a far more important goal, and that is optimizing your body's ability to function. If you succeed at enhancing your body on the outside but do damage beneath the surface in the process, what have you truly achieved? We strongly recommend that you focus on body performance. Our \"Move Well\" personal training program ensures superior results in performance and appearance.",
  },
  {
    id: "eating",
    title: "EAT WELL",
    subtitle: "guidance",
    image: "/images/pillar-eat.jpg",
    description:
      "Food is to be enjoyed. Certainly there is a degree of discipline in consumption of food, both quality and quantity, but when we strike the right balance of pleasure and control, nutrition plans are sustainable and can become automatic. A key component to success is finding the right balance for YOU. As individuals, our circumstances are unique. Your approach to food, if it is to serve you well, must take personal preferences into account. Our \"Eat Well\" guidance plan focuses on you and your lifestyle while building a sound foundation of purposeful and pleasurable eating for a lifetime of enjoyment.",
  },
  {
    id: "living",
    title: "LIVE WELL",
    subtitle: "coaching",
    image: "/images/pillar-live.jpg",
    description:
      "Living well is an art and science. Happiness is a perpetual pursuit rather than final destination. Overcoming challenges and celebrating successes are inherent in life's journey, as one cannot exist without the other. Our proactive coaching strives to forecast potential obstacles for efficient goal achievement. Our problem-solving methods focus on gaining clarity through distinguishing perception versus reality for swift resolution. Family, friends and mentors can be a terrific source of guidance. Our \"Live Well\" coaching program is a source of insight and an adjunct to your core support system.",
  },
];

export const pillarLabels: Record<PillarId, string> = {
  moving: "Moving Well",
  eating: "Eating Well",
  living: "Living Well",
};
