import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null) // for compatibility - you can put it in input and call the onclick funciton on the button

  const passwordGenerator = useCallback((e) => { // callback function saves the memory in cache
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789'
    if (specialCharAllowed) str += '!@#$%^&*(){}~`[]'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, specialCharAllowed, setPassword])

  useEffect(() => { // after reseting the page, the dependencies won't change - it'll be set as the useState prev
    passwordGenerator()
  }, [length, numberAllowed, specialCharAllowed, passwordGenerator])

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()  // gives the extra UI feature to see the copied password
    // document.execCommand('copy')
    window.navigator.clipboard.writeText(password) // copies the password to clipboard
  }

  return (
    <>
      <div className="w-full max-w-md h-36 mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800">
        <h1 className='text-white text-center font-semibold text-lg p-2'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-clip mb-4">
          <input type="text" value={password} className='text-orange-500 text-md font-semibold outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className="px-3 py-0.5 shrink-0 text-white bg-blue-700 font-semibold">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={80} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-orange-500'>length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} />
            <label htmlFor="numberInput" className='text-orange-500'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={specialCharAllowed} id='SpecialCharInput' onChange={() => {
              setSpecialCharAllowed((prev) => !prev)
            }} />
            <label htmlFor="specialCharInput" className='text-orange-500'>Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App