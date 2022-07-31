import './App.css'
import Nav from './components/Nav/Nav'
import routes from './routes'
import {useRoutes} from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {
  let router = useRoutes(routes)

  return (
    <div className="App">
      <Nav/>
      {router}
      <Footer/>
    </div>
    
  )
}

export default App
