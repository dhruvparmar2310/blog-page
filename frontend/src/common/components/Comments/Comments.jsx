import { formatDate } from '@/utills/utills'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import emptyStar from '@/assets/img/bxs-star.svg.png'
import filledStar from '@/assets/img/Vector.png'
import Guide1 from '@/assets/img/guide-1.png'
import Guide2 from '@/assets/img/guide-2.png'
import Guide3 from '@/assets/img/guide-3.png'

const Comments = () => {
    const [comments, setComments] = useState([])
    const person = [Guide1, Guide2, Guide3]

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments`)
                const data = await res.json()

                const updatedData = data?.data?.map((item, i) => ({ ...item, sImage: person[i] }))
                setComments(updatedData)
            } catch (error) {
                console.error('Error fetching comments:', error)
            }
        }

        fetchComments()
    }, [])
    return (
        <section className='comment-section container'>
            <h1 className='comment-section_title'>Comments</h1>
            <div className='comment-section_cards'>
                {comments?.length > 0
                    ? comments?.map((comment) => {
                        return (
                            <div key={comment?._id} className='comment-section_card'>
                                <div className='comment-top-content'>
                                    <div className='comment-profile'>
                                        <Image src={comment?.sImage} alt='' width={100} height={100} quality={70} />
                                    </div>
                                    <div className='comment-details'>
                                        <p>{comment?.sName}</p>
                                        <div className='comment-details_rating'>
                                            {Array?.from({ length: comment?.nRating })?.map((star) => (
                                                <Image src={filledStar} alt='' width={100} height={100} key={star} />
                                            ))}
                                            {Array?.from({ length: 5 - Number(comment?.nRating) })?.map((star) => (
                                                <Image src={emptyStar} alt='' width={100} height={100} key={star} />
                                            ))}
                                            <span>({comment?.nRating}.0)</span>
                                        </div>
                                        <p className='comment-details_date'>{formatDate(comment?.dCreatedDate)}</p>
                                        <p className='comment-details_desc'>{comment?.sContent}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : 'No Comments Found'}
            </div>
        </section>
    )
}

export default Comments
