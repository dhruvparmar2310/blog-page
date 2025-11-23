import Hero from "@/common/components/Hero/Hero";
import { formatDate } from "@/utills/utills";
import { useRouter } from "next/router";
import BlogLayout from "./layout";

export default function Blogs ({ blogs }) {
    const router = useRouter();
    console.log('Blogs component received blogs prop:', blogs)
    return (
        <>
            <section className="blog-page container">
                <h1 className="section-title">
                    Blog List
                </h1>
                <div className="blog-page_container">
                    {blogs?.data?.map((blog) => {
                        return (
                            <div key={blog._id} className="blog-page_blog-card">
                                <p className="blog-card_date">{formatDate(blog?.dCreatedDate)}</p>
                                <h1 className="blog-card_title">{blog?.sTitle}</h1>
                                <div className="blog-card_content" dangerouslySetInnerHTML={{ __html: blog?.sContent?.slice(0, 200) + '...' }}></div>
                                <button className="blog-card_read-more-btn" onClick={() => router.push({
                                    pathname: `/blogs/${blog.sTitle}/${blog._id}`,
                                    // query: { id: blog._id }
                                })}>Read More</button>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export async function getStaticProps () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs`);
    const blogs = await res.json();

    return {
        props: {
            blogs,
        },
    };
}
