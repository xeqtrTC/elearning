import { FormEvent, useState } from "react";
import UseAuthHook from "../../hooks/useAuthHook"
import { addReviewMutation } from "../../hooks/mutate";

const CourseReview = ({course_id}: {course_id:number}) => {
    const { username } = UseAuthHook();
    const [showAddReview, setShowAddReview] = useState<boolean>(false);
    const [descriptionOfReview, setDescriptionReview] = useState<string>('');
    console.log(username);
    let addReviewButton = null;
    let usernameButton = null;
    
    const { mutate: reviewMutation } = addReviewMutation();

    const addReviewFn = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            reviewCourseId: course_id,
            descriptionOfReview
        }
        try {
            if (descriptionOfReview) {
                reviewMutation(data);
            }
        } catch (error: any) {

        }
    }
    
    if (username) {
        usernameButton = (
            <div className="flex justify-center py-5">
                <button className="buttonWithHoverWithoutWidth"
                onClick={() => setShowAddReview((prev) => !prev)}
                >
                    {
                        showAddReview ? 'Close review dialog' : 'Open review dialog'
                    }
                </button>
            </div> 
        )
    }

    if (showAddReview) {
        addReviewButton = (
            <div className="justify-center flex flex-col">
                <div className="w-[60%] m-auto space-y-2">
                    <div>
                        <textarea  className="inputEditUser w-full resize-none h-36" onChange={(e) => setDescriptionReview(e.currentTarget.value)} />
                    </div>
                    <div className="flex justify-end">
                        <button className="buttonWithHoverWithoutWidth" onClick={addReviewFn}>Add review</button>
                    </div>
                </div>
            </div>
        )
    }


    const combinedArray = (
        <>
        {usernameButton}
        {addReviewButton}
        </>
    )
    return (
        <div className="py-5"> 
            <div className="bg-[#fff] py-20 font-Barlow">
                    <div className="w-[70%] m-auto">
                        <div className="text-center w-[60%] m-auto flex flex-col space-y-4">
                            <span className="text-4xl font-bold">Don't just take our word for it</span>
                            <span className="text-[#373f49]">Our courses and community have helped 1,000s of Zero To Mastery students go from zero to getting hired to levelling up their skills and advancing their careers to new heights.</span>
                        </div>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="relative py-20">
                            <div className="py-5 absolute top-0 px-10">
                                <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="rounded-full w-32 h-32 object-cover top-[-5]" />
                            </div>
                            <div className="bg-white p-10 rounded-2xl text-black  shadow-[#4c0ffb]/10 shadow-xl">
                                <div className="py-14 flex flex-col">
                                    <span className=" font-medium text-xl">You're not just getting a coding bootcamp course here. You're getting a great educational experience and also becoming a part of a wonderful community which pushes your education and career even further.</span>
                                </div>
                                <div className="bg-[#4c0ffb] h-[3px] w-8 rounded-lg" />
                                <div className="py-6 flex flex-col space-y-1">
                                    <span className="font-bold text-xl">Bosko Bezarevic</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
               combinedArray
            }
        </div>
    )
}

export default CourseReview