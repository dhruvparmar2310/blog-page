import React, { useEffect, useState } from 'react'
import BlogLayout from './layout';
import { formatDate } from '@/utills/utills';
import AlexPic from '../../assets/img/Aspect ratio.png'
import Image from 'next/image';
import Testimonials from '@/common/components/Testimonials/Testimonials';

const SpecificBlog = ({ blog }) => {
    const [width, setWidth] = useState(false)

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
    return (
        <BlogLayout>
            <section className='blog-page specific-blog'>
                <div className='blog-page_top-bar'>
                    <div className='top-bar_profile'>
                        <Image src={AlexPic} alt='' quality={100} />
                        <p>Alex Carter</p>
                    </div>
                    <div className='blog-page_date'>
                        {formatDate(blog?.dCreatedDate)}
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: blog?.sContent }} className='blog-page_content'></div>
                {!width && <Testimonials />}
            </section>
        </BlogLayout>
    )
}

export default SpecificBlog

export async function getStaticPaths () {
    try {
        const res = await fetch(`${process?.env.NEXT_PUBLIC_API_ENDPOINT}/blogs`);
        const result = await res.json();
        const blogs = result.data || [];

        const paths = blogs.map((blog) => {
            return ({
                params: {
                    slug: [blog?.sTitle, blog?._id],
                },
            })
        });

        return {
            paths: [],
            fallback: 'blocking',
        };
    } catch (error) {
        console.error("getStaticPaths error:", error);

        return {
            paths: [],
            fallback: "blocking",
        }
    }
}

export async function getStaticProps ({ params }) {
    try {
        const single = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs/${params?.slug[1]}`);
        const singleResult = await single.json();
        const blog = singleResult.data || {};

        return {
            props: { blog },
            revalidate: 60,
        };
    } catch (error) {
        console.error("getStaticProps error:", error);

        return {
            notFound: true,
        }
    }
}
