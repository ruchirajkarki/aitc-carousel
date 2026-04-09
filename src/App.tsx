import { carouselImages } from './assets'
import { Carousel, Header } from './components'

function App() {
    return (
        <>
            <Header className='mt-20'/>
            <Carousel images={carouselImages}/>
        </>
    )
}

export default App
