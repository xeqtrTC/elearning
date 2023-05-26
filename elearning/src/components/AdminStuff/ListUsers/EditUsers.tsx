import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { getUserInfo } from "../../../hooks/query"
import { addRoleToUserFunctionProps, addRoleToUserProps, dataInfoStateProps, userInfoIDProps } from "../../Hooks/interfaces"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useMutation, useQueryClient } from "react-query";
import { addRolesToUser, editUserProfile, removeRoleFromUser } from "../../../hooks/api";
import { AxiosError, isAxiosError } from "axios";
import UseContextState from "../../../hooks/UseELearningContext";
import ShowError from "../../ShowError/ShowError";
import { addRoleToUserMutation, editUserMutation, removeRoleFromUserMutation } from "../../../hooks/mutate";
const EditUsers = ({ userInfoID, userInfoClose }: userInfoIDProps) => {
    const queryClient = useQueryClient();
    const { data, isSuccess, isError, error: ReactQueryError, isLoading, isFetched } = getUserInfo(userInfoID);
    const [addRoleSelectedId, setAddRoleSelectedId] = useState<number | null>(null);
    const [removeRoleSelectedID, setRemoveRoleSelectedID] = useState<number | null>(null); 
    const [youSureToSave, setYouSureToSave] = useState<boolean>(false);
    const { error, setError } = UseContextState();
    console.log(data);
    const [dataInfoState, setDataInfoState] = useState<dataInfoStateProps>({
        id: null,
        username: '',
        email: '',
        verificated: ''
    })
    
    const { mutate: editUser, isSuccess: isSuccessEditUser } = editUserMutation();
    const { mutate: removerole } = removeRoleFromUserMutation();
    const { mutate: addRole } = addRoleToUserMutation();
    const editUserProfileFunction = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            id: dataInfoState.id,
            username: dataInfoState.username,
            email: dataInfoState.email
        }
        editUser(data)
    }
    const addRoleToUserFunction = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            idOfRole: addRoleSelectedId,
            idOfUser: dataInfoState.id
        }
        addRole(data)
    }
    const removeRoleFromUserFunction = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            idOfRole: removeRoleSelectedID,
            idOfUser: dataInfoState.id
        }
        removerole(data);
    }
    const closeYouWantToSave = () => {
        setError('');
        setYouSureToSave(false);
    }
    const changeAddRoleSelectValue = (e: FormEvent<HTMLSelectElement>) => {
        setAddRoleSelectedId(parseInt(e.currentTarget.value))
    }
    const changeRemoveRoleSelectValue = (e: FormEvent<HTMLSelectElement>) => {
        setRemoveRoleSelectedID(parseInt(e.currentTarget.value))
    }
    const onChangeValueDataInfo = (e: FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value
        setDataInfoState((prevData) => ({...prevData, [name]: value}))
    }
    let content;
    if (isLoading) {
        content = (
            <div className="flex justify-center items-center h-full">
                <ImSpinner9 className='animate-spin w-12 h-12 text-red-500' />
            </div>
        )
    }
    if (isError) {
        content = (
            <div>
                That user doesn't exist
            </div>
        )
    }
    
    useEffect(() => {
        if(isSuccess && data) {
            setDataInfoState({
                id: data?.id!,
                username: data?.username!,
                email: data?.email!,
                verificated: data?.isVerificated === true ? 'Verificated' : 'Not verificated'!
            })
            setAddRoleSelectedId(data?.rolesToBeAdded[0]?.id ? data?.rolesToBeAdded[0]?.id : null)
            setRemoveRoleSelectedID(data?.rolesThatBelong[0]?.id ? data?.rolesThatBelong[0]?.id : null)
        }
    }, [isSuccess, data])

    let youSureToSaveButton;
    if (youSureToSave) {
        youSureToSaveButton = (
                <div className="fixed top-0 left-0 bg-black/60 h-full w-full flex justify-center items-center">   
                    <div className="bg-white w-[30%] h-[30%] rounded-md p-5 ">
                        <div className="flex justify-end">
                            <AiOutlineCloseCircle className="w-7 h-7 cursor-pointer hover:scale-110" onClick={closeYouWantToSave} />
                        </div>
                        <div className="py-10 flex items-center justify-center ">
                            <div className="h-full">
                                <span className="text-xl font-medium">Are you sure you want to save this?</span>
                                    { error && 
                                    <div className="space-x-5 flex justify-center py-3">
                                        <ShowError error={error} /> 
                                    </div>
                                    }   
                                <div className="space-x-5 flex justify-center py-3">
                                    <button className="inputEditUserButton" onClick={editUserProfileFunction}>Yes</button>
                                    <button className="inputEditUserButton" onClick={closeYouWantToSave}>No</button>
                                </div>      
                            </div>                                   
                        </div>
                    </div>
                </div>
        )
    }
    if (isSuccess) {
        const { username, id, email, isVerificated, rolesThatBelong, rolesToBeAdded } = data!;
        const rolesThatBelongButton = rolesThatBelong?.map((item) => {
            const { id, name } = item;
            return (
                <option key={id}>{name}</option>
            )
        })
        const rolesThatBelongToRemoveButon = rolesThatBelong.length === 0 ? (
            <div>
                <span className="text-[#616161] text-xl">This doesn't have any role!</span>
            </div>
        ) : (
            <div className="flex flex-col text-[#616161] py-2">
                <label className="text-[#616161] py-1 px-2 font-medium">Remove roles of this user</label>
                <select className="inputEditUser" onChange={changeRemoveRoleSelectValue}>
                    {
                        rolesThatBelong?.map((item) => {
                            const { id, name } = item;
                            return (
                                <option value={id} key={id}>{name}</option>
                            )
                        })
                    }
                </select>
                <div className="justify-end flex py-2">
                    <button className="inputEditUserButton" onClick={removeRoleFromUserFunction}>Remove role</button>
                </div>
            </div> 
        )
        const rolesToBeAddedButton =  rolesToBeAdded.length === 0 ? (
            <div>
                <span className="text-[#616161] text-xl">This user belongs to every role!</span>
            </div>
        ) : (
            <div className="flex flex-col text-[#616161] py-2">
                <label className="text-[#616161] py-1 px-2 font-medium">Add roles to this user</label>
                <select className="inputEditUser" onChange={changeAddRoleSelectValue}>
                {
                    rolesToBeAdded?.map((item) => {
                        const { id, name } = item;
                        return (
                            <option value={id} key={id}>{name}</option>
                            )
                        })
                    }
                </select>
                <div className="justify-end flex py-2">
                    <button className="inputEditUserButton" onClick={addRoleToUserFunction}>Add role</button>
                </div>
            </div>

        )
        content = (
            <div>
                {youSureToSaveButton}
                <div className="flex space-x-5 items-center">
                        <div className="flex  flex-col  items-center ">
                            <div>
                                <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className=" w-44 h-44 object-cover rounded-full" />
                            </div>
                            <div className="flex justify-center  mt-2">
                                <span className="font-medium text-xl">{username}</span>
                            </div>
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-5">
                            <div className="flex flex-col text-[#616161]">
                                <label className="text-[#616161] py-1 px-2 font-medium">Username</label>
                                <input type='text' name='username' onChange={onChangeValueDataInfo} value={dataInfoState.username} className="inputEditUser" />
                            </div>
                            <div className="flex flex-col text-[#616161]">
                                <label className="text-[#616161] py-1 px-2 font-medium">Email</label>
                                <input type='text' name='email' onChange={onChangeValueDataInfo} value={dataInfoState.email} className="inputEditUser" />
                            </div>
                            <div className="flex flex-col text-[#616161]">
                                <label className="text-[#616161] py-1 px-2 font-medium">Verificated</label>
                                <input type='text' name='Verificated' disabled={true} onChange={onChangeValueDataInfo} value={dataInfoState.verificated} className="inputEditUser" />
                            </div>
                            <div className="flex flex-col text-[#616161]">
                                <label className="text-[#616161] py-1 px-2 font-medium">Roles of this user</label>
                                <select className="inputEditUser">
                                    {rolesThatBelongButton}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#0E111E] py-2 px-3 rounded-md text-white font-medium" onClick={() => setYouSureToSave(true)}>Save changes</button>
                    </div>
                    {rolesToBeAddedButton}             
                    {rolesThatBelongToRemoveButon}
                </div>
        )
    }

    return (
        <div className="fixed top-0 left-0 w-full bg-black/30 h-screen flex justify-center items-center">
            <div className="bg-white rounded-md w-[80%] h-[80%] p-10">
                <div className="flex justify-end">
                    <AiOutlineCloseCircle className="w-7 h-7 cursor-pointer hover:scale-110" onClick={userInfoClose} />
                </div>
                {content}
            </div>
        </div>
    )
}

export default EditUsers