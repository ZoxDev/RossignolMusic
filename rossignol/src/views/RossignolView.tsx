import useGetTagsPages from "../hooks/useGetTagPages"

const RossignolView = () => {
    const { dataAllPages } = useGetTagsPages();

    return (
        <>
            <button onClick={() => console.log(dataAllPages)}>
                TEST BTN SEE LOG
            </button>
        </>
    )
}

export default RossignolView;