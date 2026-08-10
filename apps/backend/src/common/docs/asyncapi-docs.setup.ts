import { readFileSync } from 'fs';
import { INestApplication } from '@nestjs/common';
import type { Request, Response } from 'express';

// Версия @asyncapi/react-component, подключаемая с CDN для рендера HTML-вьюера.
// Обновлять осознанно — при обновлении сверить, что вёрстка/API не сломались.
const ASYNCAPI_REACT_COMPONENT_VERSION = '3.1.4';

interface AsyncApiDocsOptions {
  /** Путь, по которому будет доступен HTML-вьюер, например 'ws-docs'. */
  path: string;
  /** Абсолютный путь до файла со спекой (AsyncAPI YAML) на диске. */
  specFilePath: string;
  title: string;
}

/**
 * Отдаёт AsyncAPI-спеку WebSocket-событий: сырой YAML и HTML-вьюер поверх
 * него (через @asyncapi/react-component, подключаемый с CDN).
 *
 * Спека — не автогенерируется, а пишется вручную в `asyncapi/asyncapi.yaml`
 * (см. файл — там же объяснение, почему не decorator-based генератор).
 */
export function setupAsyncApiDocs(app: INestApplication, options: AsyncApiDocsOptions): void {
  const normalizedPath = options.path.startsWith('/') ? options.path : `/${options.path}`;
  const specContent = readFileSync(options.specFilePath, 'utf-8');
  const httpAdapter = app.getHttpAdapter();

  httpAdapter.get(`${normalizedPath}/asyncapi.yaml`, (_req: Request, res: Response) => {
    res.type('text/yaml').send(specContent);
  });

  httpAdapter.get(normalizedPath, (_req: Request, res: Response) => {
    res.type('text/html').send(renderViewerHtml(options.title, `${normalizedPath}/asyncapi.yaml`));
  });
}

function renderViewerHtml(title: string, specUrl: string): string {
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@asyncapi/react-component@${ASYNCAPI_REACT_COMPONENT_VERSION}/styles/default.min.css"
    />
    <style>
      body { margin: 0; }
    </style>
  </head>
  <body>
    <div id="asyncapi"></div>
    <script src="https://unpkg.com/@asyncapi/react-component@${ASYNCAPI_REACT_COMPONENT_VERSION}/browser/standalone/index.js"></script>
    <script>
      AsyncApiStandalone.render(
        {
          schema: {
            url: ${JSON.stringify(specUrl)},
            options: { method: 'GET', mode: 'cors' },
          },
          config: { show: { sidebar: true } },
        },
        document.getElementById('asyncapi'),
      );
    </script>
  </body>
</html>`;
}
