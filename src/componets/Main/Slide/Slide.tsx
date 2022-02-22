import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './Slide.css'
import bg1 from '../../../img/images-slider/1.png'
import bg2 from '../../../img/images-slider/2.png'
import bg3 from '../../../img/images-slider/3.png'
import bg4 from '../../../img/images-slider/4.png'

export const Slide = () => {
    const prev = useRef(null)
    const next = useRef(null)
    return (
    //     <div className={s.slideWrap}>

    // <Swiper
    //   spaceBetween={50}
    //   slidesPerView={1}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    // >
    //   <SwiperSlide>Slide 1</SwiperSlide>
    //   <SwiperSlide>Slide 2</SwiperSlide>
    //   <SwiperSlide>Slide 3</SwiperSlide>
    //   <SwiperSlide>Slide 4</SwiperSlide>
     
    // </Swiper>
    //     </div>
        <section className="showcase">
		<h2 className="showcase__header">
			Hoodie <span>Mantle</span>
		</h2>
		<div className="showcase__content-wrapper">
			<div className="showcase__content">
				<Swiper className="showcase-carousel"
                    loop = {true}
                    slidesPerView = {3}
                    speed = {1800}
                    centeredSlides = {true}
                    // navigation
                    // navigation = {
                    //     nextEl: next,
                    //     prevEl: prev
                    // }
                >
					<div className="swiper-wrapper">
						<SwiperSlide className="swiper-slide showcase-carousel__item">
							<div className="showcase-carousel__image-wrapper">
								<div className="showcase-carousel__image-left">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg1})`}}>

									</div>
								</div>
								<div className="showcase-carousel__image-right">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg1})`}}>

									</div>
								</div>
							</div>
							<p>Front</p>
						</SwiperSlide>
						<SwiperSlide className="swiper-slide showcase-carousel__item">
							<div className="showcase-carousel__image-wrapper">
								<div className="showcase-carousel__image-left">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg2})`}}>

									</div>
								</div>
								<div className="showcase-carousel__image-right">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg2})`}}>

									</div>
								</div>
							</div>
							<p>Front two</p>
						</SwiperSlide>
						<SwiperSlide className="swiper-slide showcase-carousel__item">
							<div className="showcase-carousel__image-wrapper">
								<div className="showcase-carousel__image-left">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg3})`}}>

									</div>
								</div>
								<div className="showcase-carousel__image-right">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg3})`}}>

									</div>
								</div>
							</div>
							<p>Side</p>
						</SwiperSlide>
						<SwiperSlide className="swiper-slide showcase-carousel__item">
							<div className="showcase-carousel__image-wrapper">
								<div className="showcase-carousel__image-left">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg4})`}}>

									</div>
								</div>
								<div className="showcase-carousel__image-right">
									<div className="showcase-carousel__image" style={{backgroundImage: `url(${bg4})`}}>

									</div>
								</div>
							</div>
							<p>Back</p>
						</SwiperSlide>
					</div>
				</Swiper>

			</div>

			<div className="showcase-navigation">
				<div ref={prev} className="showcase-navigation__prev">

				</div>
				<div ref={next} className="showcase-navigation__next">

				</div>
			</div>
		</div>
        {/* @ts-ignore */}
		<video autoplay loop muted src="./videos/smoke-background-optimized.mp4" className="showcase__video"></video>

	</section>
    )
}