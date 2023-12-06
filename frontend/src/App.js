import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Store } from "redux";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
