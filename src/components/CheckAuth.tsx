import { useFirebase } from '../context/FirebaseContext';
import Login from './Login'
import Todos from './Todos'

function CheckAuth() {
    const { currentUser } = useFirebase();
    return (
        <main>
            {
                !currentUser &&
                <Login />
            }
            {
                currentUser &&
                <Todos />
            }
            <footer>created by <a href='https://github.com/mcavlak' target='_blank'>Mustafa Cavlak</a></footer>
        </main>
    )
}

export default CheckAuth