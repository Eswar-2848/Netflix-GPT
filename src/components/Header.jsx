import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((store)=>store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
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

    const handleGptSearch=()=>{
      //Toggle GPT Search button
      dispatch(toggleGptSearchView());
    }

    const handleChangeLanguage=(e)=>{
      dispatch(changeLanguage(e.target.value));
    }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img src="/images/netflix-logo.png" alt="logo" className="w-44"/>
        {user && 
          <div className="flex p-2">
            {showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleChangeLanguage}>
              {SUPPORTED_LANGUAGES.map((lang)=><option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
            }
            <button className="py-2 px-4 mx-4 my-2 bg-red-600 text-white rounded-lg mx-4 cursor-pointer" onClick={handleGptSearch}>
            {showGptSearch ? "Home Page" : "GPT Search"}</button>
            <img className="w-12 h-12" src={user.photoURL} alt="usericon" />
            <button className="font-bold text-white" onClick={handleSignOut}>Sign Out</button>
          </div>
        }
    </div>
  )
}

export default Header;