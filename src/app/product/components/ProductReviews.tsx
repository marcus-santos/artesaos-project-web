import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import {BiFilter} from "react-icons/bi"

interface ITotalEstrelas{
    estrelas: number;
}

interface Filtro{
    text ?: string;
    estrelas: number;
    onClick: () => void;
}

function TotalEstrelas({ estrelas }: ITotalEstrelas) {
    return (
        <div className="flex">
            {Array.from({ length: estrelas }, (_, index) => (
                <FaStar key={index} className="text-yellow-400" />
            ))}
        </div>
    );
}

function FiltroEstrelas({estrelas, onClick, text}: Filtro){
    return (
        <button className="flex items-center gap-2 cursor-pointer p-1 border border-[#82BC92] rounded-sm" onClick={onClick}>
            {text && <span className="text-sm text-gray-600 font-bold">{text}</span>}
            {!text && <span className="text-sm text-gray-600 font-bold">{estrelas}.0</span>}
            {!text && (
                <div className="flex">
                    {Array.from({ length: estrelas }, (_, index) => (
                        <FaStar key={index} className="text-yellow-400" />
                    ))}
                </div>
            )}
        </button>
    );
}


function ProductReviews(){
    return(
        <div>
            <div className="grid grid-cols-3 justify-center items-center gap-4 p-4 bg-[#FFFFFF] rounded-lg shadow-lg mt-2">
                <div className="flex flex-col justify-center items-center font-bold p-5 ">
                    <h2>5.0</h2>
                    <TotalEstrelas estrelas={5}/>
                </div>

                <div className="flex justify-center items-center gap-2 col-span-2">
                    <div className="flex flex-wrap gap-2">
                        <FiltroEstrelas text="todos(100+)" estrelas={0} onClick={() => alert('Filtrando todos')} />  
                        <FiltroEstrelas estrelas={5} onClick={() => alert('Filtrando por 5 estrelas')} />
                        <FiltroEstrelas estrelas={4} onClick={() => alert('Filtrando por 4 estrelas')} />
                        <FiltroEstrelas estrelas={3} onClick={() => alert('Filtrando por 3 estrelas')} />
                        <FiltroEstrelas estrelas={2} onClick={() => alert('Filtrando por 2 estrelas')} />  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews;