import { carouselImages } from './assets'
import { Carousel } from './components/carousel'
import { Header } from './components/header'

function App() {
    return (
        <>
            <Header className='mt-20'/>
            <Carousel images={carouselImages}/>
        </>
    )
}

export default App
