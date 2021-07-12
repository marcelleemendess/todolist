import Todo from '../components/Todo';
import Navbar from '../components/layout/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../lib/firebase'


const Index = () => {
  const [user] = useAuthState(auth)
  
  return (
    <>
      <Navbar/>
      <Todo user={user}/>
    </>
  )
}

export default Index;
