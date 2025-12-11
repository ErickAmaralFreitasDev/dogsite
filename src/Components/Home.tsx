import Head from './Helper/Head'
import FeedPublic from './Feed/FeedPublic';

interface HeadProps
 {
    title: string;
    description?: string;
}

const Home: React.FC<HeadProps> = () => {
  return (
    <section className='container mainContainer'>
      <Head title='Fotos' description='Home do site Dogs'/>
      <FeedPublic/>
    </section>
  )
}

export default Home
