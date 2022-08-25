import './App.css';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="App bg-gray-500 w-full h-screen overflow-hidden flex flex-col justify-between">
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
