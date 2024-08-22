import { FaQuoteLeft } from "react-icons/fa";
import Footer from "./Footer";
const About = () => {
  return (
    <div>
      <div className=" bg-orange-600 font-bold-thin text-left text-2xl text-white">
        <p className=" px-10 py-10 mt-2 text-4xl">
          <FaQuoteLeft className="text-4xl" /> <br />
          Our mission is to elevate the quality of life for the urban consumer
          with unparalleled convenience. Convenience is what makes us tick. It's
          what makes us get out of bed and say,
          <br />
          "Let's do this."
        </p>
      </div>

      <div className=" text-center py-6 ">
        <h1 className="py-8 text-5xl font-semibold">
          What’s In Store For The Future?
        </h1>
        <p className=" font-light text-lg">
          HelloFood has grand plans to be India’s most loved hyperlocal player.
          It aims to be the most accessible <br></br>
          platform on the network - reimagining the meaning of convenience in
          the country through a <br></br>
          variety of service offerings.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
