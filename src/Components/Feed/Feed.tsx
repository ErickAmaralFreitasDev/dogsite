import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

interface Photo {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: number;
  total_comments: number;
}

interface FeedProps {
  userId?: number;
  page?: number;
}

const Feed: React.FC<FeedProps> = ({ userId, page }) => {
    const [modalPhoto, setModalPhoto] = React.useState<Photo | null>(null);
    const [pages, setPages] = React.useState<number[]>([1]);
    const [infinite, setInfinite] = React.useState(true); 

    React.useEffect(() => {
        let wait = false;

        function handleWheel(event: WheelEvent) {
          if (infinite) {
            const scrollY = window.scrollY;
            const height = document.body.offsetHeight - window.innerHeight;
            if (scrollY > height * 0.75 && !wait) {
                setPages((pages) => [...pages, pages.length + 1]);
                wait = true;
                setTimeout(() => {
                  wait = false;
                }, 500);
            }
          }
        }
        
        function handleScroll(event: Event) {
          if (infinite) {
            const scrollY = window.scrollY;
            const height = document.body.offsetHeight - window.innerHeight;
            if (scrollY > height * 0.75 && !wait) {
                setPages((pages) => [...pages, pages.length + 1]);
                wait = true;
                setTimeout(() => {
                  wait = false;
                }, 500);
            }
          }
        }

      window.addEventListener('wheel', handleWheel);
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('scroll', handleScroll);
      }
    }, [userId, infinite]);

    return <div>
        {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
        {pages.map((page) => 
          <FeedPhotos 
            key={page} 
            userId={userId} 
            page={page} 
            setModalPhoto={setModalPhoto}
            setInfinite={setInfinite} 
          />)}
    </div>;
};

export default Feed;
