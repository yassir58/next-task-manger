import {z} from 'zod'


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
  {actionName:'Edit title', status:'regular'},
  {actionName:'Add Description', status:'regular'},
  {actionName:'Edit Description', status:'regular'},
  {actionName:'Add attachement', status:'regular'},
  {actionName:'Add Subtask', status:'regular'},
  {actionName:'Change Cover', status:'regular'},
  {actionName: 'Delete Task', status:'danger'},
]
