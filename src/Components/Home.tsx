import Feed from './Feed/Feed'
import Head from './Helper/Head'

interface HeadProps {
    title: string;
    description?: string;
}

const Home: React.FC<HeadProps> = () => {
  return (
    <section className='container mainContainer'>
      <Head title='Fotos' description='Home do site Dogs'/>
      <Feed/>
    </section>
  )
}

export default Home
