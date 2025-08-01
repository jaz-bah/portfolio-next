'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Star } from 'lucide-react';

interface Props {
    texts: string[];
    direction?: 'left' | 'right';
    speed?: number;
}

export default function TextMarque({ texts, direction = 'left', speed = 3000 }: Props) {
    const repeatedTexts = [...texts, ...texts, ...texts, ...texts, ...texts];
    return (
        <div className="text_marque_wrapper">
            <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                speed={speed}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                loop={true}
                allowTouchMove={false}
                grabCursor={false}
                spaceBetween={20}
                dir={direction == 'left' ? 'rtl' : 'ltr'}
            >
                {repeatedTexts.map((text, index) => (
                    <SwiperSlide key={index} style={{ width: 'auto' }}>
                        <span key={index + "m2"} className="item">
                            <span className="text">{text}</span>
                            <span className="icon">
                                <Star />
                            </span>
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
