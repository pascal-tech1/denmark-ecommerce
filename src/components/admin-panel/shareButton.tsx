import React from 'react';

const ShareButton = ({ title, text, url }: any) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            console.log('Web Share API is not supported in your browser');
        }
    };

    return (
        <button onClick={handleShare}>
            Share
        </button>
    );
};

export default ShareButton;