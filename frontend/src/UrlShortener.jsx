import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const shortenUrl = async () => {
        //  URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        if (!originalUrl) {
            setError('Please enter a URL');
            return;
        }

        if (!urlPattern.test(originalUrl)) {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        setError('');
        setShortenedUrl('');

        try {
            const response = await axios.post('YOUR_BACKEND_API_URL/shorten', {
                originalUrl: originalUrl
            });

            setShortenedUrl(`YOUR_BACKEND_API_URL/${response.data.shortId}`);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    URL Shortener
                </h1>

                <div className="mb-4">
                    <input
                        type="text"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="Enter your long URL here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={shortenUrl}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-4 
                     disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {loading ? 'Shortening...' : 'Shorten URL'}
                </button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {shortenedUrl && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                        <a
                            href={shortenedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate mr-2"
                        >
                            {shortenedUrl}
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UrlShortener;