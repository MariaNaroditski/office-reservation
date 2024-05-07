import Main from "./components/Main/Main";
import store, { StoreContext } from "./store";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Main />
    </StoreContext.Provider>
  );
}

export default App;
