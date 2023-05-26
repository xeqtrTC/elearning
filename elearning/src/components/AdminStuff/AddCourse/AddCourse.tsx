import { FC, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { boolean } from "zod";
import { addCourse } from "../../../hooks/api";
import { addCourseMutation } from "../../../hooks/mutate";
import { getListAllInstructors, getListOfCategories } from "../../../hooks/query";
import { addCourseProps } from "../../Hooks/interfaces";

const AddCourse:FC = () => {

    const [data, setData] = useState<addCourseProps>({
        title: '',
        description: '',
        imageLink: '',
        levelOfCourse: '',
        overview: '',
        biggerOverview: '',
        isPrivate: '',
        instructor_id: null,
        categoryId: null
    })
    const { data: dataInstructors, isLoading, isSuccess } = getListAllInstructors();  
    const { data: dataCategories, isLoading: isLoadingCategories, isSuccess: isSuccessCategories } = getListOfCategories();

    console.log(data);
    const changeValue = (e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setData(prevValue => ({...prevValue, [name]: value}))
    }
    const { mutate: addCourse } = addCourseMutation({ setData });
    
    const addCourseFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data) {
            addCourse(data);
        }
    }
    
    const isEveryFilled = [
        data.description, 
        data.imageLink, 
        data.instructor_id,
        data.levelOfCourse, 
        data.title, 
        data.overview,
        data.biggerOverview, 
        data.isPrivate, 
        data.categoryId
        ].every(Boolean);
    
    // const inputList = [];
    // const [inputCount, setInputCount] = useState<number>(1);
    // const [inputValues, setInputValues] = useState(Array(inputCount).fill(''));

    // const handleInputChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    //     const newInputValues = [...inputValues];
    //     newInputValues[index] = e.currentTarget.value;
    //     setInputValues(newInputValues);
    // };

    // const updateValue = () => {
    //     setInputCount(oldValue => oldValue + 1)
    //     setInputValues(prevInputValues => [...prevInputValues, '']);
    // }

    // const inputList = inputValues.map((value, index) => (
    //     <input type='text' className="border-[#adadad] ml-2 border-[1px] outline-none rounded-md  py-2 px-5" key={index} value={value} onChange={e => handleInputChange(e, index)} />
    //   ));

    return (
        <div >
            <form onSubmit={addCourseFunction}>
                <div className="adminPanelGrid  text-[#616161]">
                    <div className="flex flex-col">
                        <label className="labelEdit">Name of the course</label>
                        <input 
                        type='text' name='title' value={data.title} onChange={changeValue} 
                        className="inputEditUser" />
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">Description</label>
                        <input type='text' value={data.description} name='description' onChange={changeValue}
                        className="inputEditUser" />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="labelEdit">Overview of the course</label>
                        <textarea className="resize-none inputEditUser h-[10rem]" value={data.overview} name="overview" onChange={changeValue} />
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">Bigger overview of the course</label>
                        <textarea className="resize-none inputEditUser h-[10rem]" value={data.biggerOverview} name="biggerOverview" onChange={changeValue} />
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">List of categories</label>
                        <select className="inputEditUser text-black" name='categoryId' onChange={changeValue}>
                            <option></option>
                            {
                                dataCategories?.map((item) => {
                                    const { id, nameOfCategory } = item;
                                    return (
                                        <option value={id} key={id} >{nameOfCategory}</option>
                                    )

                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">List of instructors</label>
                        <select className="inputEditUser text-black" name='instructor_id' onChange={changeValue}>
                            <option></option>
                            {
                                dataInstructors?.map((item) => {
                                    const { id, usernameOfInstructor } = item;
                                    return (
                                        <option value={id} key={id} >{usernameOfInstructor}</option>
                                    )

                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">What's level of this course?</label>
                        <input type='text' value={data.levelOfCourse} name='levelOfCourse' onChange={changeValue}
                        className="inputEditUser" />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="labelEdit">IMAGE LINK (TEST)</label>
                        <input type='text' value={data.imageLink} name="imageLink" onChange={changeValue}
                        className="inputEditUser" />
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">Is this course private?</label>
                        <select className="inputEditUser text-black" name='isPrivate' onChange={changeValue}>
                            <option></option>
                            <option value={'true'}>True</option>
                            <option value={'false'}>False</option>
                        </select>

                    </div>
                </div>
                <div className="py-2 flex justify-end">
                    <button className="inputEditUserButton" disabled={!isEveryFilled}>Add course!</button>
                </div>
            </form>
         </div>
                
         
               
                
    )
}

export default AddCourse;