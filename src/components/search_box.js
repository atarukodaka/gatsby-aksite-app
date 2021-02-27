import React from 'react'

const SearchBox = () => {
    const gcse_cx = process.env.GCSE_CX
    const src = `https://cse.google.com/cse.js?cx=${gcse_cx}`
    return (
        <div>
            <script async src={src}></script>
            <div className="gcse-search"></div>
        </div>
    )
}
export default SearchBox