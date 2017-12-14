import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SlickSlider extends Component{
	render(){
		// console.log(this.props.match);

		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		}
		return(
			<div>
				<Slider {...settings}>
					<div className="slick-image"><img src="/slider-images/ferrari.jpg" alt="ferrari" /></div>
					<div className="slick-image"><img src="/slider-images/lamb.jpg" alt="lamb" /></div>
					<div className="slick-image"><img src="/slider-images/schooner.jpg" alt="schooner" /></div>
					<div className="slick-image"><img src="/slider-images/train1.jpg" alt="train1" /></div>
				</Slider>
			</div>
		);
	}
}

export default SlickSlider;