'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; // Assurez-vous que ce composant ne nécessite pas de `children`
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, ButtonGroup, Button } from 'react-bootstrap';

export default function IntranetLayout() {
  const [activeItem, setActiveItem] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string>('');
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const carouselItems = document.querySelectorAll('.carousel-item');
      const activeIndex = Array.from(carouselItems).findIndex((item) =>
        item.classList.contains('active')
      );
      const nextIndex = (activeIndex + 1) % carouselItems.length;
      carouselItems[nextIndex].scrollIntoView({ behavior: 'smooth' });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-['Roboto']">
      {/* Navbar */}
      <Navbar />
      {/* Bouton Menu placé en dehors du composant Navbar */}
      

      {/* Main Content */}
      <main className="d-flex flex-column flex-lg-row justify-content-center w-100 m-2" style={{ marginTop: '5rem' }}>
        {/* Sidebar */}
        <nav className={`bg-white shadow-lg p-lg-5 ${showSidebar ? 'd-block' : 'd-none'}`} style={{ width: '100%', maxWidth: '300px' }}>
          <div className="d-flex flex-column gap-4">
            {[
              "Direction de l'exploitation lorem ipsum altare ipsum lorem",
              "Direction des systèmes d’informations lorem ipsum altare ipsum lorem",
              "Direction de l'exploitation lorem ipsum altare ipsum lorem",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleClick(item)}
                className={`btn w-100 text-left px-4 py-3 rounded-3 transition-all duration-300 
                  ${activeItem === item ? 'text-success bg-light' : 'text-dark'} 
                  hover:bg-success hover:text-white`}
                style={{ fontSize: '18px' }}
              >
                {item}
              </button>
            ))}

            {/* Espace Personnel Button */}
            <a href="/auth/login">
              <button
                className="btn btn-success w-100 text-black text-left px-3 py-2 rounded-3"
                style={{ backgroundColor: '#28a745' }}
              >
                Espace Personnel
              </button>
            </a>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ width: '100%' }}>
          <div className="text-center w-100 m-3">
            {/* Trois Boutons */}
            <div className="d-flex gap-4 mb-4 justify-content-center w-100 flex-wrap">
              <ButtonGroup className="d-flex flex-column flex-sm-row w-100 mr-2">
                {['Charte Informatique', 'Organigramme', 'Code Ethique'].map((button) => (
                  <Button
                    key={button}
                    className={`btn ${activeButton === button ? 'btn-success' : 'btn-success'} text-white px-5 py-3 rounded-3 transition-all duration-300`}
                    style={{ fontSize: '18px', padding: '15px 30px', margin: '10px' }}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button}
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            {/* Carousel */}
            <div className="w-100" style={{ height: 'auto', overflow: 'hidden' }}>
              <Carousel style={{ width: '100%' }} interval={5000}>
                <Carousel.Item style={{ width: '100%' }}>
                  <img
                    className="d-block w-100 h-auto object-fit-cover"
                    src="/images/banner1.png"
                    alt="First slide"
                    style={{ objectFit: 'cover', width: '100%', height: '500px' }}
                  />
                </Carousel.Item>
                <Carousel.Item style={{ width: '100%' }}>
                  <img
                    className="d-block w-100 h-auto object-fit-cover"
                    src="/images/banner1.png"
                    alt="Second slide"
                    style={{ objectFit: 'cover', width: '100%', height: '500px' }}
                  />
                </Carousel.Item>
                <Carousel.Item style={{ width: '100%' }}>
                  <img
                    className="d-block w-100 h-auto object-fit-cover"
                    src="/images/banner1.png"
                    alt="Third slide"
                    style={{ objectFit: 'cover', width: '100%', height: '500px' }}
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
