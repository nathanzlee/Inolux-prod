const Status = ({ status }) => {

    return (
        <div className="w-full h-full flex justify-start items-center">
            <div className="w-5 h-[8px] rounded-md bg-[var(--primary-color)] mr-1"></div>
            <div className="w-5 h-[8px] rounded-md bg-white border-solid border-2 border-[var(--primary-color)] mr-1"></div>
            <div className="w-5 h-[8px] rounded-md bg-white border-solid border-2 border-[var(--primary-color)]"></div>
        </div>
    )
}

export default Status