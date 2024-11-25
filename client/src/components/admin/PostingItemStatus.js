import {observer} from "mobx-react-lite";

const PostingItemStatus = ({status}) => {

    return (
        <div className={`posting-item-status posting-item-${status}`}>
            {status === 'done' ? 'Përfunduar' : status === 'undone' ? 'Aktive' : 'Në Teren'}
        </div>
    )
}

export default observer(PostingItemStatus);