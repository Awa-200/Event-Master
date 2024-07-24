import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import aboutBanner1 from "../assets/4131003.jpg";
import aboutBanner2 from "../assets/4527834.jpg";
import productImage1 from "../assets/127717-OR2MXB-628.jpg"; 
import productImage2 from "../assets/153557-OV15FU-84.jpg";
import "../CSS/AboutComponent.css";

const AboutComponent = () => {
  const banners = [aboutBanner1, aboutBanner2];

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  //inquiry

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Replace "YOUR_ACCESS_KEY_HERE"
    formData.append("access_key", "1fccd6b1-b5f3-40eb-b89f-a982e01ddb3e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div className="about-section">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img src={banner} alt={`Banner ${index + 1}`} className="about-banner-image" />
          </div>
        ))}
      </Slider>
      <div className="about-content">
        <h2>About Us</h2>
        <p>Welcome to Event Master, We Manage All your Events </p>
        <div className="product-images">
          <img src={productImage1} alt="Product 1" className="product-image" />
          <img src={productImage2} alt="Product 2" className="product-image" />
        </div>
      </div>
      <br/>
      <div className="containerwe  ">
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <h1 className="mb-4 text-center">Send Your Feedback or Inquiries</h1>
          <form onSubmit={onSubmit} className="p-4 border rounded border-primary mb-3">
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input type="text" className="form-control border-primary" id="name" name="name" />
            </div>
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="email" className="form-label">Your Email address</label>
              <input type="email" className="form-control border-primary" id="email" name="email" />
            </div>
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea className="form-control border-primary" id="message" name="message" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-outline-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutComponent;
