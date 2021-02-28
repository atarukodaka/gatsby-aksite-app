import React, { useState, useEffect } from 'react'


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

const GoogleSearch = () => (
    <ClientOnly>
        <SearchBox/>
    </ClientOnly>
)

export default GoogleSearch

