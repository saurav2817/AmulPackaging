import React from "react";

const steps = [
  {
    id: "01",
    title: "Pick Your Packaging",
    description:
      "We have a wide range of options from laminated printed rolls, center seal pouches, three side seal pouches, side gazzeted pouches, standee zippers, vaccum pouches, shaped pouches, poly bags, magazine covers, tape bags, security bags, to ziplock bags and many more.",
  },
  {
    id: "02",
    title: "Packaging In Process",
    description:
      "As we service diverse sectors such as FMCG items, consumer products, pharmaceuticals, seeds, fertilizer, spices, autos, personal & home care, and many more, based on the nature of demand, the timing would range from product to product.",
  },
  {
    id: "03",
    title: "Ready To Ship",
    description:
      "Your product is now prepared to be shipped in the proper packaging. With developing technology, we are fulfilling the ever-changing needs with a judicious mix of quality, economics, and ecological considerations.",
  },
];

const StepsSection = () => {
  return (
      <>
         {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white rounded-md mt-[10%] sm:mt-[10%] md:mt-[0]  p-6 relative shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          >
            {/* Circle Step Number */}
            <div className="absolute -top-12 left-8 flex items-center">
              <div className="w-18 h-18 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white">
                {step.id}
              </div>
              <span className="ml-2 text-white font-bold text-2xl">STEP</span>
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className="text-blue-900 font-bold text-lg">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </>
  );
};

export default StepsSection;
