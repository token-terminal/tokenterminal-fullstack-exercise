import express from "express";
import fs from "fs";
import { join } from "path";
import { Project } from "./types";
import { fetch } from "./fetch";

const app = express();

app.use(
  express.json({
    limit: `50mb`,
    type(req) {
      return true; // Parse always
    },
  })
);

// Send CORS headers
app.use((_req: express.Request, res: express.Response, next: () => void) => {
  res.append(`Access-Control-Allow-Origin`, `*`);
  res.append(`Access-Control-Allow-Methods`, `GET, POST, OPTIONS, PATCH`);
  res.append(
    `Access-Control-Allow-Headers`,
    `DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization`
  );
  res.append(`Access-Control-Expose-Headers`, `Content-Length,Content-Range,Authorization`);
  next();
});

async function getProjects(): Promise<Project[]> {
  const resp = await fetch(`https://api.tokenterminal.com/v1/projects`, {
    headers: { authorization: `Bearer c0e5035a-64f6-4d2c-b5f6-ac1d1cb3da2f` }, // This token is intentionally included here.
  });
  const projects = await resp.json();
  return projects.map((project: Record<string, string | undefined>) => {
    return {
      name: project.name,
      projectId: project.project_id,
      price: project.price,
      tvl: project.tvl,
    };
  });
}

app.get(`/projects`, async (req: express.Request, res: express.Response): Promise<void> => {
  const projects = await getProjects();
  res.send({ projects });
});

app.get(`/projects/:projectId`, async (req: express.Request, res: express.Response): Promise<void> => {
  const projectId = req.params.projectId;
  const projects = await getProjects();
  const project = projects.find((project: Project) => project.projectId === projectId);
  if (!project) {
    res.status(404).send({ error: `Project ${projectId} not found` });
    return;
  }
  res.send(project);
});

app.get(`/projects/:projectId/warnings`, async (req: express.Request, res: express.Response): Promise<void> => {
  const projectId = req.params.projectId;
  try {
    const data = await fs.promises.readFile(join(`./data`, `${projectId}.json`));
    res.send(data);
    return;
  } catch (e) {
    if (e instanceof Error && e.hasOwnProperty(`code`) && (e as Error & { code: string }).code === `ENOENT`) {
      res.status(404).send({ error: `No warnings set` });
    } else {
      console.log(`Failed to read ${projectId}.json.`, e);
    }
    return;
  }
});

function validateData(data: Record<string, unknown>): boolean {
  const requiredFields = [`title`, `text`];
  for (const field of requiredFields) {
    if (!data.hasOwnProperty(field) && typeof data[field] !== `string`) {
      console.log(`Missing field ${field} or it has the wrong type. Expected string, received ${typeof data[field]}`);
      return false;
    }
  }
  return true;
}

app.post(`/projects/:projectId/warnings`, async (req: express.Request, res: express.Response): Promise<void> => {
  const projectId = req.params.projectId;
  const data = req.body;
  if (!validateData(data)) {
    res.status(400).send({ error: `Invalid data` });
    return;
  }
  console.log(`Writing ${projectId}.json data: ${JSON.stringify(data)}`);
  try {
    await fs.promises.writeFile(join(`./data`, `${projectId}.json`), JSON.stringify(data));
    res.send({ success: true });
    return;
  } catch (e) {
    console.log(`Failed to write ${data.projectId}.json.`, e);
    res.status(500).send({ error: `Failed to write ${data.projectId}.json.` });
    return;
  }
});

app.delete(`/projects/:projectId/warnings`, async (req: express.Request, res: express.Response): Promise<void> => {
  const projectId = req.params.projectId;
  console.log(`Deleting ${projectId}.json`);
  try {
    await fs.promises.unlink(join(`./data`, `${projectId}.json`));
    res.send({ success: true });
    return;
  } catch (e) {
    console.log(`Failed to delete ${projectId}.json.`, e);
    res.status(200).send({});
    return;
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});
