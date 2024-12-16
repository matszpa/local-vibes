const LoadingDots = () => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-2">
            <span className="text-blue-500 text-lg font-semibold ">Loading</span>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
    );
};

export default LoadingDots;