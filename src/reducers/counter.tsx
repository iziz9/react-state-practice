const counter = (state = 0, action: { type: string }) => {

  switch (action.type) {
    case 'INCREMENT':
      return state + 1; // initialstate에 +1하고 반환. redux store에 반환값이 저장됨
    case 'DECREMENT':
      return state - 1;
    default: return state; // 타입이 increment, decrement 둘다 아닐 때 기본 state반환
  }
  //새로운state
  //action의 type에 따라 다른 행동을 해줌
}

export default counter;