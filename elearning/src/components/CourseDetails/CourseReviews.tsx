
const CourseReview = () => {
    return (
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
    )
}

export default CourseReview