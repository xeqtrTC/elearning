import { FormEvent } from "react";
import { removeQuizzMutation } from "../../../hooks/mutate";
import { listAllQuizzQuery } from "../../../hooks/query"
import { Link } from "react-router-dom";

const QuizzList = () => {
    const { isLoading, data, isSuccess } = listAllQuizzQuery();
    console.log(data);
    const { mutate: deleteQuizzMutation } = removeQuizzMutation();

    const deleteQuizzFn = ({e, quizz_id}: {e: FormEvent<HTMLButtonElement>, quizz_id: number}) => {
        e.preventDefault();
        const data = {
            quizz_id
        }
        try {
            deleteQuizzMutation(data);
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div>
            {
                data?.map((item) => {
                    const { quizz_id, quizz_name } = item;
                    return (
                        <div className="flex justify-between" key={quizz_id}>
                            <div>
                                <Link to={`${quizz_id}`}>
                                    {quizz_name}
                                </Link>
                            </div>
                            <div>
                                <button onClick={(e) => deleteQuizzFn({e, quizz_id})}>delete</button>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default QuizzList