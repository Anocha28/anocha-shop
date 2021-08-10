
import React from 'react'
import { Helmet } from "react-helmet";

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
           <title>{title}</title> 
           <meta name='description' content={description} />
           <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to A-Web',
    description: 'The most comfortable and stylish wears',
    keywords: 'T-shirt tops cardigan jacket pants hoodies nice style goodlooking'
}

export default Meta
