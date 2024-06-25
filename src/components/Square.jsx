import PropTypes from 'prop-types'
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected}`

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}
Square.propTypes = {
    children: PropTypes.string.isRequired,
    isSelected: PropTypes.string.isRequired,
    updateBoard: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}