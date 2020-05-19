import React , {Component} from "react";
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';

import "./Carousel.scss"

const st = {
    position: "relative" ,
    overflow: "hidden" ,
    width: "100%" ,
    height: "80vh" ,
};


const CarouselUI = ({ children }) => <div style={ st }>{children}</div>;
const Carousel = makeCarousel(CarouselUI);


class MyCarousel extends Component {
    render () {

        return  <div className={"scale-in-center"}>
                    <Carousel  defaultWait={4000} /*wait for 1000 milliseconds*/ >
                        <Slide right >
                            <div className={"slide_1"}>
                                <h1 className={"carousel-text-left"} >Put some text here SLIDE 1</h1>
                                {/*<p>Slide Description</p>*/}
                                {/*<h1>Slide 1</h1>*/}
                                {/*<p>Slide Description</p>*/}
                            </div>
                        </Slide>

                        <Slide right>
                            <div className={"slide_2"}>
                                <h1 className={"carousel-text-right"} >Put some text here SLIDE 2</h1>
                                {/*<p>Slide Description</p>*/}
                            </div>
                        </Slide>

                        <Slide right>
                            <div className={"slide_3"}>
                                <h1 className={"carousel-text-left"} >Put some text here SLIDE 3</h1>
                                {/*<p>Slide Description</p>*/}
                            </div>
                        </Slide>
                    </Carousel>
                </div>
    }


}


export default MyCarousel
