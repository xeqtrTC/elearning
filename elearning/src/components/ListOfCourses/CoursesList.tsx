import { FC, useEffect, useState } from "react";
import { getAllCoursesQuery, getListOfCategories } from "../../hooks/query";
import CourseTab from "../CourseTab/CourseTab";
import { AiOutlineClose } from 'react-icons/ai'
import { AllCourseDetailsArray } from "../Hooks/interfaces";
import Loading from "../Loading/Loading";
import CourseListHolder from "../ForReUse/CourseListHolder";
import SubscribeInput from "../SubscribeInput/SubscribeInput";

const CoursesList = () => {
    const [arrayOfData, setArrayOfData] = useState<AllCourseDetailsArray[]>();
    const [lengthOfArray, setLengthOfArray] = useState<number | undefined>(undefined);
    const [allCategoriesActive, setAllCategoriesActive] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const { data, isSuccess, isLoading } = getAllCoursesQuery();
    const { data: dataCategory, isLoading: isLoadingCategory, error: errorCategory, isError: isErrorCategory } = getListOfCategories();
    
    useEffect(() => {
        if (data && isSuccess) {
            setArrayOfData(data);
            setAllCategoriesActive(true);
        }
    }, [data, isSuccess])

    const resetEverythingCategory = () => {
        setArrayOfData(data);
        setAllCategoriesActive(true);
        setLengthOfArray(undefined);
        setActiveCategory(null);
    }
    const filterItems = (id: number) => {
        const filteredItemsArray = data?.filter((item) => item.categoryId === id);
        if (filteredItemsArray) {
            setArrayOfData(filteredItemsArray);
            setLengthOfArray(filteredItemsArray?.length);
            setAllCategoriesActive(false);
            setActiveCategory(id);
        }
    }
    const allCategoriesButton = () => {
        setArrayOfData(data);
        setLengthOfArray(data?.length);
        setAllCategoriesActive(true);
        setActiveCategory(null);
    }

    let content;
    if (isLoading) {
        content = (
            <Loading />
        )
    }
    if (isSuccess) {
        
        content = (
            <>
                <div className="responsiveNormal">
                    <div className="py-10 px-10 md:px-0 overflow-y-auto  ">
                            <div className="py-10 justify-between  flex flex-col md:flex-row md:justify-between font-Barlow">
                                <div className="md:w-[70%] flex flex-col space-y-5 ">
                                    <span className="font-bold text-4xl">Zero To Mastery Academy Courses</span>
                                    <span className="text-3xl font-thin">There is a ZTM course for every step in your career. From coding bootcamps taking absolute beginners from zero to getting hired, to advanced courses that experienced professionals use to upskill and advance their career.</span>
                                </div> 
                                <div className="mt-5 md:mt-0 md:w-[30%] flex md:justify-end">
                                    <div className="w-full shadow-xl flex flex-col md:w-[18rem] p-5 space-y-1">
                                        <span className="font-bold text-lg">Not sure what course to take? Not sure where to start? We'll help you find the right path 👇</span>
                                        <div className="py-2">
                                            <button className="bg-[#0E111E] w-full text-white py-2 rounded-[14rem] font-medium">HELP ME FIND THE WAY</button>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-5">
                                <div className="border py-10 px-10 rounded-3xl z-50">
                                    <div className="flex flex-col md:flex-row md:justify-center md:space-x-5 space-y-5 md:space-y-0">
                                        <button className={`buttonWithHoverWithoutWidth ${allCategoriesActive ? 'bg-[#4c0ffb] text-white' : null}`} onClick={allCategoriesButton}>ALL COURSES</button>
                                        {
                                            dataCategory?.map((item) => {
                                                const { id, nameOfCategory } = item;
                                                return (
                                                    <button onClick={() => filterItems(id)} className={`buttonWithHoverWithoutWidth ${ id === activeCategory ? 'bg-[#4c0ffb] text-white' : null }`} key={id}>{nameOfCategory}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex justify-center  px-2 h-0" >
                                    <div className="relative bg-white px-10 h-11" style={{ marginTop: '-25px'}}>
                                        <span className="text-bold text-4xl">Explore courses</span>
                                    </div>
                                </div>
                            </div>
                            {
                                lengthOfArray ? (
                                    <div className="flex items-center py-5">
                                        <div>
                                            <span className="text-2xl font-bold">Showing {lengthOfArray} results</span>
                                        </div>
                                        <div className="px-3 flex items-center space-x-3 font-medium text-[#4c0ffb]">
                                            <AiOutlineClose className="w-5 h-5" />
                                            <span className="hover:border-b border-[#4c0ffb] cursor-pointer" onClick={resetEverythingCategory}>RESET</span>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        {
                            arrayOfData!?.length > 0 ? (
                                <CourseListHolder data={arrayOfData} />
                            ) : (
                                <span>There isnt any course</span>
                            )
                        }
                    <div>
                        <SubscribeInput />
                    </div>
                </div>
                </>
        )
    }
    return <>{content}</>
}

export default CoursesList