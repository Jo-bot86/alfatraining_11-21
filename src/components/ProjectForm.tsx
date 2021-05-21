import React, {ReactElement, useState} from "react"
import {useHistory} from "react-router"
import {projectApi} from "../shared/ProjectApi"
import {Status} from "../types/Project"
import css from './ProjectForm.module.css'

interface Time {
  title?: string;
  begin: string;
  end: string;
}

interface Props {
  title: string
  img: string
  status: Status
  progress: string
  times: Time[]
  isEdit: boolean
  projectId?: number
}

export default function ProjectForm(props: Props): ReactElement {
  const buildTime = () => ({title: '', begin: '', end: ''})

  const [title, setTitle] = useState(props.title)
  const [img, setImg] = useState(props.img)
  const [status, setStatus] = useState<Status>(props.status)
  const [progress, setProgress] = useState(props.progress)
  const [times, setTimes] = useState<Time[]>(props.times)

  const history = useHistory()

  const formProject = (): any => {
    return {title, img, status, progress: Number(progress), times}
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', e, formProject());
    projectApi(
      props.isEdit ? 'put' : 'post',
      props.isEdit ? `projects/${props.projectId}` : 'projects',
      () => {history.push(props.isEdit ? `/projects/${props.projectId}` : '/projects')},
      formProject()
    )
  }

  const onChangeTimes = (index: number, key: string, newValue: string) => {
    setTimes(currentTimes => {
      const copyTimes = [...currentTimes]
      copyTimes[index] = {...copyTimes[index], [key]: newValue}
      return copyTimes
    })
  }

  const onAddTime = () => {
    setTimes(currentTimes => [...currentTimes, buildTime()])
  }

  const onRemoveTime = () => {
    setTimes(currentTimes => {
      const copyTimes = [...currentTimes]
      if (copyTimes.length > 1) {
        copyTimes.pop()
      }
      return copyTimes
    })
  }

  return (
    <form className={`ui form ${css.projectForm}`} onSubmit={onSubmit}>
      <h4 className="ui dividing header">Project Create</h4>
      <div className="field">
        <div className="field">
          <label>Titel</label>
          <div className="field">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Titel" required minLength={2} />
          </div>
        </div>
        <div className="field">
          <label>Image</label>
          <div className="field">
            <input value={img} onChange={(e) => setImg(e.target.value)} type="url" placeholder="Image Url" required />
          </div>
        </div>
        <div className="field">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)} required className="ui fluid dropdown">
            <option value="in-progress">In Progress</option>
            <option value="on-hold">On Hold</option>
            <option value="is-completed">Is Completed</option>
          </select>
        </div>
        <div className="field">
          <label>Progress {progress}%</label>
          <input value={progress} onChange={(e) => setProgress(e.target.value)} style={{width: '100%'}} type="range" min="0" max="100" required />
        </div>
        <label>Times</label>
        <button onClick={onAddTime} type="button" className="ui button">+</button>
        <button onClick={onRemoveTime} type="button" className="ui button">-</button>
        {times.map((time, index) =>
          <div key={index} className="inline fields">
            <div className="six wide field">
              <label>Titel</label>
              <input value={time.title} onChange={(e) => onChangeTimes(index, 'title', e.target.value)} type="text" placeholder="Titel" minLength={2} />
            </div>
            <div className="four wide field">
              <label>Begin</label>
              <input value={time.begin} onChange={(e) => onChangeTimes(index, 'begin', e.target.value)} type="date" placeholder="Begin" required />
            </div>
            <div className="four wide field">
              <label>End</label>
              <input value={time.end} onChange={(e) => onChangeTimes(index, 'end', e.target.value)} type="date" placeholder="End" required />
            </div>
          </div>
        )}
      </div>
      <button className="ui button">Submit</button>
    </form >
  )
}
