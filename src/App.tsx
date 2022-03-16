import React, {useState, useEffect} from 'react';
import './App.css';
import {Layout, Alert, Button} from 'antd';
import {getImages, searchPhotos} from "./Services/ImageServices";
import {Photo} from "./Models/Photo";
import LoadingIndicator from "./Components/LoadingIndicator";
import ImagesList from "./Components/ImagesList/ImagesList";
import SearchField from "./Components/SearchField/SearchField";

const {Header, Content} = Layout;

const ERROR_MESSAGE = "OOPS! Something went wrong"

const App = () => {
    const [images, setImages] = useState<Photo[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [searchQuery, setSearchQuery] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()

    // Function to load the images initially
    const initialLoad = () => {
        getImages(1).then(data => {
            const {photo} = data
            setImages(photo)
            setIsLoading(false)
            setCurrentPage(1)
            setTotalPages(data.pages)
        }).catch(error => setErrorMessage(ERROR_MESSAGE));
    }

    useEffect(() => initialLoad(), [setImages])

    // Function to load the images on scroll down
    const loadMore = () => {
        setIsLoadingMore(true)
        const page = currentPage + 1
        getImages(page).then(data => {
            const {photo} = data
            setImages([...images, ...photo])
            setIsLoadingMore(false)
            setCurrentPage(page)
        }).catch(error => setErrorMessage(ERROR_MESSAGE));
    }

    const loadMoreWithSearch = () => {
        if (!searchQuery) {
            return
        }

        setIsLoadingMore(true)
        const page = currentPage + 1
        searchPhotos(searchQuery, page).then(data => {
            const {photo} = data
            setImages([...images, ...photo])
            setIsLoadingMore(false)
            setCurrentPage(page)
        }).catch(error => setErrorMessage(ERROR_MESSAGE));
    }

    const searchImages = (search: string | undefined) => {

        setSearchQuery(search)
        setIsLoading(true)
        if (!search) {
            initialLoad()
            return
        }
        searchPhotos(search, 1).then(data => {
            const {photo} = data
            setImages(photo)
            setIsLoading(false)
            setCurrentPage(1)
            setTotalPages(data.pages)
        }).catch(error => setErrorMessage(ERROR_MESSAGE));

    }

    return (
        <Layout className="app">
            <Header className="appHeader">
                <div className="headerContents">
                    <span className="headerText">Search Photos</span>
                    <SearchField search={searchImages}/>
                </div>

            </Header>
            <Content>
                {errorMessage &&
                <div className="appContent">
                    <Alert
                        message="Error"
                        description={errorMessage}
                        type="error"
                        showIcon
                        action={
                            <Button
                                onClick={() => window.location.reload()}
                                size="small"
                                type="primary">
                                Reload
                            </Button>
                        }
                    />
                </div>}
                {isLoading && !errorMessage && <div className="appContent"><LoadingIndicator size="large"/></div>}
                {!isLoading && !errorMessage && <ImagesList
                    currentPage={currentPage}
                    totalPages={totalPages}
                    images={images}
                    isLoadingMore={isLoadingMore}
                    fetchMore={!!searchQuery ? loadMoreWithSearch : loadMore}/>}
            </Content>
        </Layout>
    )

}

export default App;