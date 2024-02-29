import useGetRandomTag from "../hooks/useGetRandomTag";

const RossignolView = () => {
    const { randomTag, refetchRandomTag } = useGetRandomTag();

    const handleRefetch = async () => {
        await refetchRandomTag();
        console.log(randomTag);
    };

    return (
        <>
            <button onClick={handleRefetch}>
                TEST BTN SEE LOG
            </button>
        </>
    )
}

export default RossignolView;