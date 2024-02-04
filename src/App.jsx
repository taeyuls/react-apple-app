import styled from 'styled-components'
import './App.css'
import Nav from './components/MovieModal/Nav'
import Banner from './components/MovieModal/Banner'

function App() {

  return (
    <Container>
    <Nav />
    <Banner/>
      App
    </Container>
  )
}

const Container = styled.main`
position: relative;
display: block;
top: 70px;
padding: 0 calc(3.5vw 5px);
`

export default App
