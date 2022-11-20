export interface CaseProps {
    title: string;
    case: string;
}

export interface ItemProps {
    id: number;
    case: string;
    isCompleted: boolean;
    text: string;
    uid: string;
}