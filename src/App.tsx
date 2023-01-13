import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from './reducers';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import axios from 'axios';

type Props = {
  // value: number,
  onIncrement: () => void, //함수지만 리턴하는 것은 없음
  onDecrement: () => void
}

function App({ onIncrement, onDecrement }: Props) {

  const todos: string[] = useSelector((state: RootState) => state.todos)
  const counter = useSelector((state: RootState) => state.counter) //store에 들어있는 state
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState('');

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const fetchPosts: any = () => {
    return async function fetchPostsThunk(dispatch: any, getState: any) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      dispatch({ type: "FETCH_POSTS", payload: response.data })
    }
  }


  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    // form 이벤트에 타입 부여
    event.preventDefault();
    dispatch({ type: 'ADD_TODO', text: todoValue })
    //text가 액션. reducer함수로 이동하게 됨. reducer에서 todos함수로 이동해 입력값이 action.type로 들어감
    //store에 값이 업데이트됨
    setTodoValue('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // change 이벤트에 타입 부여
    setTodoValue(event.target.value)
  }

  return (
    <div className="App">
      <p>Clicked: {counter} times</p>
      {/* <button onClick={onDecrement}>  */}
      {/* 위:스토어객체 직접 받아오는 방법 / 아래 : 리액트 리덕스의 hooks를 사용하는 방법 */}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -
      </button>

      <ul>
        {todos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>

      <form onSubmit={addTodo}>
        <input type='text' value={todoValue} onChange={handleChange} />
        <input type='submit' />
      </form>
    </div>
  );
}

export default App;
