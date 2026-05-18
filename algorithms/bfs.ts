export function bfs(
  grafo: any,
  inicio: string,
  destino: string
): string[] | null {

  const cola: string[][] = [[inicio]];

  const visitados = new Set<string>();

  while (cola.length > 0) {

    const camino = cola.shift();

    if (!camino) continue;

    const nodo = camino[camino.length - 1];

    if (nodo === destino) {
      return camino;
    }

    if (!visitados.has(nodo)) {

      visitados.add(nodo);

      const vecinos = grafo[nodo];

      for (const vecino of vecinos) {

        cola.push([...camino, vecino]);

      }

    }

  }

  return null;
}