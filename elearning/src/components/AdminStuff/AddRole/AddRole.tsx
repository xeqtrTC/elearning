import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addRole, removeRole, updateRoleNameAPI } from "../../../hooks/api";
import { getAllRolesQuery } from "../../../hooks/query";
import { removeRoleFunctionProps, rolesProps, updateRoleProps } from "../../Hooks/interfaces";
import { RiDeleteBin2Line } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import LoaderSpinner from "../../../UI/LoaderSpinner";
const AddRole = () => {
    const queryClient = useQueryClient();
    const { data, isSuccess, isLoading } = getAllRolesQuery();
    const [addRoleName, setAddRoleName] = useState<string>('');
    const [updateRole, setUpdateRole] = useState<number | null>(null);
    const [updateRoleName, setUpdateRoleName] = useState<string>('');
    const removeRoleMutation = useMutation(removeRole, {
        onSuccess: () => {
            queryClient.invalidateQueries('allRoles') 
        }
    }  )
    const addRoleMutation = useMutation(addRole, {
        onSuccess: () => {
            setAddRoleName('');
            queryClient.invalidateQueries('allRoles')
        }
    })
    const updateRoleNameMutation = useMutation(updateRoleNameAPI, {
        onSuccess: () => {
            setUpdateRole(null);
            setUpdateRoleName('');
            queryClient.invalidateQueries('allRoles')
        }
    })
    const addRoleFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (addRoleName) {
                addRoleMutation.mutate({addRoleName});
            }
        } catch (error) {
            console.log(error);
        }
    }
    const removeRoleFunction = ({e, id}: removeRoleFunctionProps) => {
        e.preventDefault();
        try {
            removeRoleMutation.mutate({id});
        } catch (error) {
            console.log(error);
        }
    }
    const updateRoleNameFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = updateRole
        const name = updateRoleName
        try {
            updateRoleNameMutation.mutate({id, name})
        } catch (error) {
            console.log(error);
        }
    }
    const setUpdateTrue = ({ id, name }: updateRoleProps) => {
        setUpdateRole(id);
        setUpdateRoleName(name)
    }
    const setUpdateFalse = () => {
        setUpdateRole(null);
        setUpdateRoleName('');
    }
    let content;
    if (isLoading) {
        content = <LoaderSpinner />
    }
    if (isSuccess) {
        content = (
            <div className="space-y-3">
                <div className="divMainPageMap">
                    {
                        data?.map((item) => {
                            const { name, id } = item;
                            return (
                                <div key={id} className='cursor-pointer flex justify-between items-center group '>
                                    <div className="py-1">
                                        <span>{name}</span>
                                    </div>
                                    <div className="space-x-3">
                                        <AiOutlineEdit 
                                        className="hidden
                                        group-hover:inline 
                                        transitionOverlay 
                                        w-6 h-6
                                        hover:scale-110"
                                        onClick={() => setUpdateTrue({name, id})}
                                        />

                                        <RiDeleteBin2Line 
                                        className="hidden
                                        group-hover:inline 
                                        transitionOverlay 
                                        w-6 h-6
                                        hover:scale-110 text-white "
                                        onClick={(e) => removeRoleFunction({id, e})}
                                        />
                                    
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    updateRole ? (
                        <form onSubmit={updateRoleNameFunction}>
                            <div className="bg-[#0E111E] p-3 rounded-md ">
                                <div className="flex justify-end pb-3">
                                    <IoMdClose className="text-white w-6 h-6 hover:scale-110 cursor-pointer" onClick={setUpdateFalse} />
                                </div>
                                <div className="flex justify-between">
                                    <input value={updateRoleName} className='py-1 px-3 rounded-md text-black outline-none' onChange={(e) => setUpdateRoleName(e.currentTarget.value)} />
                                    <div className="flex justify-end">
                                        <button className="bg-white text-black px-2 py-1 rounded-md font-medium ">
                                            Change role name
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : null
                }
                <form onSubmit={addRoleFunction}>
                    <div>
                        <input type='text' 
                        value={addRoleName} 
                        onChange={(e) => setAddRoleName(e.currentTarget.value)} 
                        className='border border-[#c4c4c4] placeholder:text-black py-2 px-5 rounded-md outline-none'
                        placeholder='Name of role'
                        />
                        <div className="flex justify-end ">
                            <button className="bg-[#0E111E] text-white py-2 px-5 rounded-md font-medium">Add role</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }


    return <>{content}</>
}

export default AddRole;