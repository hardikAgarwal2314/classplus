import React, {useState} from 'react';
import {getUrl} from "../../Services/ImageServices";
import {Photo} from "../../Models/Photo";
import {Modal, Empty, Card} from 'antd'
import './ImagesList.scss';
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroll-component';

const {Meta} = Card;

interface ImagesListProps {
    images: Photo[];
    currentPage: number;
    totalPages: number;
    fetchMore: () => void;
    isLoadingMore: boolean
}

interface ImageCardProps {
    close: () => void;
    isModalVisible: boolean
    image: Photo;
}

const ImageCard: React.FC<ImageCardProps> = ({close, isModalVisible, image}) => {
    return (
        <Modal title={image.title || "Dummy Image"}
               visible={isModalVisible}
               bodyStyle={ { display: "flex", justifyContent:"center"}}
               onOk={close}
               onCancel={close}>
            <Card
                hoverable
                className="imageCard"
                cover={<img alt="example"
                            className="photo"
                            src={getUrl(image.server, image.id, image.secret)}/>}
            >
                <Meta title={image.title || "Dummy Image"} description="visit classplus.com"/>
            </Card>
        </Modal>
    )
}

const ImagesList: React.FC<ImagesListProps> = ({images, fetchMore, currentPage, totalPages, isLoadingMore}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<Photo>()


    if(!images.length) {
        return <div className="appContent"><Empty/></div>
    }

    const breakpointColumnsObj = {
        default: 5,
        1400: 3,
        1000: 2,
        600: 1,
    };

    const getImage = (image: Photo) => {
        return (
            <img alt="example"
                 className="photo"
                 src={getUrl(image.server, image.id, image.secret)}/>
        )
    }

    return (
        <>
            {selectedImage && isModalVisible && (
                <ImageCard
                    close={() => {
                        setIsModalVisible(false)
                        setSelectedImage(undefined)
                    }
                    } isModalVisible={isModalVisible} image={selectedImage}/>
            )}
            <InfiniteScroll
                className="list"
                dataLength={images.length}
                next={fetchMore}
                hasMore={currentPage !== totalPages}
                loader={<></>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">

                    {
                        images.map((image, index) =>
                            <Card
                                key={`${image.id}${index}`}
                                hoverable
                                onClick={() => {
                                    setSelectedImage(image)
                                    setIsModalVisible(true)
                                }}
                                className="imageCard"
                                cover={getImage(image)}
                            >
                                <Meta title={image.title || "Dummy Image"} description="visit classplus.com"/>
                            </Card>
                        )
                    }

                </Masonry>
            </InfiniteScroll>
        </>
    )
}

export default ImagesList;