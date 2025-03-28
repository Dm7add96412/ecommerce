import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContainer, SearchIconWrapper, StyledInputBase } from './styles/SearchStyles'


const Search = () => {
    const [searchWord, setSearchWord] = useState<string>('')
    const navigate = useNavigate()

    const searchProducts = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            navigate(`/search/${searchWord}`)
            setSearchWord('')
        }
    }

    return (
        <SearchContainer>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder='Search...'
                inputProps={{ 'aria-label': 'search' }}
                value={searchWord}
                onKeyDown={searchProducts}
                onChange={(e) => setSearchWord(e.target.value)}/>
        </SearchContainer>
    )   
}

export default Search