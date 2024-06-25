import { Square } from "./Square";
import PropTypes from 'prop-types';
import { icons } from "../consts/consts";

export function Board ({board, updateBoard}) {
    return (
        <section className="game">
            {
                board.map((square, index) => {
                    return (
                        <Square key={index} index={index} updateBoard={updateBoard}>
                            {square==1?icons.x:square==-2?icons.o:""}
                        </Square>
                    )
                })
            }
        </section>
    )
}

Board.propTypes = {
    board: PropTypes.array.isRequired,
    updateBoard: PropTypes.func.isRequired
}

