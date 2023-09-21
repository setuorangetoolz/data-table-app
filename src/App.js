import './App.css';
import HomePage from "./Components/HomePage";
import { Provider } from 'react-redux'
import store from "./Components/features/store";

function App() {
  return (
      <Provider store={store}>
        <HomePage/>
      </Provider>
  );
}

export default App;
