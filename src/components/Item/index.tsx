import React, { useState } from 'react';
import { ItemProps } from '../../interface';
import styles from './style.module.scss';
import { doc, updateDoc } from "firebase/firestore";
import { useFirebase } from '../../context/FirebaseContext';

const Item: React.FC<ItemProps> = props => {
    const { db } = useFirebase();
    const todoRef = doc(db, "todos", `${props.id}`);
    const [edit, setEdit] = useState({
        status: false,
        value: props.text,
    });

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        await updateDoc(todoRef, {
            text: edit.value,
        }).then(() => handleClose())
    };

    const handleClose = () => {
        setEdit({
            status: false,
            value: props.text,
        });
    }

    const updateIsCompleted = async () => {
        await updateDoc(todoRef, {
            isCompleted: !props.isCompleted
        })
    }

    return (
        <form
            onDoubleClick={() => !edit.status && setEdit(prev => ({ ...prev, status: true, value: props.text }))}
            className={styles.wrapper}
            onSubmit={handleUpdate}
        >
            {
                !edit.status &&
                <p className={styles.input}>
                    {props.text}
                </p>
            }
            {
                edit.status &&
                <input
                    autoFocus
                    className={styles.input}
                    value={edit.value}
                    onChange={e => setEdit(prev => ({ ...prev, value: e.target.value }))}
                />
            }
            <div className={styles.action}>
                {
                    !edit.status &&
                    <button
                        onClick={updateIsCompleted}
                        className={styles.checkbox}
                    >
                        {props.isCompleted && <i className='bi bi-check' />}
                    </button>
                }
                {
                    edit.status &&
                    <>
                        <button
                            onClick={handleClose}
                            type='button'
                            className={styles.cancel}
                        >
                            <i className='bi bi-x' />
                        </button>
                        <button
                            type='submit'
                            className={styles.ok}
                        >
                            <i className='bi bi-check' />
                        </button>
                    </>
                }
            </div>
        </form>
    )
}

export default Item;