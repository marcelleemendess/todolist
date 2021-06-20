// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { auth, firestore } from '../lib/firebase';

// const Register = () => {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const router = useRouter()

//     const signUp = async (e) => {
//         // e.preventDefault();
        
//         auth.createUserWithEmailAndPassword(email, password)
//             .then((userCredential) => {
//                 console.log('test')
//                 alert(userCredential.user.email + ' signed up')
//                 //  router.push('/')

//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 alert(errorMessage)
//             });
        
//     }   

//     return (
//         <form className="form-container">
//             <h1>Sign Up</h1>
//             <input
//                 className='input'
//                 type='email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//             />
//             <input
//                 className='input'
//                 type='password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
                    
//             />
//             <button className="btn-form" onClick={() => signUp(email, password)}>Sign Up</button>
//         </form>
    
//     )   
// }

// export default Register

import { auth, firestore } from '../lib/firebase';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';



const Signup = () => {
    const router = useRouter();
    const [toggleLogin, setToggleLogin] = useState(false)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const signUp = async (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(async (user) => {

            localStorage.setItem("useruid", JSON.stringify(auth.currentUser.uid))


            console.log(user.user.uid)
            router.push('/')
        }).catch(err => {
            console.log(err)
        })
    }

    const signIn = async (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(async (user) => {
            
            
            localStorage.setItem("useruid", JSON.stringify(auth.currentUser.uid))

            console.log(user.user.uid)
            router.push(`/`)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div  >
            <form action="" className="form-container">
                {toggleLogin ? 
                  <h1>Sign In</h1> 
                : 
                  <h1>Sign Up</h1>
                }

              <div>
                <input className="input" ref={emailRef} type="email" placeholder='Email' />
                <input className="input" ref={passwordRef} type="password" placeholder='Password' />
              </div>
          <div >
            {toggleLogin ?
                <button className="btn-form"  onClick={signIn}  >Sign In </button>
                  : 
                  <button className="btn-form"   onClick={signUp}>Sign Up </button>
            }
            </div>
          

                {toggleLogin ? 
                    <h6>Not yet registered? <span style={{ textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setToggleLogin(!toggleLogin)} >Sign up</span></h6>
                :
                  <h6>Already registered? <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setToggleLogin(!toggleLogin)} >Sign In</span></h6>
                }
            </form>
        </div>
    )
}

export default Signup


