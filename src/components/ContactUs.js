import Footer from "./Footer";

const ContactUs = () => {
  return (
    <div>
      <div className=" flex">
        <div className=" py-56 px-8 m-4">
          <p className="font-bold text-xl">
            If you wish to withdraw your consent for the use and disclosure of
            your personal information in the manner provided in this Policy or
            you want your data to be deleted, please write to us at &nbsp;
            <span className="text-orange-500 cursor-pointer">
              support@hellofood.in
            </span>
          </p>
        </div>
        <div className="w-6/12 p-8">
          <img src="https://pngfile.net/public/uploads/preview/flying-burger-png-image-11703410842ovsg23xhhr.png"></img>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
