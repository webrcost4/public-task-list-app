import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type propsDataApi = {
    tasks: [{
		id: number,
		userId: string,
		date: string,
		title: string,
		description: string,
		hour: number,
		taskCompleted: boolean,
		taskId: string
	}]
}


export type propsNavigationStack = {
	Home: undefined
	AddTasks: undefined
	CompletedTasks: undefined
	CalendarHome: undefined
	ListOneTask: {
        taskId: string
    }
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>