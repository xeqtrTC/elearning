import { FormEvent, useEffect, useState } from "react"
import { useMutation } from "react-query";
import { addCategory } from "../../../hooks/api";
import { addCategoryMutation } from "../../../hooks/mutate";

const AddCategory = () => {
    const [nameOfCategory, setNameOfCategory] = useState('');

    const changeValueOfCategory = (e: FormEvent<HTMLInputElement>) => {
        setNameOfCategory(e.currentTarget.value);
    }

    const { mutate: addCategoryMutate, isSuccess: addCategorySuccess } = addCategoryMutation({ setNameOfCategory });

    const addCategoryFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            nameOfCategory: nameOfCategory
        }
        addCategoryMutate(data);
    }

    return (
        <div>
            <form onSubmit={addCategoryFunction}>
                <div className="adminPanelGrid  text-[#616161]">
                    <div className="flex flex-col">
                        <label  className="labelEdit">Name of category</label>
                        <input type='text' value={nameOfCategory} name='nameOfCategory' placeholder="Name of category" className="inputEditUser" onChange={changeValueOfCategory}  />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="inputEditUserButton">Add category</button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory