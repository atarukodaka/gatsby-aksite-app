import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ClientOnly = ({ children, ...delegated }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) {
      return null;
    }
    return (
      <div {...delegated}>
        {children}
      </div>
    );
}

const SearchBox = ({cx}) => {
    //const cx =  process.env.GCSE_CX 
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

const GoogleSearch = ( {cx}) => (
    <ClientOnly>
        <SearchBox cx={cx}/>
    </ClientOnly>
)

GoogleSearch.propTypes = {
  cx: PropTypes.string
}
export default GoogleSearch

