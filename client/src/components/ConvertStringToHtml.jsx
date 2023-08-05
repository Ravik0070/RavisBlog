import React from 'react'

const ConvertStringToHtml = ({ htmlString }) => {
    return <p dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default ConvertStringToHtml

