import styled from 'styled-components';

export const SearchInput = styled.div`
    input{
        background-image: url("data:image/svg+xml,%3Csvg width='1.25rem' height='1.25rem' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.58317 17.5C13.9554 17.5 17.4998 13.9556 17.4998 9.58335C17.4998 5.2111 13.9554 1.66669 9.58317 1.66669C5.21092 1.66669 1.6665 5.2111 1.6665 9.58335C1.6665 13.9556 5.21092 17.5 9.58317 17.5Z' stroke='%23888888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M18.3332 18.3334L16.6665 16.6667' stroke='%23888888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
        background-repeat:no-repeat;
        background-position-y:center;
        background-position-x:0.75rem;
        background-size:1rem;
    }
`;

const SearchIncidentForm = (prop:any) => {
  return (
    <div className='full'>
        <SearchInput>
            <input 
              type='text' 
              placeholder='Search Form' 
              className='outline-none w-full bg-white border border-gray-100 ps-9 pe-4 py-2.5 text-300 font-normal 
                rounded-md text-gray-300 placeholder:font-light
            focus:border-secondary-100 focus:shadow-200
            disabled:bg-gray-200 read-only:!shadow-0 read-only:!border-gray-100'
            onChange={prop.setSearchInpData}
          />
        </SearchInput>
    </div>
  )
}

export default SearchIncidentForm