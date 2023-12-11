import {z} from 'zod'
import { FaImage, FaPaperclip } from 'react-icons/fa6';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const requestSchema = z.object({
    name: z.string(),
    email: z.string().email (),
    password:z.string().min(6)
})
export const taskStatus:TaskStatus[] = [
  { status:'backlog', label: "Backlog", color: "#F0402C" },
  { status:'in-progress', label: "In Progress", color: "#FFD94A" },
  { status:'in-review', label: "In Review", color: "#A97EE2" },
  { status:'completed', label: "Completed", color: "#7EEB90" },
];

export const actions = [
  {actionName:'Add attachement', status:'regular', icon:FaPaperclip},
  {actionName:'Add Subtask', status:'regular', icon:IoMdCheckboxOutline},
  {actionName:'Change Cover', status:'regular', icon:FaImage},
  {actionName: 'Delete Task', status:'danger', icon:MdDelete},
]
