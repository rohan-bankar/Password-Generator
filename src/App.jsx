import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength] = useState(6);
  const [numAllowed,setNumAllow] = useState(false);
  const [charAllowed,setCharAllow] = useState(false);
  const [password,setPassword] = useState("");
  // use ref hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let password = " ";
    let str = "abcdefghijklmnopqrestuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numAllowed){
      str += "1234567890";
    }
    if(charAllowed){
      str += "~!@#$%^&*()_[]{}/";
    }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length * 1);
      password += str.charAt(char);    
    }
    setPassword(password);
  },[length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
     <div className='w-full max-w-lg mx-xl shadow-md rounded-lg px-4 py-6 my-8 text-orange-400 bg-gray-700 text-center'>
      <h1 className='text-white text-center mb-2'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden  mb-4'>
      <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3 bg-white'
        placeholder='password'
        readOnly
        ref={passwordRef}
      />
      <button className='bg-blue-700 text-white'
      onClick={copyPasswordToClipboard}
      >copy</button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{
          setLength(e.target.value)
        }}
        />
        <label>Length:{length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={numAllowed}
        className='cursor-pointer'
        onChange={()=>{
          setNumAllow((prev)=> !prev)
        }}
        />
        <label>Number</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={charAllowed}
        className='cursor-pointer'
        onChange={()=>{
          setCharAllow((prev)=> !prev)
        }}
        />
        <label>Character</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
