Sync DynamicServices

Usage

- Set `DYNAMIC_SERVICES_URL` to point to the JSON endpoint that contains the Spanish `DynamicServices` object (defaults to `https://doctorrecetas.com/api/dynamic_services_es.json`).
- Run:

```bash
npm run sync-dynamic-services
```

What it does

- Fetches the JSON from the configured URL.
- If the fetched JSON contains a `DynamicServices` key it uses that; otherwise it treats the fetched JSON as the services object.
- Compares with the current `messages/es.json` `DynamicServices` value and writes the file only when a change is detected.

Notes

- You can run this periodically with a cronjob or CI workflow to keep translations in sync automatically.
