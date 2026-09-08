# criar expressjs typescript

Para criar uma aplicação **Express.js** com **TypeScript**, inicialize um novo projeto e instale o framework principal junto com o TypeScript e suas definições de tipo como dependências de desenvolvimento.

```bash
npm init -y
npm install express
npm install -D typescript @types/node @types/express tsx
```

Crie um arquivo `tsconfig.json` executando `npx tsc --init` e certifique-se de que o `outDir` esteja configurado para uma pasta de build (ex: `"./dist"`). Em seguida, crie um arquivo de origem (ex: `src/index.ts`) com a seguinte estrutura:

```typescript
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Finalmente, adicione scripts ao `package.json` para compilar e executar o servidor, ou use `tsx` para execução direta durante o desenvolvimento:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "tsx watch src/index.ts"
}
```
