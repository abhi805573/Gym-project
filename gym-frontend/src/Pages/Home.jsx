import React from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Hero from "../Components/home/Hero";
import Features from "../Components/home/Features";
import DescriptionOne from "../Components/home/DescriptionOne";
import DescriptionTwo from "../Components/home/DescriptionTwo";
import FeaturesTwo from "../Components/home/FeaturesTwo";
import ContactForm from "../Components/home/ContactForm";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <DescriptionOne />
      <DescriptionTwo />
      <FeaturesTwo />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
