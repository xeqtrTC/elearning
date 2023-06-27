import { ListRequirmentTypeQuery } from "../hooks/query";

const RequirmentTypeMap = () => {
    const { data } = ListRequirmentTypeQuery();

    return (
        <div>
            {
                data?.map((item) => {
                    return (
                        <div key={item.id}>
                            <span>{item.requirement}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RequirmentTypeMap