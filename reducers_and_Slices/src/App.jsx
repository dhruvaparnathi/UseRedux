import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, clear } from './redux/slices/counter.slice'
import { toggleTheme } from './redux/slices/theme.slice'
import './App.css'

const App = () => {
  const count = useSelector((state) => state.counter.count);
  const theme = useSelector((state) => state.theme.value);

  const dispatch = useDispatch();

  return (
    <div className={`app ${theme}`}>
      <div className="card">
        <h1 className="counter-title">Counter: <span className="count-value">{count}</span></h1>
        <div className="btn-group">
          <button className="btn btn-increment" onClick={() => dispatch(increment())}>Increment</button>
          <button className="btn btn-decrement" onClick={() => dispatch(decrement())}>Decrement</button>
          <button className="btn btn-clear" onClick={() => dispatch(clear())}>Clear</button>
        </div>

        <div className="divider"></div>

        <h2 className="theme-title">Theme: <span className="theme-value">{theme}</span></h2>
        <button className="btn btn-theme" onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
      </div>
    </div>
  )
}

export default App