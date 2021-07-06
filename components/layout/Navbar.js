import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { auth, firestore } from '../../lib/firebase';

function Navbar() {

    const router = useRouter()

    const logout = async (e) => {
        e.preventDefault();
        auth.signOut()
            .then(() => {
                console.log('Signed Out')
                router.push('/signup')
            })
            .catch((error) => {
                console.error('Sign Out Error', error);

            });
    } 
    
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <p style={{ marginRight: "10px"}} >TODO LIST -</p>
                </li>
                <li>
                    <a style={{ justifyContent: "right"}}onClick={logout} href="#">
                        Sign Out
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
    
    
    
