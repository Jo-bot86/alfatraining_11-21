export default interface Project {
  id: number;
  img: string;
  title: string;
  status: Status;
  progress: number;
  times: Time[];
}

interface Time {
  title?: string
  begin: Date;
  end: Date;
}

type Status = 'is-completed' | 'in-progress' | 'on-hold'
