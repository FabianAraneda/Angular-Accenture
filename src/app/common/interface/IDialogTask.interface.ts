import { ITask } from "./ITaks.interface";

export interface IDialogTask {
    title: string;
    isEditing: boolean;
    task: ITask;
}