import {rest} from 'msw';
import Project from '../types/Project';

let projects: Project[] = [
  {
    "id": 1,
    "img": "https://tse3.mm.bing.net/th?id=OIP.Uy0JQ5fJ8Y7UDMl_M5C7PwAAAA&pid=Api",
    "title": "Write Article",
    "status": "is-completed",
    "progress": 100,
    "times": [
      {
        "title": "Think concept",
        "begin": new Date("Wed Jan 06 2021 13:06:49 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Wed Jan 06 2021 18:19:49 GMT+0100 (Central European Standard Time)")
      },
      {
        "title": "Write index",
        "begin": new Date("Thu Jan 07 2021 13:04:23 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Thu Jan 07 2021 17:02:19 GMT+0100 (Central European Standard Time)")
      },
      {
        "title": "Implement text",
        "begin": new Date("Fri Jan 08 2021 11:04:23 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Fri Jan 08 2021 13:57:25 GMT+0100 (Central European Standard Time)")
      },
      {
        "title": "Sign it",
        "begin": new Date("Sat Jan 09 2021 13:04:23 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Sat Jan 09 2021 16:44:37 GMT+0100 (Central European Standard Time)")
      },
    ]
  },
  {
    "id": 2,
    "img": "https://cdn.xl.thumbs.canstockphoto.com/school-timetable-template-for-students-and-pupils-abstract-scribble-background-colorful-design-clipart-vector_csp40536050.jpg",
    "title": "Prepare Timetable",
    "status": "in-progress",
    "progress": 60,
    "times": [
      {
        "begin": new Date("Fri Jan 01 2021 13:08:59 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Sat Jan 02 2021 06:40:05 GMT+0100 (Central European Standard Time)")
      },
      {
        "title": "Adjust timing",
        "begin": new Date("Sat Jan 02 2021 01:08:59 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Sat Jan 02 2021 02:04:59 GMT+0100 (Central European Standard Time)")
      },
      {
        "title": "Calibrate events",
        "begin": new Date("Mon Jan 04 2021 14:12:40 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Mon Jan 04 2021 10:15:40 GMT+0100 (Central European Standard Time)")
      }
    ]
  },
  {
    "id": 3,
    "img": "http://sr.photos2.fotosearch.com/bthumb/CLT/CLT006/ko714.jpg",
    "title": "Team Meet",
    "status": "on-hold",
    "progress": 15,
    "times": [
      {
        "title": "Talk strategy",
        "begin": new Date("Mon Jan 04 2021 13:06:49 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Mon Jan 04 2021 15:10:49 GMT+0100 (Central European Standard Time)")
      },
      {
        "title": "Daily activity",
        "begin": new Date("Tue Jan 05 2021 01:06:49 GMT+0100 (Central European Standard Time)"),
        "end": new Date("Tue Jan 05 2021 02:26:04 GMT+0100 (Central European Standard Time)")
      }
    ]
  },
];

export const handlers = [
  // GET list
  rest.get<undefined, Project[]>('/api/projects', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projects));
  }),

  // POST new
  rest.post<Omit<Project, 'id'>, Project>('/api/projects', (req, res, ctx) => {
    const newProject = {
      ...req.body,
      id: projects.reduce((maxId, project) => Math.max(project.id, maxId), -1) + 1,
      completed: false,
    };
    projects = [...projects, newProject];

    return res(ctx.status(201), ctx.json(newProject));
  }),

  // PUT project
  rest.put<Project, Project | undefined, {id: number}>(
    '/api/projects/:id',
    (req, res, ctx) => {
      const id = +req.params.id;
      projects = projects.map((project) =>
        project.id === id ? {...project, ...req.body} : project,
      );
      return res(
        ctx.status(200),
        ctx.json(projects.find((project) => project.id === id)),
      );
    },
  ),

  // DELETE project
  rest.delete<undefined, string, {id: number}>(
    '/api/projects/:id',
    (req, res, ctx) => {
      const {id} = req.params;
      projects = projects.filter((project) => project.id !== id);
      return res(ctx.status(200), ctx.text('OK'));
    },
  ),
];
