import CanvasModel from "./canvas/Canvas"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"


const App = () => {
  return (
    <div className='app transition-all ease'>
      <Home />
      <CanvasModel />
      <Customizer />
      </div>
  )
}

export default App