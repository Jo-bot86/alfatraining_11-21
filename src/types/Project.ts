export default interface Project {
  id: number;
  img: string;
  title: string;
  status: Status;
  progress: number;
  times: Time[];
}

interface Time {
  title?: string;
  begin: Date;
  end: Date;
}

export type Status = 'is-completed' | 'in-progress' | 'on-hold'

export function isProject(data: Project): data is Project {
  return data instanceof Object
    && (['id', 'img', 'title', 'status', 'progress'] as Array<keyof Project>)
      .every(attribute => (data as Project)[attribute])
}

export function isProjectArray(data: Project[]): data is Project[] {
  return data instanceof Array
    && data.every(book => isProject(book))
}

export function factoryRawToProject(project: Project): Project {
  return {
    ...project,
    times: project.times.map(time =>
      ({...time, begin: new Date(time.begin), end: new Date(time.end)})
    )
  }
}
