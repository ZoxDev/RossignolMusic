import useGetRandomTag from "../hooks/useGetRandomTag";

const RossignolView = () => {
    const { dataRandomTag, refetchRandomTag } = useGetRandomTag();

    const handleClick = async () => {
        await refetchRandomTag();
    }

    return (
        <>
            <button onClick={handleClick}>
                TEST BTN SEE LOG
            </button>
            <h1>{dataRandomTag}</h1>
        </>
    )
}

export default RossignolView;