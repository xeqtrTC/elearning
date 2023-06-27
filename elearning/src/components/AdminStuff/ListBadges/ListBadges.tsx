import { ListBadgesQuery } from "../../../hooks/query"
import Loading from "../../Loading/Loading";

const ListBadges = () => {
    const { data, isLoading, isSuccess, isError } = ListBadgesQuery();
    console.log(data);
    let content = null;

    if (isLoading) {
        content = <Loading />
    }
    if (isSuccess) {
        content = (
            <div className="grid grid-cols-2 gap-5">
                {
                    data.map((item) => {
                        const { badgeName, badgeImage, id } = item;
                        return (
                            <div className="bg-[#fafafa] px-5 py-2 flex justify-between items-center border border-[#F0F0F0] rounded-xl " key={id}> 
                                <span className="font-medium text-lg">{badgeName}</span>
                                <div>
                                    <img src={`http://localhost:5000/image/${badgeImage}`} className="cursor-pointer h-20 object-cover hover:scale-[3] transitionOverlay" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return <>{content}</>
}

export default ListBadges