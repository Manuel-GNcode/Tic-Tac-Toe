import { Square } from "./Square";
import PropTypes from 'prop-types'

export function WinnerModal({winner, resetGame, isSelected}) {
    if (winner == null) return null;

    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {winner == false ?
                        'Empate' :
                        'Ganó:'}
                </h2>

                <header className="win">
                    {winner && <Square isSelected={isSelected}>{winner}</Square>}
                </header>

                <footer>
                    <button className="btn" onClick={resetGame}>Reset game</button>
                </footer>
            </div>
        </section>
    )
}
WinnerModal.propTypes = {
    winner: PropTypes.bool.isRequired,
    resetGame: PropTypes.func.isRequired,
    isSelected: PropTypes.string.isRequired
}