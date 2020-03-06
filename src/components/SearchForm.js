import React from 'react'

const SearchForm = () => {
    return(
        <form className="search-form">
            <input type="text" name="repo" placeholder="repo" />
            <input type="text" name="oauth" placeholder="oauth" />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchForm