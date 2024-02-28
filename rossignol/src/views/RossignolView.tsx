import useGetRandomTag from "../hooks/useGetRandomTag";

const RossignolView = () => {
    const { randomTag, refetchRandomTag } = useGetRandomTag();

    return (
        <>
            <button onClick={() => {
                refetchRandomTag();
                console.log(randomTag);
            }}>
                TEST BTN SEE LOG
            </button>
        </>
    )
}

export default RossignolView;