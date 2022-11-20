import React, { useState, useEffect } from 'react';
import { CaseProps } from '../../interface';
import Item from '../Item';
import styles from './style.module.scss';
import { Draggable } from "react-beautiful-dnd";
import Input from '../Input';
import { collection, addDoc, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { useFirebase } from '../../context/FirebaseContext';

const Case: React.FC<CaseProps> = props => {
    const [list, setList] = useState<any[]>([]);
    const { db, currentUser } = useFirebase();
    const todosRef = collection(db, "todos");
    const [form, setForm] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addDoc(todosRef, {
            case: props.case,
            isCompleted: false,
            text: form,
            uid: currentUser.uid
        }).then(() => setForm(""))
    }

    const getTodos = async () => {
        const q = query(collection(db, "todos"), where("case", "==", props.case), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setList(data);
        });
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <i className="bi bi-record-circle" />
                <h6>{props.title}</h6>
            </div>
            <div className={styles.list}>
                <form onSubmit={onSubmit}>
                    <Input
                        icon={<i className='bi bi-plus-circle-dotted' />}
                        inputProps={{
                            placeholder: 'Write and press enter...',
                            onChange: e => setForm(e.target.value),
                            value: form,
                        }}
                    />
                </form>
                <hr />
                {
                    list.length > 0
                        ?
                        list.map((val, index) =>
                            <Draggable key={index} draggableId={val.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Item
                                            key={index}{...val} />
                                    </div>
                                )}
                            </Draggable>
                        )
                        :
                        <div className={styles.alert}>
                            <i className="bi bi-exclamation-circle" /> There were no results. Let's add new...
                        </div>
                }
            </div>
        </div >
    )
}

export default Case;