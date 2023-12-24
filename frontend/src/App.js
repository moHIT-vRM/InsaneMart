import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  console.log("hi");
  console.log("hello");
  console.log("hello 2");
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
