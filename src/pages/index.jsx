import React from "react";
import HeroSlider from "../components/sliders/heroSlider";
import ProductsSection from "../components/products/productsSection";
import StepsSection from "../components/steps/stepsSection";
import ClientsSection from "../components/clients/clientsSection";
import Testimonials from "../components/testimonials/testimonials";
import AnimateOnScroll from "../components/animations/AnimateOnScroll";

const Home = () => {
  return (
    <>
      {/* Slider start */}
      <HeroSlider />
      {/* Slider end */}

      {/* About us */}

      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src="/img/about.jpg"
              alt="About Amul Packaging"
              className="w-full h-auto object-cover"
            />
          </div>

          <AnimateOnScroll
            as="div"
            className="w-full lg:w-1/2 bg-primary text-white px-6 sm:px-10 md:px-20 py-6 sm:py-8 md:py-10 flex flex-col justify-center"
            variant="fadeUp"
            stagger={0.15}
            once={true}
            start="top 80%"
            itemsSelector="h1, h4, p, button"
          >
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">
              About Us
            </h1>
            <h4 className="text-2xl sm:text-3xl md:text-3xl text-secondary font-bold mb-4">
              One Stop Solution For All Your Brand Packaging Requirements
            </h4>
            <p className="text-white-700 text-lg font-medium">
              Amul packaging offers rotogravure, flexographic & digital flexible
              packaging enhancing tamper evidence, security & shelf appeal to
              consumers worldwide. We are now one of the leading manufacturers
              of stock packaging products in various formats like stand-up
              Pouches, zipper pouches, tape bags, laminated pouches, etc.
            </p>
            <button className="mt-6 px-6 py-2 bg-white text-primary font-semibold rounded-full shadow hover:bg-yellow-400 transition-colors duration-200 w-max">
              Read More
            </button>
          </AnimateOnScroll>
        </div>
      </div>

      {/* about us end */}

      {/* Why Us start */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimateOnScroll
            as="div"
            variant="fadeIn"
            stagger={0.15}
            once={true}
            start="top 80%"
            itemsSelector="h2, p"
          >
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-4xl  font-bold text-blue-900 mb-2">
              Why Us
            </h2>
            <p className="text-2xl sm:text-3xl md:text-3xl  font-semibold text-blue-800 mb-4">
              We Make Brand Communication Easier Through <br /> Our Innovative
              Packaging
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">
              Amul packaging provides you with the optimum solution that you are
              looking for, to promote your brand or product. Along with 30 years
              of experience, we have collaborated with diversified sectors and
              brands.
            </p>
          </AnimateOnScroll>

          {/* Cards Section */}
          <AnimateOnScroll
            as="div"
            className="grid grid-cols-1 md:grid-cols-3 gap-0"
            variant="zoomIn"
            stagger={0.15}
            once={true}
            start="top 80%"
            itemsSelector="div"
          >
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#ec2a4f]  rounded-lg mb-4 p-6 ">
                <img src="/img/quality.png" alt="quality" width={80} />
              </div>
              <h3 className="font-bold text-lg">
                Quality And <br /> Innovative Packaging
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                We innovate what leads your product’s identity
              </p>
            </div>

            <div className="flex flex-col items-center mt-6 sm:mt-0 md:mt-0">
              <div className="bg-[#ec2a4f]  rounded-lg mb-4 p-6 ">
                <img src="/img/experience.png" alt="quality" width={80} />
              </div>
              <h3 className="font-bold text-lg">Experienced</h3>
              <p className="text-gray-600 mt-2 text-sm">
                We are leading the industry for 3 decades
              </p>
            </div>

            <div className="flex flex-col items-center mt-6 sm:mt-0 md:mt-0">
              <div className="bg-[#ec2a4f]  rounded-lg mb-4 p-6 ">
                <img src="/img/Sustainable.png" alt="quality" width={80} />
              </div>
              <h3 className="font-bold text-lg">Sustainable</h3>
              <p className="text-gray-600 mt-2 text-sm">
                We design with a conscious mindset about the environment
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      {/* Why Us end */}

      {/* what we do start */}
      <section>
        <div className=" mx-auto  ">
          <div className="flex flex-col lg:flex-row">
            <AnimateOnScroll
              as="div"
              className="w-full lg:w-1/2 bg-primary text-white px-6 sm:px-10 md:px-20 py-6 sm:py-8 md:py-10 flex flex-col justify-center"
              variant="fadeUp"
              stagger={0.15}
              once={true}
              start="top 80%"
              itemsSelector="h1, h4, p, button"
            >
              <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold  mb-4">
                What We Do
              </h1>
              <h4 className="text-2xl sm:text-3xl md:text-3xl text-secondary font-bold mb-4">
                End-to-end flexible packaging solutions for various applications
                and industries
              </h4>
              <p className=" text-white-700 text-lg font-medium">
                At Thakkar Flexipack, we have been redefining flexible packaging
                for 12+ years with a commitment to quality, innovation, and
                precision. Since inception, we have grown into a trusted name in
                the industry, delivering premium packaging solutions that
                enhance product shelf life, brand appeal, and functionality.
                With state-of-the-art in-house facilities, we offer tailor-made
                packaging solutions across major industries, while being
                pioneers in dry fruits, tea & coffee, snacks, frozen foods,
                pharmaceuticals, and agrochemicals.
              </p>
            </AnimateOnScroll>

            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <img
                src="/img/whatwedo.jpg"
                alt="What we do"
                className=" w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* what we do end */}

      {/* products start */}
      <section className="pt-[10%]  xl:pt-[4%] 2xl:pt-[4%] 2xl:pb-[2%]  bg-white text-center ">
        <div className="">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold  mb-4">
            Our Products
          </h1>
        </div>
        <ProductsSection />
      </section>

      {/* products end */}

      {/* Steps Start */}
      <section className="bg-blue-900 px-[20px] py-[18%] sm:px-[20px] md:py-[8%] lg:py-[8%] xl:py-[10%] 2xl:py-[7%]  relative">
        <div className="max-w-7xl w-full mx-auto   grid grid-cols-1 md:grid-cols-3 gap-8 xl:absolute md:left-1/2 xl:-translate-x-1/2 xl:-translate-y-[50px]  ">
          <StepsSection />
        </div>
      </section>

      {/* Steps end */}

      {/* clients Start */}

      <section className="pt-[10%]  xl:pt-[18%] 2xl:pt-[8%]  bg-white text-center ">
        <div className="border-b-2 border-[#f1f1f1]">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold  mb-4">
            Trusted By Brand Like
          </h1>
        </div>
        <ClientsSection />
      </section>
      {/* clients end */}

      {/* Testimonials start */}
      <section className="mb-[8%] xl:mb-[18%] 2xl:mb-[12%]  mt-16 pt-[6%]  pb-[14%] bg-secondary text-center relative">
        <div className="w-full xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-[50px]">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold  mb-4">
            Testimonials
          </h1>
          <h4 className="text-2xl sm:text-3xl md:text-3xl text-black font-bold mb-4">
            {" "}
            Our client said
          </h4>
        </div>
        <Testimonials />
      </section>
      {/* Testimonials end */}
    </>
  );
};

export default Home;
