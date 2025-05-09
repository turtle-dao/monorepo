export function toNumber(value?: string | number, def = 0): number {
  if (value === undefined) {
    return def;
  }

  try {
    const val = Number.parseFloat(value.toString());

    if (Number.isNaN(val)) {
      return def;
    }

    return val;
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e: unknown) {
    return def;
  }
}

export function min(...vals: number[]): number {
  let smallest = Number.MAX_VALUE;

  for (const val of vals) {
    if (val >= smallest) {
      continue;
    }

    smallest = val;
  }

  return smallest;
}

export function max(...vals: number[]): number {
  let biggest = -Number.MAX_VALUE;

  for (const val of vals) {
    if (val <= biggest) {
      continue;
    }

    biggest = val;
  }

  return biggest;
}
