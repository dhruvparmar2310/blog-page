import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Header = () => {
    const router = useRouter()
    const [active, setActive] = useState('home')

    function handleClick (link) {
        setActive(link)
    }
    return (
        <header>
            <div className='logo'>
                <h1>My Blog</h1>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link href="/" className={router?.pathname?.includes('home') ? 'active' : ''} onClick={() => handleClick('home')}>Home</Link></li>
                    <li><Link href="/blogs" className={router?.pathname?.includes('blogs') ? 'active' : ''} onClick={() => handleClick('blogs')}>Blogs</Link></li>
                </ul>
            </nav>
        </header >
    )
}

export default Header
