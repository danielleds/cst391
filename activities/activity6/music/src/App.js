import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import dataSource from './dataSource';
import NavBar from './NavBar';
import SearchAlbum from './SearchAlbum';
import NewAlbum from './NewAlbum';
import OneAlbum from './OneAlbum';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [albumList, setAlbumList] = useState([]);
    const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);
    let refresh = false;

    const updateSearchResults = (phrase) => {
        console.log('Phrase is ' + phrase);
        setSearchPhrase(phrase);
    }

    // Setup initialization callback
    useEffect(() => {
        // Update the album list
        loadAlbums();
    }, [refresh]);

    const loadAlbums = async () => {
        const response = await dataSource.get('/albums');
        setAlbumList(response.data);
    }

    const updateSingleAlbum = (id, navigate) => {
        console.log('Update Single Album =', id);
        console.log('Update Single Album = ', navigate);
        var indexNumber = 0;
        for (var i = 0; i < albumList.length; ++i) {
            if (albumList[i].id === id) indexNumber = i;
        }
        setCurrentlySelectedAlbumId(indexNumber);
        console.log('update path', '/show/' + indexNumber);
        navigate('/show/' + indexNumber);
    };

    const renderedList = albumList.filter((album) => {
        if (
            album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            searchPhrase === ''
        ) {
            return true;
        }
        return false;
    });

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <SearchAlbum
                            updateSearchResults={updateSearchResults}
                            albumList={renderedList}
                            updateSingleAlbum={updateSingleAlbum}
                        />
                    }
                />
                <Route exact path='/new' element={<NewAlbum />} />
                <Route
                    exact
                    path='/show/:albumId'
                    element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default App;