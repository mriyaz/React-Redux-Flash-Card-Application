

//Action Creators
const addDeck=name=>({type:'ADD_DECK',data:name});
const showAddDeck=()=>({type:'SHOW_ADD_DECK'});
const hideAddDeck=()=>({type:'HIDE_ADD_DECK'});

//Reducers
const cards = (state,action) => {
  switch (action.type) {
    case 'ADD_CARD':
      let newCard=Object.assign({},action.data,{
        score:1,
        id:+new Date
      });
      return state.concat([newCard]);
    default:
    return state || [];
  };
};

const decks = (state,action) => {
  switch (action.type) {
    case 'ADD_DECK':
      let newDeck ={name:action.data,id:+new Date};
      return state.concat([newDeck]);
    default:
      return state || [];
    }
};
const addingDeck = (state,action) => {
      switch (action.type) {
        case 'SHOW_ADD_DECK':return true;
        case 'HIDE_ADD_DECK':return false;
        default: return !!state;
      }
};

//STORE
const store = Redux.createStore(Redux.combineReducers({
  cards,
  decks,
  addingDeck
}));


const App=(props) => {
  return(<div className='app'>{props.children}</div>);
}

const Sidebar = React.createClass({
  render(){
    let props = this.props;
    return (<div className='sidebar'>
      <h2>All decks</h2>
      <ul>
      {props.decks.map((deck,i) =>
        <li key={i}>{deck.name}</li>
      )}
      </ul>
      {props.addingDeck && <input ref='add'/>}
    </div>);
  }
});

function run() {
  let state = store.getState();
  console.log(state);
  ReactDOM.render(<App>
    <Sidebar decks={state.decks} addingDeck={state.addingDeck}/>
    </App>,document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));
