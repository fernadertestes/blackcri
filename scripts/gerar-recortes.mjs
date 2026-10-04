import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { recortes, larguras } from './recortes.config.mjs';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origemDir = path.join(raiz, 'fotos/originais');
const saidaDir = path.join(raiz, 'src/assets/fotos');
await mkdir(saidaDir, { recursive: true });

for (const r of recortes) {
  const ws = [...new Set(larguras.map((l) => Math.min(l, r.w)))];
  for (const w of ws) {
    const arquivo = path.join(saidaDir, `${r.nome}-${w}.webp`);
    await sharp(path.join(origemDir, r.origem))
      .extract({ left: r.x, top: r.y, width: r.w, height: r.h })
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(arquivo);
    console.log('✓', path.relative(raiz, arquivo));
  }
}
