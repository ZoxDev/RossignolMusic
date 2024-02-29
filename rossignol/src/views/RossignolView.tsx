import useGetRandomTag from "../hooks/useGetRandomTag";

const RossignolView = () => {
    const { dataRandomTag, refetchRandomTag } = useGetRandomTag();

    const test = async () => {
        await refetchRandomTag();
        console.log(dataRandomTag);
    }

    return (
        <>
            <button onClick={test}>
                TEST BTN SEE LOG
            </button>
            <h1>{dataRandomTag}</h1>
        </>
    )
}

export default RossignolView;