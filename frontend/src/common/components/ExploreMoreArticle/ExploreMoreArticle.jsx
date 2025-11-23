import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatDate } from '@/utills/utills'
import { useRouter } from 'next/router'

const ExploreMoreArticle = ({ blogs, query }) => {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [otherBlogs, setOtherBlogs] = useState([])

    useEffect(() => {
        setOtherBlogs(blogs?.filter((item) => item?.sTitle !== query.slug?.[0]))
    }, [blogs, query.slug])

    const handlePrevBtn = () => {
        setCurrentIndex((prev) => (prev === 0 ? otherBlogs?.length - 1 : prev - 1))
    }

    const handleNextBtn = () => {
        setCurrentIndex((prev) => (prev === otherBlogs?.length - 1 ? 0 : prev + 1))
    }
    return (
        <div className='explore-more-section'>
            {otherBlogs?.slice(currentIndex, currentIndex + 1)?.map((item) => {
                return (
                    <>
                        <div
                            className='right-content_card'
                            onClick={() =>
                                router.push({
                                    pathname: `/blogs/${item.sTitle}/${item._id}`
                                })
                            }
                        >
                            <div className='right-content_card-header'>
                                <Image src={item?.sImage} alt='' quality={70} width={100} height={100} />
                            </div>
                            <div className='right-content_card-body'>
                                <div className='right-content_top-content'>
                                    <h1>{item?.sTitle?.slice(0, 15)}</h1>
                                    <span className='seperator'>|</span>
                                    <span>{formatDate(item?.dCreatedDate)}</span>
                                </div>
                                <div className='right-content_desc' dangerouslySetInnerHTML={{ __html: item?.sContent?.slice(0, 50) + '...' }}></div>
                            </div>
                        </div>
                    </>
                )
            })}
            <div className='explore-more_control'>
                <button type='button' onClick={handlePrevBtn}>
                    Previous
                </button>
                <button type='button' onClick={handleNextBtn}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default ExploreMoreArticle
