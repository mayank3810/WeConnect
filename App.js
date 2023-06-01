import { getApps, initializeApp } from "firebase/app";
import Navigation from "./src/navigator/Navigation";
import firebaseConfig from "./secrets";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);
}

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
