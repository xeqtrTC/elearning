import { useState } from "react";
import { useMutation } from "react-query";
import { addRolesToUser } from "../../../hooks/api";
import { getAllUsersQuery } from "../../../hooks/query"
import { getUserInfoProps } from "../../Hooks/interfaces";
import EditUsers from "./EditUsers";
import LoaderSpinner from "../../../UI/LoaderSpinner";

const ListOfUsers = () => {

    const { data, isLoading, isSuccess } = getAllUsersQuery();
    const [userInfoID, setUserInfoID] = useState<number | null>(null)

    

    const userInfoAddID = ({ id }: getUserInfoProps) => {
        setUserInfoID(id)
    }
    const userInfoClose = () => setUserInfoID(null);
    let userInfoButton;
    
    if (userInfoID) {
        userInfoButton = (
            <EditUsers userInfoID={userInfoID} userInfoClose={userInfoClose} /> 
        )
    }
    let content;
    const combinedButtons = (
        <>
        {userInfoButton}
        </>
    )
    if (isLoading) {
        content = <LoaderSpinner />
    }
    if(isSuccess && data) {
        content = (
            <>
            {combinedButtons}
                <div> 
                    <div className="divMainPageMap">
                        <div className="space-x-5 flex">
                            <div className="w-28">
                                <span>Name of user</span>
                            </div>
                            <div>
                                <span>Name of roles</span>
                            </div>
                        </div>

                        {
                            data.map((item) => {
                                const { name, username, id } = item;
                                return (
                                    <div className="space-x-5 flex" key={id} onClick={() => userInfoAddID({id})}>
                                        <div className="w-28">
                                            <span>{username}</span>
                                        </div>
                                        <div>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            
            </>
        )
    }

    return <>{content}</>
}

export default ListOfUsers