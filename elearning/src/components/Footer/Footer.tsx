import { FC } from "react";
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { TfiLinkedin } from 'react-icons/tfi'

const Footer:FC = () => {
    return (
        <div className="bg-black font-Barlow ">
            <div className="w-[70%] m-auto text-white">
                <div className="grid grid-cols-2 md:grid-cols-7 border-b py-20 border-[#373f49]">
                    <div className="col-span-12 md:col-span-4">
                        <span>WHITE SOMEHTING</span>
                        {/* <img src='https://nextjs.org/static/images/case-studies/hulu/next.js.svg' /> */}
                    </div>
                    <div className="col-span-8 md:col-span-1">
                        <p className="pb-5 text-xl">Quick Links</p>
                        <div className="flex flex-col space-y-2 border-white cursor-pointer">
                            <div>
                                <span className="hover:border-b-2 ">Home</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Pricing</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Testimonials</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Blog</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Community</span>
                            </div>
                        </div>  
                    </div>
                    <div className=" col-span-4 md:col-span-1 ">
                        <p className="pb-5 text-xl">The Academy</p>
                        <div className="flex flex-col space-y-2 cursor-pointer">
                            <div>
                                <span className="hover:border-b-2  ">Courses</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Career Paths</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Workshops & More</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Career Path Quiz</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Free Resources</span>
                            </div>
                        </div>  
                    </div>
                    <div className="mt-5 md:mt-0">
                        <p className="pb-5 text-xl">Company</p>
                        <div className="flex flex-col space-y-2 cursor-pointer">
                            <div>
                                <span className="hover:border-b-2 ">About ZTM</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Swag Store</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Ambassadors</span>
                            </div>
                            <div>
                                <span className="hover:border-b-2 ">Contact us</span>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="py-8 flex flex-col md:flex-row md:justify-between items-center">
                    <div className="flex space-x-5 items-center">
                        <div className="buttonHoverButtons">
                            <AiFillGithub className="w-5 h-5" />
                        </div>
                        <div className="buttonHoverButtons">
                            <AiFillTwitterCircle className="w-5 h-5" />
                        </div>
                        <div className="buttonHoverButtons">
                            <TfiLinkedin className="w-5 h-5" />
                        </div>
                        <div className="buttonHoverButtons">
                            <BsFacebook className="w-5 h-5"/>
                        </div>
                        <div className="buttonHoverButtons">
                            <BsInstagram className="w-5 h-5"/>
                        </div>
                        <div className="buttonHoverButtons">
                            <AiFillYoutube className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <span className="font-bold">Copyright © 2023, Zero To Mastery Inc.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer