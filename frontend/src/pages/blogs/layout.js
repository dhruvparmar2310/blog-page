import Hero from '@/common/components/Hero/Hero'
import { formatDate } from '@/utills/utills'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Guide1 from '@/assets/img/guide-1.png'
import Guide2 from '@/assets/img/guide-2.png'
import Guide3 from '@/assets/img/guide-3.png'
import locationImg from '@/assets/img/bxs-map.svg.png'
import filledStar from '@/assets/img/Vector.png'
import emptyStar from '@/assets/img/bxs-star.svg.png'
import ExploreMoreArticle from '@/common/components/ExploreMoreArticle/ExploreMoreArticle'
import Comments from '@/common/components/Comments/Comments'

const BlogLayout = ({ children }) => {
  const router = useRouter()
  const { query } = useRouter()

  const [width, setWidth] = useState(false)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.matchMedia('(max-width: 576px)').matches)
    }
    changeWidth()

    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  const aTourGuides = [
    {
      _id: '1',
      sName: 'Miranda Rachel',
      sLocation: 'Jombang, Jawa timur',
      sImage: Guide1,
      nRating: '4'
    },
    {
      _id: '2',
      sName: 'Danielle Marsh',
      sLocation: 'Wonosobo, Jawa ten..',
      sImage: Guide2,
      nRating: '4'
    },
    {
      _id: '3',
      sName: 'Kang Haerin',
      sLocation: 'Bandung, Jawa barat',
      sImage: Guide3,
      nRating: '5'
    }
  ]

  // Fetching data without getStaticProps
  useEffect(() => {
    async function getAllBlogs() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs`)
        const data = await response.json()
        setBlogs(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getAllBlogs()
  }, [])
  return (
    <>
      <div className='blog-header'>
        <div className='breadcrumb'>
          <ul>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/blogs'}>Articles</Link>
            </li>
          </ul>
        </div>
        <h1 className='blog-title container'>{query?.slug?.[0]}</h1>
      </div>
      <Hero />
      <div className='blog-layout container'>
        {children}
        <section className='blog-layout_right-content'>
          <div>
            <h1 className='right-content_title'>Explore More</h1>

            <div className='right-content_cards'>
              {width ? (
                <ExploreMoreArticle blogs={blogs} query={query} />
              ) : (
                blogs
                  ?.filter((item) => item?.sTitle !== query.slug?.[0])
                  ?.slice(0, 4)
                  ?.map((item) => {
                    return (
                      <>
                        <div
                          className='right-content_card'
                          onClick={() =>
                            router.push({
                              pathname: `/blogs/${item.sTitle}/${item._id}`
                              // query: { id: blog._id }
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
                            <div
                              className='right-content_desc'
                              dangerouslySetInnerHTML={{ __html: item?.sContent?.slice(0, 50) + '...' }}
                            ></div>
                          </div>
                        </div>
                      </>
                    )
                  })
              )}
            </div>
          </div>
          <div className='tour-guides'>
            <h1 className='right-content_title'>Tour Guides</h1>
            <div className='right-content_cards'>
              {aTourGuides?.map((guide) => {
                return (
                  <div key={guide?._id} className='right-content_card'>
                    <div className='guide-top-content'>
                      <div className='guide-profile'>
                        <Image src={guide?.sImage} alt='' width={100} height={100} quality={70} />
                      </div>
                      <div className='guide-details'>
                        <p>{guide?.sName}</p>
                        <p className='guide-details_location'>
                          <Image src={locationImg} alt='' width={100} height={100} quality={70} />
                          {guide?.sLocation}
                        </p>
                      </div>
                    </div>
                    <div className='guide-details_rating'>
                      {Array?.from({ length: guide?.nRating })?.map((star) => (
                        <Image src={filledStar} alt='' width={100} height={100} key={star} />
                      ))}
                      {Array?.from({ length: 5 - Number(guide?.nRating) })?.map((star) => (
                        <Image src={emptyStar} alt='' width={100} height={100} key={star} />
                      ))}
                      <span>({guide?.nRating}.0)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
      <Comments />
    </>
  )
}

export default BlogLayout
