import {Routes,Route} from 'react-router-dom';
import AllMyItem from './AllMyItem';
import ViewMyItem from './ViewMyItem';
import ViewMyItemRequest from './ViewMyItemRequest';
import ViewMyItemRequestDetails from './ViewMyItemRequestDetails';
export default function YoursCmp(){
    return(
        <div className="YoursCmp">
            <Routes>
                <Route index element={<AllMyItem/>} />
                <Route path='ViewMyItem' element={<ViewMyItem/>} />
                <Route path='ViewMyItemRequest' element={<ViewMyItemRequest/>} />
                <Route path='ViewMyItemRequestDetails' element={<ViewMyItemRequestDetails/>} />
            </Routes>
        </div>
    )
}