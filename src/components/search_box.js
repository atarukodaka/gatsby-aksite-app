import React from 'react'

const SearchBox = () => {
    const cx =  process.env.GCSE_CX 
    let gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
    return (
        <div className="gcse-search"></div>
    )
}

export default SearchBox