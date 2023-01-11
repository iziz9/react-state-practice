enum ActionType { //아래 두개 외 다른 타입을 받을 경우 에러
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
}
interface Action {
  type: string,
  text: string
}

const todos = (state = [], action: Action) => {
  // 타입이 add인지 delete인지 확인해 add일땐 state 추가해주기
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.text] //원래 있던 아이템들 나열 + 새로운 아이템 추가
    case 'DELETE_TODO':
      return
    default:
      return state;
  }
}

export default todos