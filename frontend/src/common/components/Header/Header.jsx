import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Header = () => {
    const router = useRouter()
    return (
        <header>
            <div className='logo'>
                <h1>Amrytt Pvt. Ltd. | Task</h1>
            </div>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link href="/" className={router?.pathname === '' ? 'active' : ''}>Home</Link>
                    </li>
                    <li>
                        <Link href="/blogs" className={router?.pathname === '/blogs' ? 'active' : ''}>Blogs</Link>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default Header
