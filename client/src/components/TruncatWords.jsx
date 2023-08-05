import React from 'react'
import ConvertStringToHtml from "./ConvertStringToHtml"
const TruncatWords = ({htmlString}) => {
    
    const truncateWords = (text, wordCount) => {
        const words = text.split(" ");
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(" ") + " ...";
        }
        return text;
    };

    const truncatedDescription = truncateWords(htmlString, 20);

    return <ConvertStringToHtml htmlString={truncatedDescription} />;
}

export default TruncatWords