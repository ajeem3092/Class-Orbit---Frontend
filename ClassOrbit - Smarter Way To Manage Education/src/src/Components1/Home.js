import React from 'react';
import { Carousel } from 'react-bootstrap';
import NavBar from './NavBar';

const CarouselContainer = () => {
  return (
    <div>
        <NavBar></NavBar>
    <Carousel fade={false} pause={false} style={{width:"70%", marginLeft:"15%", paddingTop:"5%"}}>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100" style={{height:"550px"}}
          src="/image/1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/2.jpg"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/4.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/5.jpg"
          alt="Fifth slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/6.jpg"
          alt="Sixth slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/7.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"style={{height:"550px"}}
          src="/image/in.jpg"
          alt="Eighth slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default CarouselContainer;