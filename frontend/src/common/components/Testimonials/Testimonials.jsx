import React, { useState } from 'react'
import AlexImg from '@/assets/img/Aspect ratio.png'
import MinandaImg from '@/assets/img/guide-1.png'
import DanielleImg from '@/assets/img/guide-2.png'
import Image from 'next/image'

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const aTestimonialsData = [
        {
            _id: '0',
            sName: "Alex Carter",
            sImage: AlexImg,
            sDescription: "With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures."
        },
        {
            _id: '1',
            sName: "Miranda Rachel",
            sImage: MinandaImg,
            sDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure officiis hic consequatur nihil impedit corrupti nostrum debitis architecto illo libero magni rerum, explicabo ut minus, at odio. Dolor, dolorum eaque."
        },
        {
            _id: '2',
            sName: "Danielle Marsh",
            sImage: DanielleImg,
            sDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad deserunt in saepe quos nesciunt, impedit enim! Tempore ullam repellat voluptatibus molestias animi voluptate, mollitia recusandae ut maxime quis hic laboriosam? Id neque beatae exercitationem dolores facere sunt, aspernatur libero placeat autem laborum ab possimus. Eveniet vero exercitationem facere quo deleniti? Corrupti, enim obcaecati dolore hic facere iste vero ea quas?"
        }
    ]

    const handlePrevBtn = () => {
        setCurrentIndex((prev) => prev === 0 ? aTestimonialsData?.length - 1 : prev - 1)
    }

    const handleNextBtn = () => {
        setCurrentIndex((prev) => prev === aTestimonialsData?.length - 1 ? 0 : prev + 1)
    }
    return (
        <div className='testimonial-section'>
            {aTestimonialsData.slice(currentIndex, currentIndex + 1)?.map(user => {
                return (
                    <div key={user?._id} className='testimonial-card'>
                        <div className='testimonial-card_username'>
                            <h1> About {user.sName} </h1>
                        </div>
                        <div className='testimonial-card_profile'>
                            <Image src={user.sImage} alt='' width={100} height={100} quality={70} />
                        </div>
                        <div className='testimonial-card_desc'>
                            <p>{user.sDescription}</p>
                        </div>
                    </div>
                )
            })}
            <div className='testimonial-card_control'>
                <button type='button' onClick={handlePrevBtn}>Previous</button>
                <button type='button' onClick={handleNextBtn}>Next</button>
            </div>
        </div>
    )
}

export default Testimonials
