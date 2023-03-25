import healthMessage  from './responses';

async function healthcheck(req: any, res: any) {
  req.tags = { name: 'healthcheck' };
  const { code, message } = healthMessage;
  res.status(code)
    .json({ message });
}

export default healthcheck;
