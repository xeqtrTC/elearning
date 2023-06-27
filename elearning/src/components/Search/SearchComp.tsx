import { FC, useEffect, useRef, useState } from "react";
import { IoSearch } from 'react-icons/io5'
import { getAllCoursesQuery } from "../../hooks/query";
import { AllCourseDetailsArray, courseArray } from "../Hooks/interfaces";
import CoursesSearch from "./CoursesSearch";
const SearchComp: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { data, isLoading, isSuccess } = getAllCoursesQuery()
    const inputRef = useRef<HTMLInputElement>(null);
    const [holdData, setHoldData] = useState<AllCourseDetailsArray[]>([])
    const getDataByName = () => {
        const filterData = data?.filter((item: AllCourseDetailsArray) => {
            return item.title.toLowerCase().includes(searchValue);
        })
        setHoldData(filterData!);
    }

    useEffect(() => {
        if(searchValue.length > 2) {
            getDataByName();
        } else if (searchValue.length < 2 ) {
            setHoldData([]);
        }
    }, [searchValue])

    return (
        <div className=" text-[#0E111E] p-6 flex flex-col md:flex-row md:justify-between items-center">
            <div className="relative">
                <div className="flex items-center">
                    <div className="bg-white flex py-3 rounded-lg px-3 items-center  ">
                        <IoSearch className="text-[#0E111E] w-6 h-6" />
                        <div className="w-[1px] h-5 bg-[#87898F] ml-2 mr-5" >

                        </div>
                        <input type='text'  
                        className="outline-none text-[#0E111E] placeholder:font-medium placeholder:text-[#0E111E] placeholder:text-sm" 
                        placeholder="Find your course..." 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                        ref={inputRef}
                        />
                        
                    </div>
                    {/* <div className="px-4">
                        <button className="bg-transparent  border-[1px] border-white py-3 px-7 rounded-lg font-medium  text-white">Search</button>
                    </div> */}
                </div>
                {
                    searchValue.length > 2 && (
                        <div className="text-white absolute py-3 px-2 bg-white shadow-md w-[30rem] mt-2 rounded-md z-[60]">
                            {
                                searchValue.length > 2 && holdData.length === 0 ? (
                                    <p className="text-black">Empty</p>
                                ) : (
                                        holdData.map((item: AllCourseDetailsArray) => {
                                            return (
                                                <CoursesSearch {...item} />
                                            )
                                        })
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div className="flex items-center space-x-5">
                <div>
                    <button className="bg-white py-3 px-10 font-bold rounded-lg">Add new course</button>
                </div>
                <div>
                    <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="w-12 h-12 object-fit rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default SearchComp