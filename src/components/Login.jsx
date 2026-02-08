//React Hooks
import {useState, useRef, useEffect} from 'react'

// Firebase Authentication Methods
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

//components
import Header from './Header'

//utils
import { auth } from '../utils/firebase';
import { checkValidData } from '../utils/validate';
import { USER_AVATAR } from '../utils/constants';

// State Management
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const dispatch=useDispatch();
    const [isSignInForm, setIsSignInForm]= useState(true);
    const [errors, setErrors]=useState({});
    const [errorMessage, setErrorMessage]=useState(null);

    const email=useRef(null);
    const password=useRef(null);
    const name=useRef(null);

    // Prevent input field values from persisting when toggling between sign-in and sign-up
    useEffect(() => {
        email.current.value = "";
        password.current.value = "";
        if (name.current) name.current.value = "";
        setErrorMessage(null);
    }, [isSignInForm]);

    const handleBtnClick=(e)=>{
        e.preventDefault();
        const errObj = isSignInForm 
        ? checkValidData(email.current.value, password.current.value) 
        : checkValidData(email.current.value, password.current.value, name.current.value);
        if(Object.keys(errObj).length>0){
            setErrors(errObj);
            return;
        }
        //Sign In / Sign Up Logic
        if(!isSignInForm){
            //Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // ✅ Reset Fields After Successful Sign-Up
                    email.current.value = "";
                    password.current.value = "";
                    setErrors({});
                    setErrorMessage(null);

                    updateProfile(auth.currentUser, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                        }).then(() => {
                        // Profile updated!
                            //Destructuring and adding to store since it has extra fields also
                            const {uid, email, displayName, photoURL}=auth.currentUser;
                            dispatch(addUser({uid, email, displayName, photoURL}))
                        }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                    if (name.current) name.current.value = "";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
        }
        else{
            //Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ✅ Reset Fields After Successful Sign-In
                email.current.value = "";
                password.current.value = "";
                setErrors({});
                setErrorMessage(null);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
            });
        }
    }

   return (
    <div>
        <Header />
        <div className='absolute'>
            <img src="/images/background.jpg" alt="backgroundImg" />
        </div>
        <form className="w-3/12 absolute bg-[#0f0f0fE6] p-12 my-36 mx-auto left-0 right-0 text-white">
            <h1 className='font-bold text-3xl pb-4'>Sign {isSignInForm ? 'In' : 'Up'}</h1>
            <input ref={email} type="text" placeholder="Email Address" className={`p-4 my-2 w-full border-2 rounded-sm placeholder-[#bab8b8] bg-[#0f0f0f] ${errors.email ? 'border-red-600' : 'border-[#5f5f5f]'}`}/>
            {errors.email && (<p className="text-red-600">{errors.email}</p>)}
            {!isSignInForm && <>
                <input ref={name} type="text" placeholder="Full Name" className={`p-4 my-2 w-full border-2 rounded-sm placeholder-[#bab8b8] bg-[#0f0f0f] ${errors.name ? 'border-red-600' : 'border-[#5f5f5f]'}`}/>
                <p className="text-red-600">{errors.name}</p>
            </>
            }
            <input ref={password} type="password" placeholder="Password" className={`p-4 my-2 w-full border-2 rounded-sm placeholder-[#bab8b8] bg-[#0f0f0f] ${errors.password ? 'border-red-600' : 'border-[#5f5f5f]'}`}/>
            {errors.password && (<p className="text-red-600">{errors.password}</p>)}
            {errorMessage && (<p className="text-red-600">{errorMessage}</p>)}
            <button className="p-2 my-2 bg-red-700 w-full rounded-sm cursor-pointer" onClick={handleBtnClick}>Sign {isSignInForm ? 'In' : 'Up'}</button>
            <p className="py-4 text-gray-300">
                {isSignInForm ? 'New to Netflix? ' : 'Already registered? '}
                <span
                    onClick={() => setIsSignInForm(!isSignInForm)}
                    className="cursor-pointer text-white border-white hover:border-b font-bold"
                >
                    {isSignInForm ? 'Sign Up Now' : 'Sign In Now...'}
                </span>
            </p>
        </form>
    </div>
  )
}

export default Login