
import {Stack, Skeleton} from '@chakra-ui/react'

export const BoardsSkeleton:React.FC = ({})=>{
    return (<Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>)
}

export const TaskSkeleton:React.FC = ({})=>{
    return (<Stack>
        <Skeleton height='30px' />
        <Skeleton height='30px' />
      </Stack>)
}