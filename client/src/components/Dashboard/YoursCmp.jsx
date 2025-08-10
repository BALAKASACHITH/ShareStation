import {Routes,Route} from 'react-router-dom';
import AllMyItem from './AllMyItem';
import ViewMyItem from './ViewMyItem';
import ViewMyItemRequest from './ViewMyItemRequest';
export default function YoursCmp({items,active,toggleActive}){
    return(
        <div className="YoursCmp">
            <Routes>
                <Route index element={<AllMyItem items={items} active={active} toggleActive={toggleActive} />} />
                <Route path='ViewMyItem' element={<ViewMyItem/>} />
                <Route path='ViewMyItemRequest' element={<ViewMyItemRequest/>} />
            </Routes>
        </div>
    )
}