import React from 'react';
import SearchForm from './SearchForm';
import AlbumList from './AlbumList';

const SearchAlbum = (props) => {
    //console.log('props With update single album ', props);
    return (
        <div className='container'>
            <SearchForm onSubmit={props.updateSearchResults} />

            <AlbumList albumList={props.albumList} onclick={props.updateSingleAlbum}/>
        </div>
    );
};

export default SearchAlbum;