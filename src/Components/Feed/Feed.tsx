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
}

const Feed: React.FC<FeedProps> = ({ userId }) => {
    console.log('🔍 Feed recebeu userId:', userId);
    const [modalPhoto, setModalPhoto] = React.useState<Photo | null>(null);

    return <div>
        {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
        <FeedPhotos userId={userId} setModalPhoto={setModalPhoto} />
    </div>;
};

export default Feed;
