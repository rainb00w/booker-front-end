import ReactStars from "react-rating-stars-component";
import star from '../../bookTable/symbol-defs.svg'
import s from './ChooseRating.module.css'


const ChooseRating = ({ rating = 0, setRating }) => {
    return (
        <div className={s.mainBox}>
            <ReactStars
                size={17}
                count={5}
                value={rating}
                color='#A6ABB9'
                activeColor='#FF6B08'
                a11y={true}
                emptyIcon={<svg width={17} height={17}>
                    <use href={`${star}#gray_star`}></use>
                </svg>}
                filledIcon={<svg width={17} height={17}>
                    <use href={`${star}#yellow_star`}></use>
                </svg>}
                onChange={newValue => { setRating(newValue) }}
            />
        </div>
    );
};


export default ChooseRating;