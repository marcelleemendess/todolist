import { auth } from '../lib/firebase';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [toggleLogin, setToggleLogin] = useState(false)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
    
  //Sign up user
  const signUp = async (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(async (user) => {

     //localStorage.setItem("useruid", JSON.stringify(auth.currentUser.uid))
      // console.log(user.user.uid)
      router.push('/')
    }).catch(err => {
      // console.log(err)
      alert(err.message)
    })
  }
    
  const signIn = async (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
    ).then(async (user) => {
      //localStorage.setItem("useruid", JSON.stringify(auth.currentUser.uid))
      // console.log(user.user.uid)
      router.push(`/`)
    }).catch(err => {
      // console.log(err)
      alert(err.message)
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


