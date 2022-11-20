import React from 'react'
import Case from '../../components/Case';
import styles from './style.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateDoc, doc } from 'firebase/firestore';
import { useFirebase } from '../../context/FirebaseContext';
import { getAuth, signOut } from "firebase/auth";

function Todos() {
    const { db, currentUser } = useFirebase();
    const cases = [
        {
            id: "toDo",
            title: "To Do",
        },
        {
            id: "inProgress",
            title: "In Progress",
        },
        {
            id: "done",
            title: "Done",
        }
    ]

    const onDragEnd = async (e: any) => {
        const { destination, source } = e;
        if (destination && source) {
            const todoRef = doc(db, "todos", e.draggableId);
            await updateDoc(todoRef, {
                case: e.destination.droppableId
            })
        }
    }

    const handleSignOut = async () => {
        const confirm = await window.confirm("Çıkış yapmak istediğinize emin misiniz?")
        if (confirm) {
            const auth = getAuth();
            signOut(auth)
        }
    }

    return (
        <div className={styles.wrapper}>
            <nav>
                <h6>Welcome back, <span>{currentUser.displayName}</span></h6>
                <button onClick={handleSignOut}><i className="bi bi-box-arrow-right" /> Sign out</button>
            </nav>
            <div className={styles.todos}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        cases.map((v, i) =>
                            <Droppable key={i} droppableId={v.id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <Case
                                            case={v.id}
                                            title={v.title}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    }
                </DragDropContext>
            </div>
        </div >
    )
}

export default Todos;