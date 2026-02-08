import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";


const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((store)=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error')
    });
  }

  //As header will load throughout the app and inside my router provider
  //Adding this listener only once to the app
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            // Always use USER_AVATAR, even if Firebase provides a photoURL
            const {uid, email, displayName}=user;
            dispatch(addUser({uid, email, displayName, photoURL:USER_AVATAR}))
            navigate('/browse');
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate('/')
        }
        });

        //Unsubscribe when component unmounts
        return ()=>unsubscribe();
    },[]);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img src="/images/netflix-logo.png" alt="logo" className="w-44"/>
        {user && 
          <div className="flex p-2">
            <img className="w-12 h-12" src={user.photoURL} alt="usericon" />
            <button className="font-bold text-white" onClick={handleSignOut}>Sign Out</button>
          </div>
        }
    </div>
  )
}

export default Header;