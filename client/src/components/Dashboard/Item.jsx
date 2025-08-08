const Item = ({key, itemName, rent, imgurl, from}) => {
    return (
        <div key={key} className='Item'>
            <div
                className='ItemImage'
                style={{
                    backgroundImage: `url(${imgurl})`,
                }}
            >
            </div>
            <div className='ItemFooter'>
                <div className='ViewButton'>
                    View
                </div>
                <div className='WantItButton'>
                    WantIt
                </div>
            </div>
        </div>
    )
}
export default Item;