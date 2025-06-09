import {useState} from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm]= useState(true);
   return (
    <div>
        <Header />
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/6863f6e8-d419-414d-b5b9-7ef657e67ce4/web/IN-en-20250602-TRIFECTA-perspective_27a3fdfa-126f-4148-b153-55d60b51be6a_large.jpg" alt="backgroundImg" />
        </div>
        <form className="w-3/12 absolute bg-[#0f0f0fE6] p-12 my-36 mx-auto left-0 right-0 text-white">
            <h1 className='font-bold text-3xl pb-4'>Sign {isSignInForm ? 'In' : 'Up'}</h1>
            <input type="text" placeholder="Email or mobile number" className="p-4 my-2 w-full border-2 border-[#5f5f5f] rounded-sm placeholder-[#bab8b8] bg-[#0f0f0f]"/>
            {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-2 w-full border-2 border-[#5f5f5f] rounded-sm placeholder-[#bab8b8] bg-[#0f0f0f]"/>}
            <input type="password" placeholder="Password" className="p-4 my-2 w-full border-2 border-[#5f5f5f] rounded-sm placeholder-[#bab8b8] bg-[#0f0f0f]"/>
            <button className="p-2 my-2 bg-red-700 w-full rounded-sm">Sign {isSignInForm ? 'In' : 'Up'}</button>
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