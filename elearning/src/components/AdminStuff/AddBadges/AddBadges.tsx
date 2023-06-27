import { FormEvent, useEffect, useState } from "react"
import { addBadgeMutation } from "../../../hooks/mutate"
import { ListBadgeCriteriaForBadgesQuery } from "../../../hooks/query"
import { IoCloseOutline } from 'react-icons/io5'
import { v4 } from "uuid"
import courseHolderJSON from '../../../DummyData/courseHolderJSON.json'
import { listBadgeCriteriaPros } from "../../Hooks/interfaces"
import RequirmentTypeMap from "../../../UI/RequirmentTypeMap"

const AddBadges = () => {

    const [nameOfBadge, setNameOfBadge] = useState<string>('')
    const [imageOfBadge, setImageOfBadge] = useState<File | null>(null)
    const [courseFilter, setCourseFilter] = useState<string>('');
    const [error, setError] = useState<string>('')
    const [courseHolder, setCourseHolder] = useState<listBadgeCriteriaPros[]>([]);
    const [coursesPickedHolder, setCoursesPickedHolder] = useState<{course_id: number | null, requirement: string}>({
        course_id: null,
        requirement: ''
    })
    const { mutate } = addBadgeMutation();
    const { data } = ListBadgeCriteriaForBadgesQuery();
    console.log(data);
    const updatePhoto = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setImageOfBadge(e.currentTarget.files[0])
        }
    }
    const filterCourseData = () => {
        const filteredData = data?.filter((item) => {
            console.log(item.requirmentBadge.requirement);
            return item.requirmentBadge.requirement.toLowerCase().includes(courseFilter.toLowerCase());
        })
        setCourseHolder(filteredData!)
    }
    const removeFilteredCourse = () => {
        setCoursesPickedHolder({
            course_id: null,
            requirement: ''
        })
    }
    const filterPickedCourseData = ({ id, requirement}:{id: number, requirement: string}) => {
        try {
            setCoursesPickedHolder({
                course_id: id,
                requirement: requirement
            })
            setCourseFilter('')
        } catch (error) {

        }
    }
    useEffect(() => {
        if (courseFilter.length > 3) {
            filterCourseData()
        } else if (courseFilter.length < 2) {
            setCourseHolder([])
        }
    }, [courseFilter])
    const onChangeFilter = (e: FormEvent<HTMLInputElement>) => {
        setCourseFilter(e.currentTarget.value);
    }
    const addBadgeFn = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('imageOfBadge', imageOfBadge as File)
        newFormData.append('nameOfBadge', nameOfBadge)
        newFormData.append('badgeCriteriaId', coursesPickedHolder?.course_id!.toString())
        try {
            if (nameOfBadge && imageOfBadge) {
                mutate(newFormData)
                setNameOfBadge('')
                setImageOfBadge(null)
                setCoursesPickedHolder({
                    course_id: null,
                    requirement: ''
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex gap-5">
            <div className="basis-1/1">
                <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col">
                        <label className="labelEdit">Name of the badge</label>
                        <input 
                        type='text' name='nameOfBadge' 
                        className="inputEditUser" 
                        value={nameOfBadge}
                        onChange={(e) => setNameOfBadge(e.currentTarget.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="labelEdit">Badge image</label>
                        <input 
                        type='file' name='imageOfBadge' 
                        className="inputEditUser" onChange={updatePhoto} />
                    </div>
                    <div className="flex flex-col ">
                        <label className="labelEdit">Please select ONE badge criteria, list will be on the right.</label>
                        <div className="inputEditUser flex space-x-2 w-full">
                            {
                                coursesPickedHolder.requirement && (
                                    <div className="bg-[#E5E5E5] flex  items-center space-x-2 px-3 rounded-md font-medium w-36 ">
                                        <span>{coursesPickedHolder.requirement}</span>
                                        <IoCloseOutline className="h-5 w-5 cursor-pointer" onClick={removeFilteredCourse} />
                                    </div>
                                )
                            }
                            <input 
                            type='text' name='imageOfBadge' 
                            value={courseFilter}
                            className="bg-transparent  outline-none w-full" onChange={onChangeFilter} />
                        </div>
                        {
                            courseHolder?.length > 0 && (
                                <div className="bg-[#fafafa] border border-[#F0F0F0] py-2 mt-2 rounded-md px-2">
                                    {
                                        courseHolder?.map((item) => {
                                            const { id, requirmentBadge } = item
                                            const requirement = requirmentBadge.requirement
                                            return (
                                                <div key={id} onClick={() => filterPickedCourseData({id, requirement})}>
                                                    <span>{requirmentBadge.requirement}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                    {/* <div className="flex flex-col">
                        <label className="labelEdit">Requirement type, if it's only for one course please write Indvidiual if</label>
                        <input 
                        type='text' name='nameOfBadge' 
                        className="inputEditUser" 
                        value={nameOfBadge}
                        onChange={(e) => setNameOfBadge(e.currentTarget.value)} />
                    </div> */}
                    
                    
                </div>
                <div className="flex justify-end py-3">
                    <button onClick={addBadgeFn}>Add badge</button>
                </div>
            </div>
                
            <div className=" basis-1/3 w-full">
                <div className="bg-[#0E111E] text-white w-full  p-2 text-bold text-lg rounded-md">
                    <RequirmentTypeMap />
                </div>
            </div>
        </div>
    )
}

export default AddBadges