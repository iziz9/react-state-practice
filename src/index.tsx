import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import counter from './reducers';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import loggerMiddleware from './middleware/log';
import thunk from 'redux-thunk';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//미들웨어 등록
const middleware = applyMiddleware(thunk, loggerMiddleware) //미들웨어가 여러개면 쉼표로 구분

const store = createStore(rootReducer, middleware); // createContext와 같다
// 리덕스 툴킷으로 configureStore라는 간단한 방식을 만들어놔서 이전에 만들어진 createStore가 권장되지 않음
// 리덕스 이해를 위해 이 방법부터 사용할것임 
// 미들웨어를 넣어주면 같이 사용할 수 있다

// store.dispatch({ type: 'INCREMENT' }) // 괄호 안 부분이 action. payload:5 와 같은 내용을 넣어줄수도 있음. 
// store.dispatch({ type: 'DECREMENT' }) // 리듀서로 내용이 넘어감
//+버튼을 누르면 타입이 increment인 액션을 dispatch

// store.dispatch({
//   type: 'ADD_TODO',
//   text: '밥먹기'
// })
// console.log(store.getState())

const render = () => root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        // value={store.getState()} //value = store의 state값을 가져온 것
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
      />
    </Provider>
  </React.StrictMode>
);

render()
store.subscribe(render)





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
